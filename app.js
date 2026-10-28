(()=>{
const S=window.SITE,$=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
let cart=store.get('sh_cart',{}),promo=store.get('sh_promo',null),cat='all';
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2800)};
const price=p=>p.price==null?'Ціну уточнюйте':p.price+' '+S.currency;
const prod=id=>S.products.find(p=>p.id===id);
const save=()=>{store.set('sh_cart',cart);$('#cartCount').textContent=Object.values(cart).reduce((a,b)=>a+b,0)};
const copy=async t=>{try{await navigator.clipboard.writeText(t);return true}catch{const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();let ok=false;try{ok=document.execCommand('copy')}catch{}a.remove();return ok}};
const pic=p=>`<div class="pic">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`:esc(p.icon||'📦')}</div>`;
const card=p=>`<article class="card">${pic(p)}<h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><ul>${p.perks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="price">${price(p)}</div><button class="btn" data-add="${esc(p.id)}">Додати в кошик</button></article>`;
const totals=()=>{let sum=0,unk=false;for(const[id,q]of Object.entries(cart)){const p=prod(id);if(!p)continue;if(p.price==null)unk=true;else sum+=p.price*q}
 const pc=promo?S.promos.find(x=>x.code===promo):null,disc=pc?Math.round(sum*pc.percent)/100:0;return{sum,unk,disc,total:sum-disc,pc}};
function orderText(nick,dn){const t=totals();const lines=Object.entries(cart).map(([id,q])=>{const p=prod(id);return p?`• ${p.name} × ${q} — ${p.price==null?'ціна уточнюється':p.price*q+' '+S.currency}`:''}).filter(Boolean);
 return `Привіт! Хочу купити на ${S.name}:\n${lines.join('\n')}\nСума: ${t.total} ${S.currency}${t.unk?' (+ товари з уточненням ціни)':''}${promo&&t.pc?`\nПромокод: ${promo} (−${t.pc.percent}%)`:''}\nНік у Minecraft: ${nick}\nМій Discord: ${dn}`}

const views={
home(){const pop=S.products.filter(p=>p.popular);
 return `<section class="hero"><h1>${esc(S.name)}</h1><p>${esc(S.description)}</p>
 <div class="ipbox"><span>IP:</span><code>${esc(S.ip)}</code><button class="btn sm" id="copyIp">Копіювати IP</button></div>
 <div class="row"><a class="btn alt" href="${esc(S.discord)}" target="_blank" rel="noopener">Discord</a><a class="btn" href="#/shop">До магазину</a>
 <span class="status" id="online"><i class="dot"></i>Перевіряємо статус…</span></div></section>
 ${pop.length?`<h2>Популярні донати</h2><div class="grid">${pop.map(card).join('')}</div>`:''}
 <h2>Переваги сервера</h2><div class="grid">${S.advantages.map(a=>`<div class="card"><div style="font-size:2rem">${a.i}</div><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p></div>`).join('')}</div>`},
shop(){const list=S.products.filter(p=>cat==='all'||p.cat===cat);
 return `<h2>Магазин</h2><div class="tabs">${[{id:'all',name:'Усе'},...S.categories].map(c=>`<button class="btn ${c.id===cat?'on':''}" data-cat="${esc(c.id)}">${esc(c.name)}</button>`).join('')}</div>
 <div class="grid">${list.map(card).join('')||'<p>У цій категорії поки немає товарів.</p>'}</div>
 <div class="note">Оплата та видача відбуваються в Discord: ви оформлюєте замовлення тут, а далі пишете власнику (${esc(S.discordNick)}).</div>`},
cart(){const ids=Object.keys(cart).filter(prod);
 if(!ids.length)return `<h2>Кошик</h2><div class="box">Кошик порожній. <a href="#/shop">Перейти до магазину</a></div>`;
 const t=totals();
 return `<h2>Кошик</h2><div class="box"><table>${ids.map(id=>{const p=prod(id);return `<tr><td>${esc(p.name)}</td><td>${price(p)}</td><td><button class="btn sm ghost" data-dec="${esc(id)}">−</button> ${cart[id]} <button class="btn sm ghost" data-add="${esc(id)}">+</button></td><td><button class="btn sm ghost" data-del="${esc(id)}">Видалити</button></td></tr>`}).join('')}</table>
 <label for="pc">Промокод</label><div class="row"><input id="pc" style="max-width:220px" value="${esc(promo||'')}"><button class="btn sm" id="applyPc">Застосувати</button></div>
 <p>Сума: ${t.sum} ${S.currency}${t.disc?` · Знижка: −${t.disc} ${S.currency}`:''}</p><p class="price">Разом: ${t.total} ${S.currency}${t.unk?' + товари з уточненням ціни':''}</p>
 <a class="btn" href="#/checkout">Оформити замовлення</a></div>`},
checkout(){if(!Object.keys(cart).filter(prod).length){location.hash='#/cart';return''}
 return `<h2>Оформлення замовлення</h2><div class="box"><label for="mc">Нік у Minecraft</label><input id="mc" maxlength="16" placeholder="Steve" autocomplete="off">
 <label for="dn">Ваш нік у Discord</label><input id="dn" maxlength="40" autocomplete="off">
 <p class="note">Сайт не приймає платежі. Натисніть кнопку — текст замовлення скопіюється й відкриється Discord. Надішліть його користувачу <b>${esc(S.discordNick)}</b> і домовтеся про оплату й видачу там.</p>
 <button class="btn alt" id="send">Скопіювати замовлення і відкрити Discord</button></div>
 <div id="orderOut"></div>`},
orders(){const o=store.get('sh_orders',[]);return `<h2>Мої замовлення</h2><p class="note">Список зберігається лише в цьому браузері. Статус оплати й видачі підтверджує власник у Discord.</p>
 ${o.length?`<div class="box"><table>${o.map(x=>`<tr><td>${esc(x.date)}</td><td><pre style="margin:0;white-space:pre-wrap;font:inherit">${esc(x.text)}</pre></td><td>Надіслано в Discord</td></tr>`).join('')}</table></div>`:'<div class="box">Замовлень ще немає.</div>'}`},
news(){return `<h2>Новини</h2>${S.news.map(n=>`<article class="box news"><time>${esc(n.date)}</time><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></article>`).join('')}`},
rules(){return `<h2>Правила</h2><div class="box"><ol>${S.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ol></div>`},
support(){return `<h2>Підтримка</h2><div class="box"><p>${esc(S.support)}</p><a class="btn alt" href="${esc(S.discord)}" target="_blank" rel="noopener">Відкрити Discord</a></div>`},
contacts(){return `<h2>Контакти</h2><div class="box"><p>${esc(S.contacts)}</p><p>IP сервера: <code>${esc(S.ip)}</code></p><a class="btn alt" href="${esc(S.discord)}" target="_blank" rel="noopener">Discord</a> <a class="btn ghost" href="#/orders">Мої замовлення</a></div>`}
};
async function online(){const el=$('#online');if(!el)return;
 try{const r=await fetch('https://api.mcsrvstat.us/3/'+encodeURIComponent(S.ip));const d=await r.json();
  if(d.online)el.innerHTML=`<i class="dot on"></i>Онлайн: ${d.players?.online??0}/${d.players?.max??'?'}`;
  else el.innerHTML='<i class="dot off"></i>Сервер зараз вимкнений (Aternos вмикається вручну)'}
 catch{el.innerHTML='<i class="dot"></i>Статус недоступний'}}
function render(){const r=(location.hash.replace('#/','')||'home').split('?')[0];const v=views[r]||views.home;
 app.innerHTML=v();document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#/'+r||(r==='home'&&a.getAttribute('href')==='#/')));
 $('#nav').classList.remove('open');window.scrollTo(0,0);if(r==='home')online()}
document.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(b.id==='burger'){$('#nav').classList.toggle('open');return}
 if(d.add){cart[d.add]=(cart[d.add]||0)+1;save();toast('Додано в кошик');if(location.hash==='#/cart')render()}
 else if(d.dec){cart[d.dec]--;if(cart[d.dec]<=0)delete cart[d.dec];save();render()}
 else if(d.del){delete cart[d.del];save();render()}
 else if(d.cat){cat=d.cat;render()}
 else if(b.id==='copyIp')toast(await copy(S.ip)?'IP скопійовано: '+S.ip:'Не вдалося скопіювати — виділіть IP вручну');
 else if(b.id==='applyPc'){const c=$('#pc').value.trim().toUpperCase();if(!c){promo=null}else if(S.promos.some(x=>x.code===c)){promo=c;toast('Промокод застосовано')}else{promo=null;toast('Такого промокоду немає')}store.set('sh_promo',promo);render()}
 else if(b.id==='send'){const mc=$('#mc').value.trim(),dn=$('#dn').value.trim();
  if(!/^[A-Za-z0-9_]{3,16}$/.test(mc)){toast('Нік Minecraft: 3–16 символів, літери латиницею, цифри або _');return}
  if(dn.length<2){toast('Вкажіть свій нік у Discord');return}
  const text=orderText(mc,dn),ok=await copy(text),o=store.get('sh_orders',[]);o.unshift({date:new Date().toLocaleString('uk-UA'),text});store.set('sh_orders',o.slice(0,30));
  $('#orderOut').innerHTML=`<div class="box"><p>${ok?'Текст замовлення скопійовано.':'Скопіюйте текст нижче вручну.'} Надішліть його користувачу <b>${esc(S.discordNick)}</b> у Discord. Це ще не оплата.</p><pre style="white-space:pre-wrap">${esc(text)}</pre><a class="btn alt" href="${esc(S.discord)}" target="_blank" rel="noopener">Відкрити Discord</a></div>`;
  cart={};save()}});
window.addEventListener('hashchange',render);save();render();
})();
