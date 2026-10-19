const express = require('express'), Database = require('better-sqlite3'), bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'), cookie = require('cookie-parser'), crypto = require('crypto'), path = require('path');
const { JWT_SECRET = 'dev-secret-change-me', TELEGRAM_BOT_TOKEN, PORT = 3000 } = process.env;

const db = new Database(path.join(__dirname, 'data.db'));
db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON');
db.exec(`
create table if not exists users(id integer primary key, email text unique not null, pass text not null, created text default current_timestamp);
create table if not exists invitations(id integer primary key, user_id integer not null references users(id) on delete cascade, slug text unique not null, data text not null, created text default current_timestamp);
create table if not exists wishes(id integer primary key, inv_id integer not null references invitations(id) on delete cascade, name text not null, text text not null, created text default current_timestamp);
create table if not exists guests(id integer primary key, inv_id integer not null references invitations(id) on delete cascade, name text not null, token text unique not null, status text default 'pending', drinks text default '', answered text);
`);

const app = express();
app.use(express.json({ limit: '50kb' }), cookie());
const rnd = n => crypto.randomBytes(n).toString('hex');
const auth = (req, res, next) => {
  try { req.uid = jwt.verify(req.cookies.t, JWT_SECRET).uid; next(); }
  catch { res.status(401).json({ error: 'Войдите в аккаунт' }); }
};
const setCookie = (res, uid) => res.cookie('t', jwt.sign({ uid }, JWT_SECRET, { expiresIn: '30d' }),
  { httpOnly: true, sameSite: 'lax', maxAge: 30 * 864e5 });

/* ---------- Аккаунты ---------- */
const creds = b => [String(b.email || '').trim().toLowerCase(), String(b.password || '')];
app.post('/api/register', (req, res) => {
  const [email, pw] = creds(req.body);
  if (!/^\S+@\S+\.\S+$/.test(email) || pw.length < 6) return res.status(400).json({ error: 'Введите email и пароль от 6 символов' });
  try {
    const id = db.prepare('insert into users(email, pass) values(?, ?)').run(email, bcrypt.hashSync(pw, 10)).lastInsertRowid;
    setCookie(res, id); res.json({ email });
  } catch { res.status(409).json({ error: 'Этот email уже зарегистрирован' }); }
});
app.post('/api/login', (req, res) => {
  const [email, pw] = creds(req.body);
  const u = db.prepare('select * from users where email = ?').get(email);
  if (!u || !bcrypt.compareSync(pw, u.pass)) return res.status(401).json({ error: 'Неверный email или пароль' });
  setCookie(res, u.id); res.json({ email });
});
app.post('/api/logout', (req, res) => res.clearCookie('t').json({ ok: 1 }));
app.get('/api/me', auth, (req, res) => res.json(db.prepare('select email from users where id = ?').get(req.uid)));

/* ---------- Приглашения (кабинет) ---------- */
const LANGS = ['ru', 'kk', 'ky', 'uz', 'en'];
const CATS = ['wedding', 'kyz', 'syrga', 'kudalyq', 'merei', 'birthday', 'qonys', 'auyzashar', 'sundet', 'shildekhana', 'tusaukeser', 'besik', 'tilashar', 'qyrqyn'];
const FIELDS = ['lang', 'category', 'tpl', 'title', 'names', 'name1', 'name2', 'date', 'city', 'venue', 'address', 'map_url', 'salut', 'text', 'hosts', 'tg_chat'];
const clean = b => Object.fromEntries(FIELDS.map(k => [k, String(b[k] || '').trim().slice(0, k === 'text' || k === 'salut' ? 1500 : 300)]));
const own = (req, res) => {
  const r = db.prepare('select * from invitations where id = ? and user_id = ?').get(req.params.id, req.uid);
  if (!r) res.status(404).json({ error: 'Не найдено' });
  return r;
};
const valid = d => d.names && LANGS.includes(d.lang) && CATS.includes(d.category) && ['1', '2', '3', '4'].includes(d.tpl) && /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(d.date);

app.get('/api/invitations', auth, (req, res) => {
  const rows = db.prepare(`select i.id, i.slug, i.data, count(g.id) total, sum(g.status = 'yes') yes,
    sum(g.status = 'plus') plus, sum(g.status = 'no') no from invitations i
    left join guests g on g.inv_id = i.id where i.user_id = ? group by i.id order by i.id desc`).all(req.uid);
  res.json(rows.map(r => ({ ...r, data: JSON.parse(r.data) })));
});
app.post('/api/invitations', auth, (req, res) => {
  const d = clean(req.body);
  if (!valid(d)) return res.status(400).json({ error: 'Заполните имена, дату, язык и категорию' });
  const slug = rnd(4);
  const id = db.prepare('insert into invitations(user_id, slug, data) values(?, ?, ?)').run(req.uid, slug, JSON.stringify(d)).lastInsertRowid;
  res.json({ id, slug });
});
app.put('/api/invitations/:id', auth, (req, res) => {
  if (!own(req, res)) return;
  const d = clean(req.body);
  if (!valid(d)) return res.status(400).json({ error: 'Заполните имена, дату, язык и категорию' });
  db.prepare('update invitations set data = ? where id = ?').run(JSON.stringify(d), req.params.id);
  res.json({ ok: 1 });
});
app.delete('/api/invitations/:id', auth, (req, res) => {
  if (!own(req, res)) return;
  db.prepare('delete from invitations where id = ?').run(req.params.id); res.json({ ok: 1 });
});

/* ---------- Гости и персональные ссылки ---------- */
app.get('/api/invitations/:id/guests', auth, (req, res) => {
  if (!own(req, res)) return;
  res.json(db.prepare('select id, name, token, status, drinks, answered from guests where inv_id = ? order by id').all(req.params.id));
});
app.post('/api/invitations/:id/guests', auth, (req, res) => {
  if (!own(req, res)) return;
  const names = String(req.body.names || '').split('\n').map(s => s.trim().slice(0, 100)).filter(Boolean).slice(0, 200);
  const ins = db.prepare('insert into guests(inv_id, name, token) values(?, ?, ?)');
  db.transaction(() => names.forEach(n => ins.run(req.params.id, n, rnd(5))))();
  res.json({ added: names.length });
});
app.delete('/api/invitations/:id/guests/:gid', auth, (req, res) => {
  if (!own(req, res)) return;
  db.prepare('delete from guests where id = ? and inv_id = ?').run(req.params.gid, req.params.id); res.json({ ok: 1 });
});

/* ---------- Публичная страница приглашения ---------- */
app.get('/api/public/:slug', (req, res) => {
  const i = db.prepare('select id, data from invitations where slug = ?').get(req.params.slug);
  if (!i) return res.sendStatus(404);
  const data = JSON.parse(i.data); delete data.tg_chat;
  const g = req.query.g && db.prepare('select name, status from guests where token = ? and inv_id = ?').get(String(req.query.g), i.id);
  res.json({ data, guest: g || null });
});
const LABEL = { yes: 'Придёт', plus: 'Придёт с парой (+1)', no: 'Не сможет' };
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
app.post('/api/public/:slug/rsvp', (req, res) => {
  const i = db.prepare('select id, data from invitations where slug = ?').get(req.params.slug);
  if (!i) return res.sendStatus(404);
  const { g, name, status, drinks } = req.body;
  if (!LABEL[status]) return res.status(400).json({ error: 'Выберите вариант ответа' });
  const dr = Array.isArray(drinks) ? drinks.map(String).join(', ').slice(0, 100) : '';
  let guest = g && db.prepare('select * from guests where token = ? and inv_id = ?').get(String(g), i.id);
  const nm = guest ? guest.name : String(name || '').trim().slice(0, 100);
  if (!nm) return res.status(400).json({ error: 'Введите имя' });
  if (guest) db.prepare(`update guests set status = ?, drinks = ?, answered = datetime('now') where id = ?`).run(status, dr, guest.id);
  else db.prepare(`insert into guests(inv_id, name, token, status, drinks, answered) values(?, ?, ?, ?, ?, datetime('now'))`).run(i.id, nm, rnd(5), status, dr);
  res.json({ ok: 1 });

  const chat = JSON.parse(i.data).tg_chat;   // уведомление организатору (токен бота хранится только на сервере)
  if (TELEGRAM_BOT_TOKEN && chat) {
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, parse_mode: 'HTML',
        text: `💌 <b>Новый ответ</b>\n👤 ${esc(nm)}\n✅ ${LABEL[status]}\n🥂 ${esc(dr || 'не указано')}` })
    }).catch(() => {});
  }
});

/* ---------- Пожелания гостей ---------- */
const slugInv = (req, res) => { const i = db.prepare('select id from invitations where slug = ?').get(req.params.slug); if (!i) res.sendStatus(404); return i; };
app.get('/api/public/:slug/wishes', (req, res) => {
  const i = slugInv(req, res); if (!i) return;
  res.json(db.prepare('select name, text from wishes where inv_id = ? order by id desc limit 50').all(i.id));
});
app.post('/api/public/:slug/wishes', (req, res) => {
  const i = slugInv(req, res); if (!i) return;
  const name = String(req.body.name || '').trim().slice(0, 60), text = String(req.body.text || '').trim().slice(0, 400);
  if (!name || !text) return res.status(400).json({ error: 'Заполните имя и текст' });
  db.prepare('insert into wishes(inv_id, name, text) values(?, ?, ?)').run(i.id, name, text); res.json({ ok: 1 });
});

/* ---------- Страницы ---------- */
app.get(['/i/:slug', '/i/:slug/:g'], (req, res) => res.sendFile(path.join(__dirname, 'public', 'invite.html')));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Запущено: http://localhost:' + PORT));
