// Duo: shared code for all pages (config, Telegram, language, theme, icons, date picker, helpers)

// ===== Config =====
const SUPABASE_URL = 'https://fuisujbwjwbddtfstkbh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BOWxBrtsNsIaUQJYgqEXbQ_vZm6jwLl';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const BOT = 'DuoTogeherBot';
const $ = id => document.getElementById(id);
const pref = (k, d) => { try { return localStorage.getItem('duo.' + k) ?? d; } catch(_) { return d; } };
const setPref = (k, v) => { try { localStorage.setItem('duo.' + k, v); } catch(_){} };

// ===== Icons (inline SVG sprite) =====
const ICONS = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  chev:'<path d="m9 6 6 6-6 6"/>',
  refresh:'<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  hearts:'<path d="M9.5 18.5S4 15.2 4 10.9a3.1 3.1 0 0 1 5.5-1.9 3.1 3.1 0 0 1 5.5 1.9c0 4.3-5.5 7.6-5.5 7.6z"/><path d="M16 16.3s3.9-2.4 4-5.7a2.6 2.6 0 0 0-4.5-1.6" opacity=".6"/>',
  heart:'<path d="M12 20s-7.5-4.6-9.3-9.2A4.8 4.8 0 0 1 12 7.6a4.8 4.8 0 0 1 9.3 3.2C19.5 15.4 12 20 12 20z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
  left:'<path d="M15 6l-6 6 6 6"/>', right:'<path d="M9 6l6 6-6 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  share:'<path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
  send:'<path d="M21 4 3 11.5l6.5 2L12 20l3-4.5 4.5 3.5zM9.5 13.5 21 4"/>',
  phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  logout:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
  cake:'<path d="M4 21h16v-8H4zM4 16.5c2.7 1.6 5.3-1.6 8 0s5.3 1.6 8 0M8 13V9.5M12 13V9.5M16 13V9.5M8 6.5v.01M12 6.5v.01M16 6.5v.01"/>',
  gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3.5-5.5-4-5.5-1.5S9.5 8 12 8zm0 0c1.5-3.5 5.5-4 5.5-1.5S14.5 8 12 8z"/>',
  ring:'<circle cx="12" cy="15" r="6"/><path d="M9 4h6l2 3-5 3-5-3z"/>',
  plane:'<path d="M10.5 13.5 3 11l1.5-1.5 8 .5 4.5-5.5a2 2 0 0 1 2.5 2.5L14 11.5l.5 8L13 21l-2.5-7.5z"/>',
  star:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5l-5.3 2.9 1.2-6-4.5-4.1 6-.7z"/>',
  leaf:'<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15zM5 19l8-8"/>',
  glass:'<path d="M8 3h8l-.8 6.5a3.2 3.2 0 0 1-6.4 0zM12 13v7M8.5 21h7"/>',
  pin:'<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  cart:'<path d="M3 4h2l2.4 11h11L21 7.5H6.3"/><circle cx="9" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/>',
  film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7.5 4v16M16.5 4v16M3 9h4.5M3 15h4.5M16.5 9H21M16.5 15H21"/>',
  book:'<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3M9 7h6"/>',
  food:'<path d="M7 3v7a2 2 0 0 0 4 0V3M9 12v9M17 3c-2 0-3 3-3 6.5S15 13 17 13v8"/>',
  game:'<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7 12.5h4M9 10.5v4M15 11.5h.01M17.5 13.5h.01"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
  grid:'<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  droplet:'<path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/>',
  wallet:'<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 10h18M16 15h.01M7 6l9-3 1 3"/>',
  photo:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5.5-5 3.5 3 2.5-2 4.5 4"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',
  suitcase:'<rect x="4" y="7" width="16" height="13" rx="2.5"/><path d="M9 7V4.5h6V7M9 11v5M15 11v5"/>',
  ticket:'<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V5H3zM14 5v14"/>',
  coins:'<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7M3 11v4c0 1.7 2.7 3 6 3 1 0 2-.1 2.8-.4"/><ellipse cx="17" cy="15" rx="4" ry="2.2"/><path d="M13 15v3c0 1.2 1.8 2.2 4 2.2s4-1 4-2.2v-3"/>',
  map:'<path d="M9 4 3 6.5v13L9 17l6 3 6-2.5v-13L15 7zM9 4v13M15 7v13"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  lock:'<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  sparkle:'<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/>',
  bed:'<path d="M3 18V6M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5M6.5 11.5h.01"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'
};
(function injectSprite(){
  const s = Object.entries(ICONS).map(([k,v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${s}</svg>`);
})();
const icon = (name, style = '') => `<svg class="ic"${style ? ` style="${style}"` : ''}><use href="#i-${name}"/></svg>`;

// ===== Telegram Mini App =====
// Telegram passes its signed data in the page address (#tgWebAppData=...). We keep it for the session,
// so it still works after moving between pages, and don't depend on telegram.org's script loading.
function readInitData(){
  try {
    const d = window.Telegram?.WebApp?.initData || new URLSearchParams(location.hash.slice(1)).get('tgWebAppData');
    if (d) { sessionStorage.setItem('tgInit', d); return d; }
    return sessionStorage.getItem('tgInit') || '';
  } catch(_) { return ''; }
}
const TG_INIT = readInitData();
const inTG = !!TG_INIT;
const tgApp = () => window.Telegram?.WebApp;
function tgLangCode(){ try { return JSON.parse(new URLSearchParams(TG_INIT).get('user') || '{}').language_code || ''; } catch(_) { return ''; } }
function openTg(url){ const a = tgApp(); if (a?.openTelegramLink) a.openTelegramLink(url); else location.href = url; }
function openLink(url){ const a = tgApp(); if (inTG && a?.openLink) a.openLink(url); else window.open(url, '_blank', 'noopener'); }
async function tgAuth(mode){
  const r = await fetch(SUPABASE_URL + '/functions/v1/tg-auth', { method:'POST',
    headers:{ 'Content-Type':'application/json', apikey: SUPABASE_KEY }, body: JSON.stringify({ initData: TG_INIT, mode, lang: LANG }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || t('tgErr'));
  if (!j.linked) return false;
  const { error } = await sb.auth.setSession({ access_token: j.access_token, refresh_token: j.refresh_token });
  if (error) throw error;
  return true;
}

// ===== i18n =====
function plural(n, one, few, many){ const a=Math.abs(n)%100, b=a%10; if(a>10&&a<20) return many; if(b>1&&b<5) return few; if(b===1) return one; return many; }
const T = {
  ru: {
    cancel:'Отмена', save:'Сохранить', saved:'Сохранено', create:'Создать', done:'Готово', delete:'Удалить', edit:'Изменить', back:'Назад',
    pickDate:'Выберите дату', optional:'Необязательно', title:'Название', note:'Заметка', loadErr:'Ошибка загрузки: ', tgErr:'Не получилось войти через Telegram',
    partner:'Партнёр', you:'Вы', today:'сегодня', tomorrow:'завтра', inDays:n => `через ${n} ${plural(n,'день','дня','дней')}`,
    days:n => `${n} ${plural(n,'день','дня','дней')}`, confirmDelete:'Удалить?',
    err:{ 'Invalid login credentials':'Неверный email или пароль', 'User already registered':'Такой email уже зарегистрирован', 'code not found':'Код не найден, проверьте его',
          'couple is full':'В этой паре уже двое', 'already in a couple':'Вы уже состоите в паре' },
    months:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsGen:['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    monthsShort:['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'],
    dow:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'], weekdays:['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота']
  },
  en: {
    cancel:'Cancel', save:'Save', saved:'Saved', create:'Create', done:'Done', delete:'Delete', edit:'Edit', back:'Back',
    pickDate:'Pick a date', optional:'Optional', title:'Title', note:'Note', loadErr:'Loading error: ', tgErr:'Couldn\'t sign in with Telegram',
    partner:'Partner', you:'You', today:'today', tomorrow:'tomorrow', inDays:n => `in ${n} ${n === 1 ? 'day' : 'days'}`,
    days:n => `${n} ${n === 1 ? 'day' : 'days'}`, confirmDelete:'Delete?',
    err:{ 'Invalid login credentials':'Wrong email or password', 'User already registered':'This email is already registered', 'code not found':'Code not found, please check it',
          'couple is full':'This couple already has two people', 'already in a couple':'You are already in a couple' },
    months:['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthsGen:['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthsShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    dow:['Mo','Tu','We','Th','Fr','Sa','Su'], weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  }
};
const addT = d => { Object.assign(T.ru, d.ru); Object.assign(T.en, d.en); };
const detectLang = () => { const c = (tgLangCode() || navigator.language || 'ru').toLowerCase(); return /^(ru|uk|be|kk)/.test(c) ? 'ru' : 'en'; };
let LANG = pref('lang', null) || detectLang();
if (!T[LANG]) LANG = 'ru';
const t = (k, ...a) => { const v = T[LANG][k] ?? T.ru[k] ?? k; return typeof v === 'function' ? v(...a) : v; };
const langHooks = [];
function applyI18n(){
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-t]').forEach(el => el.textContent = t(el.dataset.t));
  document.querySelectorAll('[data-tp]').forEach(el => el.placeholder = t(el.dataset.tp));
  document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
  document.querySelectorAll('.field[data-date]').forEach(el => setDate(el, getDate(el)));
  langHooks.forEach(f => f());
}
async function setLang(l, userId){
  if (!T[l]) return;
  LANG = l; setPref('lang', l); applyI18n();
  if (userId) await sb.from('profiles').update({ lang: l }).eq('id', userId);
}

// ===== Theme =====
function applyTheme(){
  const p = pref('theme', 'auto');
  let mode = p;
  if (p === 'auto') { const tc = inTG && tgApp()?.colorScheme; mode = tc || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  document.documentElement.dataset.theme = mode;
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  const a = tgApp(); if (inTG && a) { try { a.setHeaderColor(bg); a.setBackgroundColor(bg); } catch(_){} }
  document.querySelectorAll('[data-theme-opt]').forEach(b => b.classList.toggle('on', b.dataset.themeOpt === p));
}
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch(_){}
function tgSetup(){ const a = tgApp(); if (!a) return; try { a.ready(); a.expand(); a.disableVerticalSwipes?.(); a.onEvent?.('themeChanged', applyTheme); } catch(_){} applyTheme(); }
if (inTG) { tgSetup(); window.addEventListener('load', tgSetup); }

// ===== Helpers =====
// Built-in names the app itself created (default lists, packing template): shown in the current language
const DEFAULT_PAIRS = [['Покупки','Groceries'],['Посмотреть вместе','Watch together'],['Хотим сходить','Places to go'],
  ['Паспорт','Passport'],['Билеты','Tickets'],['Зарядки','Chargers'],['Аптечка','First aid kit'],['Наличные и карты','Cash and cards'],['Зубные щётки','Toothbrushes'],
  ['Пауэрбанк','Power bank'],
  ['мультфильм','animation'],['фантастика','sci-fi'],['комедия','comedy'],['триллер','thriller'],['боевик','action'],['мелодрама','romance'],['драма','drama'],['ужасы','horror'],['сериал','series'],['Солнцезащитный крем','Sunscreen'],['Удобная обувь','Comfortable shoes'],['Адаптер для розеток','Plug adapter']];
function trD(s){ const k = String(s ?? '').trim().toLowerCase(); const pr = DEFAULT_PAIRS.find(p => p[0].toLowerCase() === k || p[1].toLowerCase() === k); return pr ? pr[LANG === 'en' ? 1 : 0] : s; }
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2,'0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parseYmd = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const dayDiff = (a,b) => Math.round((b - a) / 86400000);
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const fmtDay = (d, withYear) => `${d.getDate()} ${t('monthsGen')[d.getMonth()]}${withYear ? ' ' + d.getFullYear() : ''}`;
function fmtRange(a, b){
  if (!a) return '';
  const da = parseYmd(a); if (!b) return fmtDay(da);
  const db = parseYmd(b);
  if (da.getMonth() === db.getMonth() && da.getFullYear() === db.getFullYear()) return `${da.getDate()}–${db.getDate()} ${t('monthsGen')[db.getMonth()]}`;
  return `${fmtDay(da)} – ${fmtDay(db)}`;
}
function untilLabel(d){ const n = dayDiff(today(), d); if (n===0) return t('today'); if (n===1) return t('tomorrow'); return t('inDays', n); }
const fmtMoney = n => n == null || n === '' ? '' : Number(n).toLocaleString(LANG === 'en' ? 'en-US' : 'ru-RU', { maximumFractionDigits: 2 });
const errText = e => { const m = e?.message || String(e); const E = t('err'); for (const k in E) if (m.includes(k)) return E[k]; return m; };
function show(id, ids){ ids.forEach(x => $(x)?.classList.toggle('hidden', x!==id)); }
function iconPicker(el, set, initial){
  let val = initial;
  el.innerHTML = set.map(n => `<button type="button" data-v="${n}" class="${n===val?'on':''}">${icon(n)}</button>`).join('');
  el.onclick = ev => { const b = ev.target.closest('button'); if(!b) return; val = b.dataset.v;
    [...el.children].forEach(c => c.classList.toggle('on', c===b)); };
  return () => val;
}
function chipPicker(el, options, initial, multi = false){
  let val = multi ? new Set(initial || []) : initial;
  const draw = () => el.innerHTML = options.map(([v, label]) => `<button type="button" data-v="${v}" class="${(multi ? val.has(v) : val === v) ? 'on' : ''}">${esc(label)}</button>`).join('');
  draw();
  el.onclick = ev => { const b = ev.target.closest('button'); if (!b) return; const v = b.dataset.v;
    if (multi) { val.has(v) ? val.delete(v) : val.add(v); } else val = v; draw(); };
  return () => multi ? [...val] : val;
}

// ===== Date picker (day first, our own calendar) =====
document.body.insertAdjacentHTML('beforeend', `<dialog id="dpSheet"><div class="sheet">
  <div class="dp-head">
    <button type="button" class="icon-btn" id="dpPrev" aria-label="prev">${icon('left')}</button>
    <select id="dpMonth" style="flex:1.4"></select><select id="dpYear" style="flex:1"></select>
    <button type="button" class="icon-btn" id="dpNext" aria-label="next">${icon('right')}</button>
  </div>
  <div class="grid" id="dpGrid"></div>
  <div class="actions" style="margin-top:14px"><button type="button" class="btn ghost" id="dpClear" data-t="cancel"></button><button type="button" class="btn" id="dpOk" data-t="done"></button></div>
</div></dialog>`);
function setDate(el, v){ el.dataset.value = v || ''; el.innerHTML = `<span>${v ? fmtDay(parseYmd(v), true) : t('pickDate')}</span>${icon('calendar')}`; el.classList.toggle('placeholder', !v); }
const getDate = el => el?.dataset.value || '';
const DP = { el:null, y:0, m:0, sel:null };
function openDP(el){
  const v = getDate(el), d = v ? parseYmd(v) : (el.dataset.near ? parseYmd(el.dataset.near) : today());
  Object.assign(DP, { el, y:d.getFullYear(), m:d.getMonth(), sel:v || null });
  const yNow = new Date().getFullYear(); let opts = '';
  for (let y = yNow + 10; y >= 1940; y--) opts += `<option value="${y}">${y}</option>`;
  $('dpYear').innerHTML = opts;
  $('dpMonth').innerHTML = t('months').map((m,i) => `<option value="${i}">${m}</option>`).join('');
  renderDP(); $('dpSheet').showModal();
}
function renderDP(){
  $('dpYear').value = DP.y; $('dpMonth').value = DP.m;
  const first = (new Date(DP.y, DP.m, 1).getDay() + 6) % 7, start = new Date(DP.y, DP.m, 1 - first), tk = ymd(today());
  let html = t('dow').map(d => `<div class="dow">${d}</div>`).join('');
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i), k = ymd(d);
    if (i >= 35 && d.getMonth() !== DP.m) break;
    html += `<button type="button" class="day ${d.getMonth()!==DP.m?'other':''} ${k===tk?'today':''} ${k===DP.sel?'sel':''}" data-day="${k}">${d.getDate()}</button>`;
  }
  $('dpGrid').innerHTML = html;
}
const dpShift = n => { const d = new Date(DP.y, DP.m + n, 1); DP.y = d.getFullYear(); DP.m = d.getMonth(); renderDP(); };
$('dpPrev').onclick = () => dpShift(-1); $('dpNext').onclick = () => dpShift(1);
$('dpYear').onchange = () => { DP.y = +$('dpYear').value; renderDP(); };
$('dpMonth').onchange = () => { DP.m = +$('dpMonth').value; renderDP(); };
$('dpGrid').onclick = e => { const k = e.target.closest('[data-day]')?.dataset.day; if (!k) return; DP.sel = k;
  const d = parseYmd(k); if (d.getMonth() !== DP.m) { DP.y = d.getFullYear(); DP.m = d.getMonth(); } renderDP(); };
$('dpClear').onclick = () => $('dpSheet').close();
$('dpOk').onclick = () => { if (DP.sel) { setDate(DP.el, DP.sel); DP.el.dispatchEvent(new Event('change')); } $('dpSheet').close(); };
// Any <button class="field" data-date> becomes a date field
document.addEventListener('click', e => { const f = e.target.closest('.field[data-date]'); if (f) openDP(f); });

// ===== Auth for section pages =====
// Returns { user, profile, partner, couple } or sends the person to the main page to sign in.
async function requireCouple(){
  let { data: { session } } = await sb.auth.getSession();
  if (!session && inTG) { try { await tgAuth('auto'); ({ data: { session } } = await sb.auth.getSession()); } catch(_){} }
  if (!session) { location.replace('index.html'); return new Promise(() => {}); }
  const user = session.user;
  const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
  if (!profile?.couple_id) { location.replace('index.html'); return new Promise(() => {}); }
  if (profile.lang && profile.lang !== LANG && T[profile.lang]) { LANG = profile.lang; setPref('lang', LANG); }
  const [{ data: members }, { data: couple }] = await Promise.all([
    sb.from('profiles').select('*').eq('couple_id', profile.couple_id),
    sb.from('couples').select('*').eq('id', profile.couple_id).single()
  ]);
  return { user, profile, couple, partner: (members || []).find(m => m.id !== user.id) || null };
}
// Back navigation for section pages (also Telegram's own back button)
function setupBack(){
  const go = () => { if (history.length > 1 && document.referrer.includes(location.host)) history.back(); else location.href = 'index.html#sections'; };
  document.querySelectorAll('[data-back]').forEach(b => b.onclick = go);
  const a = tgApp(); if (inTG && a?.BackButton) { try { a.BackButton.show(); a.BackButton.onClick(go); } catch(_){} }
}

applyTheme();

// ===== Bottom sheets: close on backdrop tap and on swipe down =====
(function(){
  const open = HTMLDialogElement.prototype.showModal;
  const stack = [];
  HTMLDialogElement.prototype.showModal = function(){ this.returnValue = ''; const i = stack.indexOf(this); if (i >= 0) stack.splice(i, 1); stack.push(this); const s = this.querySelector('.sheet'); if (s) { s.style.transform = ''; s.style.transition = ''; } return open.call(this); };
  // Escape should never count as "save"
  document.addEventListener('cancel', e => { if (e.target.tagName === 'DIALOG') e.target.returnValue = 'cancel'; }, true);
  // A tap on the dimmed area: works with pointer events (iOS doesn't send click to non-clickable elements)
  const outside = (d, x, y) => { const s = d.querySelector('.sheet') || d.firstElementChild; if (!s) return true;
    const r = s.getBoundingClientRect(); return y < r.top || y > r.bottom || x < r.left || x > r.right; };
  // the most recently opened dialog that is still open is the one on top
  const topDialog = () => { for (let i = stack.length - 1; i >= 0; i--) if (stack[i].open) return stack[i]; stack.length = 0; return null; };
  let down = null;
  document.addEventListener('pointerdown', e => { const d = topDialog(); down = d && outside(d, e.clientX, e.clientY) ? { d, x:e.clientX, y:e.clientY } : null; }, true);
  document.addEventListener('pointerup', e => {
    const dn = down; down = null;
    if (!dn || !dn.d.open || Math.abs(e.clientX - dn.x) > 12 || Math.abs(e.clientY - dn.y) > 12) return;
    if (outside(dn.d, e.clientX, e.clientY)) { e.preventDefault(); dn.d.close('cancel'); swallowUntil = Date.now() + 500; }
  }, true);
  // the tap must not fall through to whatever is under the closed sheet
  let swallowUntil = 0;
  document.addEventListener('click', e => { if (Date.now() < swallowUntil) { swallowUntil = 0; e.preventDefault(); e.stopPropagation(); } }, true);
  // Swipe the sheet down to close it (only when it is scrolled to the top)
  let drag = null;
  document.addEventListener('touchstart', e => {
    const s = e.target.closest?.('dialog[open] .sheet'); if (!s || s.scrollTop > 0) return;
    if (e.target.closest('input,textarea,select,.mcard')) return;
    drag = { s, y: e.touches[0].clientY, dy: 0 };
  }, { passive: true });
  document.addEventListener('touchmove', e => {
    if (!drag) return;
    drag.dy = Math.max(0, e.touches[0].clientY - drag.y);
    if (drag.dy > 0 && drag.s.scrollTop <= 0) { drag.s.style.transition = 'none'; drag.s.style.transform = `translateY(${drag.dy}px)`; }
  }, { passive: true });
  document.addEventListener('touchend', () => {
    if (!drag) return; const { s, dy } = drag; drag = null;
    s.style.transition = 'transform .2s';
    if (dy > 90) { s.style.transform = 'translateY(100%)'; setTimeout(() => { s.closest('dialog').close('cancel'); }, 180); }
    else s.style.transform = '';
  });
})();
