import { useState, useEffect, useCallback, useRef } from “react”;

/* FONTS */
if(typeof document!==“undefined”&&!document.querySelector(’link[href*=“Cormorant”]’)){const l=document.createElement(“link”);l.rel=“stylesheet”;l.href=“https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap”;document.head.appendChild(l);}

/* CSS — all sizes in px, min-height 48px for buttons */
const _SI=“hx2”;if(typeof document!==“undefined”&&!document.getElementById(_SI)){const s=document.createElement(“style”);s.id=_SI;s.textContent=`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0}html,body{overscroll-behavior:none;-webkit-font-smoothing:antialiased}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}@keyframes glow{0%,100%{box-shadow:0 0 4px rgba(212,168,48,.15)}50%{box-shadow:0 0 16px rgba(212,168,48,.4)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}@keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.7}}@keyframes mapPulse{0%,100%{box-shadow:0 0 2px currentColor}50%{box-shadow:0 0 10px currentColor}}@keyframes mapGlow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.4)}}@keyframes orbSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes lineDraw{to{stroke-dashoffset:0}}@keyframes fogDrift{0%{background-position:0 0}100%{background-position:100px 50px}}@keyframes mapFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-2px) scale(1.04)}}@keyframes ripple{0%{box-shadow:0 0 0 0 rgba(212,168,48,.3)}100%{box-shadow:0 0 0 8px rgba(212,168,48,0)}}.fade{animation:fadeIn .3s ease both}.btn{touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;font-family:'Inter',system-ui,sans-serif;font-size:16px;border-radius:10px;border:1px solid rgba(184,150,90,.15);background:rgba(16,12,28,.95);color:#d0c8b0;padding:14px 18px;display:flex;align-items:center;gap:10px;width:100%;text-align:left;transition:all .12s;min-height:52px}.btn:active{transform:scale(.97);filter:brightness(.85)}.btn-gold{border-color:rgba(212,168,48,.3);background:rgba(212,168,48,.06)}.btn-red{border-color:rgba(192,64,64,.3);background:rgba(192,64,64,.06)}.btn-green{border-color:rgba(90,171,110,.3);background:rgba(90,171,110,.06)}.panel{background:rgba(16,12,28,.95);border:1px solid rgba(184,150,90,.15);border-radius:12px;padding:16px}.title{font-family:'Cormorant Garamond',Georgia,serif;color:#f0e0c0;font-weight:700;line-height:1.25}.label{font-family:'Inter',system-ui,sans-serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#7a6a55;font-weight:600}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(184,150,90,.2);border-radius:2px}`;document.head.appendChild(s);}

/* AUDIO */
const _AC={ctx:null};function ac(){if(!_AC.ctx)_AC.ctx=new(window.AudioContext||window.webkitAudioContext)();if(_AC.ctx.state===“suspended”)*AC.ctx.resume();return *AC.ctx;}
function playP(w,wr,wn){try{const WF={ME:220,WE:174.6,YOU:196,THEY:146.8},WS={EAST:[0,2,4,7,9],SOUTH:[0,4,7,11,14],WEST:[0,3,5,7,10],NORTH:[0,2,5,9,12]},WE*={SPRING:{a:.02,r:.3,l:.3,t:1.4},SUMMER:{a:.08,r:.6,l:.45,t:1},AUTUMN:{a:.15,r:.8,l:.55,t:.75},WINTER:{a:.3,r:1.5,l:.75,t:.5}},WW={ME:“triangle”,WE:“sawtooth”,YOU:“sine”,THEY:“square”};const c=ac(),f=WF[w],sc=WS[wr],en=WE*[wn],now=c.currentTime+.05,mg=c.createGain();mg.gain.setValueAtTime(.25,now);mg.connect(c.destination);sc.slice(0,3).forEach((s,i)=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(mg);o.type=WW[w];o.frequency.setValueAtTime(f*Math.pow(2,s/12),now);const t=now+i*en.l*(1/en.t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12,t+en.a);g.gain.linearRampToValueAtTime(0,t+en.l+en.r);o.start(t);o.stop(t+en.l+en.r+.1);});}catch(e){}}
function sfx(type){try{const c=ac(),now=c.currentTime+.02,mk=(f,vol,wv,at,rt,t0=0)=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type=wv||“sine”;o.frequency.setValueAtTime(f,now+t0);g.gain.setValueAtTime(0,now+t0);g.gain.linearRampToValueAtTime(vol,now+t0+at);g.gain.linearRampToValueAtTime(0,now+t0+at+rt);o.start(now+t0);o.stop(now+t0+at+rt+.05);};if(type===“select”){mk(440,.05,“sine”,.02,.12);mk(554,.04,“sine”,.02,.12,.06);}if(type===“move”)mk(330,.04,“triangle”,.01,.1);if(type===“victory”)[261,329,392,523,659].forEach((f,i)=>mk(f,.06,“triangle”,.01,.3,i*.08));if(type===“defeat”)[330,294,261,220].forEach((f,i)=>mk(f,.05,“sawtooth”,.02,.35,i*.1));if(type===“fragment”)[523,659,784,1047].forEach((f,i)=>mk(f,.06,“sine”,.01,.25,i*.07));if(type===“ok”){mk(440,.04,“sine”,.02,.1);mk(554,.03,“sine”,.02,.1,.05);}if(type===“fail”)[330,294].forEach((f,i)=>mk(f,.05,“sawtooth”,.02,.25,i*.1));if(type===“hit”){mk(120,.07,“sawtooth”,.005,.08);}if(type===“story”)[392,494,523].forEach((f,i)=>mk(f,.03,“sine”,.03,.35,i*.15));}catch(e){}}

/* DATA */
const WHL=[“ME”,“WE”,“YOU”,“THEY”],WRL=[“EAST”,“SOUTH”,“WEST”,“NORTH”],WNL=[“SPRING”,“SUMMER”,“AUTUMN”,“WINTER”];
const WHC={ME:“10”,WE:“11”,YOU:“01”,THEY:“00”},WRC={EAST:“10”,SOUTH:“11”,WEST:“01”,NORTH:“00”},WNC={SPRING:“10”,SUMMER:“11”,AUTUMN:“01”,WINTER:“00”};
const WCO={ME:”#C07830”,WE:”#c03030”,YOU:”#2080b0”,THEY:”#7040a0”},WLA={ME:“Самітники”,WE:“Держави”,YOU:“Мережі”,THEY:“Домени”};
const WHLA={EAST:“Схід”,SOUTH:“Південь”,WEST:“Захід”,NORTH:“Північ”},WNLA={SPRING:“Весна”,SUMMER:“Літо”,AUTUMN:“Осінь”,WINTER:“Зима”},WNSYM={SPRING:“✦”,SUMMER:“☀”,AUTUMN:“❧”,WINTER:“❄”};
const PN={“ME-EAST-SPRING”:“Пробудження Єства”,“ME-EAST-SUMMER”:“Спека Волі”,“ME-EAST-AUTUMN”:“Дзеркало Снів”,“ME-EAST-WINTER”:“Кришталева Тиша”,“ME-SOUTH-SPRING”:“Іскра Первородного”,“ME-SOUTH-SUMMER”:“Вогняне Серце”,“ME-SOUTH-AUTUMN”:“Жертвенний Листопад”,“ME-SOUTH-WINTER”:“Печера Мудреців”,“ME-WEST-SPRING”:“Паросток Руїни”,“ME-WEST-SUMMER”:“Шлях Без Повороту”,“ME-WEST-AUTUMN”:“Мовчазний Свідок”,“ME-WEST-WINTER”:“Схованка Імені”,“ME-NORTH-SPRING”:“Скрес Криги”,“ME-NORTH-SUMMER”:“Полярне Марево”,“ME-NORTH-AUTUMN”:“Бібліотека Ненаписаного”,“ME-NORTH-WINTER”:“Темна Пустеля”,“WE-EAST-SPRING”:“Хор Світанків”,“WE-EAST-SUMMER”:“Плем’я Вогню”,“WE-EAST-AUTUMN”:“Курган Пам’яті”,“WE-EAST-WINTER”:“Рада Вождів”,“WE-SOUTH-SPRING”:“Торговище”,“WE-SOUTH-SUMMER”:“Бенкет Переможців”,“WE-SOUTH-AUTUMN”:“Осінній Ритуал”,“WE-SOUTH-WINTER”:“Кристальне Царство”,“WE-WEST-SPRING”:“Союз Небайдужих”,“WE-WEST-SUMMER”:“Золотоверхе Місто”,“WE-WEST-AUTUMN”:“Архів Династій”,“WE-WEST-WINTER”:“Бібліотека Снігів”,“WE-NORTH-SPRING”:“Льодяна Федерація”,“WE-NORTH-SUMMER”:“Білий Магніт”,“WE-NORTH-AUTUMN”:“Сутінкова Рада”,“WE-NORTH-WINTER”:“Вічне Мовчання”,“YOU-EAST-SPRING”:“Дзеркало Зорі”,“YOU-EAST-SUMMER”:“Пекуче Відлуння”,“YOU-EAST-AUTUMN”:“Двійник З-За Обрію”,“YOU-EAST-WINTER”:“Відображення У Кризі”,“YOU-SOUTH-SPRING”:“Чужий Розквіт”,“YOU-SOUTH-SUMMER”:“Полум’яний Суперечник”,“YOU-SOUTH-AUTUMN”:“Золота Тінь”,“YOU-SOUTH-WINTER”:“Зимовий Оракул”,“YOU-WEST-SPRING”:“Паросток Надії”,“YOU-WEST-SUMMER”:“Поєдинок Душ”,“YOU-WEST-AUTUMN”:“Договір Довіри”,“YOU-WEST-WINTER”:“Крижана Клятва”,“YOU-NORTH-SPRING”:“Посланець Без Імені”,“YOU-NORTH-SUMMER”:“Зоряне Полотно”,“YOU-NORTH-AUTUMN”:“Незнайомець Між Світами”,“YOU-NORTH-WINTER”:“Порожнє Дзеркало”,“THEY-EAST-SPRING”:“Пробудження Схеми”,“THEY-EAST-SUMMER”:“Вічний Двигун”,“THEY-EAST-AUTUMN”:“Давній Порядок”,“THEY-EAST-WINTER”:“Замерзлий Закон”,“THEY-SOUTH-SPRING”:“Нова Імперія”,“THEY-SOUTH-SUMMER”:“Полум’яна Фабрика”,“THEY-SOUTH-AUTUMN”:“Осінній Колос”,“THEY-SOUTH-WINTER”:“Кристальний Монарх”,“THEY-WEST-SPRING”:“Перший Протокол”,“THEY-WEST-SUMMER”:“Золота Павутина”,“THEY-WEST-AUTUMN”:“Руїни Системи”,“THEY-WEST-WINTER”:“Засипаний Алгоритм”,“THEY-NORTH-SPRING”:“Каркас Сущого”,“THEY-NORTH-SUMMER”:“Полярний Розум”,“THEY-NORTH-AUTUMN”:“Сховище Формул”,“THEY-NORTH-WINTER”:“Абсолютна Порожнеча”};
const PL={“ME-EAST”:“Кожна душа — окремий всесвіт.”,“ME-SOUTH”:“Полум’я тут живе й пам’ятливе.”,“ME-WEST”:“Хто впав — підводиться мудрішим.”,“ME-NORTH”:“Край буття. Думки стають кристалами.”,“WE-EAST”:“Мільйон голосів у єдиному співі.”,“WE-SOUTH”:“Кожна перемога — спільне свято.”,“WE-WEST”:“Пам’ять — колективна річка.”,“WE-NORTH”:“Вирішує згода мільярда свідомостей.”,“YOU-EAST”:“Кожні очі відбивають тебе іншого.”,“YOU-SOUTH”:“Докупи вони міцніші за армію.”,“YOU-WEST”:“Довіра — єдина монета.”,“YOU-NORTH”:“Чужинці стають побратимами.”,“THEY-EAST”:“Дехто з автоматонів — марить.”,“THEY-SOUTH”:“Машина не знає зупинки.”,“THEY-WEST”:“Занепад — це перезавантаження.”,“THEY-NORTH”:“Закони тут одвічні.”};
const ALLP=[];for(const w of WHL)for(const r of WRL)for(const n of WNL)ALLP.push({who:w,where:r,when:n,key:`${w}-${r}-${n}`});
const gk=(w,r,n)=>`${w}-${r}-${n}`,gbin=(w,r,n)=>WHC[w]+WRC[r]+WNC[n],ham=(a,b)=>{let d=0;for(let i=0;i<a.length;i++)if(a[i]!==b[i])d++;return d;},isAdj=(p1,p2)=>ham(gbin(p1.who,p1.where,p1.when),gbin(p2.who,p2.where,p2.when))===1;
const adjT=(p1,p2)=>p1.who!==p2.who?“Фракція”:p1.where!==p2.where?“Сторона”:“Пора”;
const shuf=a=>{const b=[…a];for(let i=b.length-1;i>0;i–){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v)),pdiff=key=>{const p=ALLP.find(x=>x.key===key);if(!p)return 3;return ham(gbin(“ME”,“EAST”,“SPRING”),gbin(p.who,p.where,p.when))+1;};
const pyield=who=>({ME:{gold:1,mana:2,iron:0,influence:0},WE:{gold:2,mana:0,iron:2,influence:0},YOU:{gold:1,mana:0,iron:0,influence:2},THEY:{gold:1,mana:1,iron:1,influence:1}}[who]);

/* SUBIT Canon: WHO×WHERE×WHEN = 6-bit code */
const BIGRAM_COL={“10”:”#2080b0”,“11”:”#5aab6e”,“01”:”#c0a030”,“00”:”#9060b8”};
const BIGRAM_NAME={“10”:“Ян-Інь”,“11”:“Ян-Ян”,“01”:“Інь-Ян”,“00”:“Інь-Інь”};
const CODE_LABEL={ME:“Я·10”,WE:“Ми·11”,YOU:“Ти·01”,THEY:“Вони·00”,EAST:“Схід·10”,SOUTH:“Південь·11”,WEST:“Захід·01”,NORTH:“Північ·00”,SPRING:“Весна·10”,SUMMER:“Літо·11”,AUTUMN:“Осінь·01”,WINTER:“Зима·00”};
const FRAGS=new Set([“WE-SOUTH-SUMMER”,“YOU-WEST-AUTUMN”,“THEY-NORTH-WINTER”,“ME-SOUTH-SUMMER”]),CORE=“ME-NORTH-WINTER”;
const TUTORIAL=[
{id:0,title:“Ласкаво просимо!”,text:“Ти на одній з 64 планет Гексеракту — кристалічної структури, що тримає всесвіт. Ядро зруйноване, 4 уламки розсіяні по світах.”,tip:“Натисни на планету в переліку «Куди рухатися», щоб перейти на неї. Сусідні планети відрізняються лише одним виміром — це основний закон Гексеракту.”},
{id:1,title:“Події та Замок”,text:“При переході трапляються події — обирай мудро, кожен вибір змінює ресурси. Після події розгадай Замок Бітів: знайди правильні 0 та 1 використовуючи XOR підказки.”,tip:“XOR — просто: якщо два біти однакові (0+0 або 1+1) — результат 0. Якщо різні (0+1 або 1+0) — результат 1.”},
{id:2,title:“Ресурси та Бій”,text:“💰 Золото · 🔮 Мана · ⚔ Залізо · 🌿 Вплив · 🗡 Армія — ресурси, що накопичуються щоходу з підкорених планет. Планети з ⚔ — ворожі, готуйся до бою!”,tip:“Шукай ◈ уламки Ядра та ★ Браму. Зібравши 4 уламки, іди до Темної Пустелі щоб відновити Гексеракт!”},
];

const STORY_ACTS=[
{id:0,n:“Пролог”,t:“Голос із безодні”,tr:s=>true,
txt:“Гексеракт — кристалічна структура шістдесяти чотирьох світів — розколотий. Ядро, що тримало рівновагу, розбите на чотири уламки. Хтось або щось зробило це навмисно. Ти прокидаєшся на одній з планет, не пам’ятаючи нічого, крім голосу.”,
voice:”«Відшукай мене. Допоки час не сплинув як вода крізь пальці. Я — те, що лишилось від порядку.»”},
{id:1,n:“Акт І”,t:“Тінь на горизонті”,tr:s=>s.ctrl>=4,
txt:“Ти вже розумієш закони цього всесвіту. Кожна планета — вузол у шестивимірному гіперкубі. Сусіди відрізняються на один біт. Але ти не один, хто рухається. На горизонті — тінь, що ковтає світло. Архонт Безодні знає, що ти шукаєш уламки.”,
voice:”«Він не злий і не добрий. Він — простір між нулем та одиницею. Порожнеча, що стала свідомою.»”},
{id:2,n:“Акт ІІ”,t:“Перший уламок”,tr:s=>s.frags>=1,
txt:“Уламок пульсує в твоїх долонях — теплий, живий, ніби серцебиття немовляти. І з цим пульсом приходить бачення: Ядро не було зруйноване ворогом. Хтось із Першого Ордену Зберігачів розколов його добровільно.”,
voice:”«Чому? Бо єдність — це тюрма. Бо шістдесят чотири світи заслуговують на свободу від мого контролю. Так казав Зберігач перед тим, як вдарив.»”},
{id:3,n:“Акт ІІІ”,t:“Зрадник чи герой?”,tr:s=>s.frags>=2,
txt:“Другий уламок розкриває більше: Зберігач, що розколов Ядро, — не зник. Він став Архонтом Безодні. Людина, що хотіла звільнити світи, перетворилась на втілення хаосу. Його мотиви були благородними. Його наслідки — катастрофічними.”,
voice:”«Я був як ти. Шукав, вірив, збирав. А потім зрозумів, що Ядро — клітка. Що єдність — диктатура. Що хаос — єдина справжня свобода. Я помилявся. Чи ні?»”},
{id:4,n:“Акт IV”,t:“Пропозиція Архонта”,tr:s=>s.frags>=3,
txt:“Архонт Безодні з’являється. Не тінь — істота з обличчям, в якому ти впізнаєш риси кожного, кого зустрічав. Він простягає четвертий уламок. «Візьми. Але знищ один із трьох зібраних. Три уламки — це майже порядок. Достатньо, щоб жити. Чотири — це повна єдність. Тюрма.» Ти відмовляєшся. Він зникає. Але уламок лишається на підлозі.”,
voice:”«Я не ворог. Я — питання, на яке ти ще не відповів.»”},
];
const FRAG_LORE={
“WE-SOUTH-SUMMER”:{t:“Уламок Полум’я”,txt:“Гарячий, як кров воїна. Уламок пам’ятає тисячі битв. Кожна смерть — іскра, що тримає каркас буття. Хтось мусить жертвувати, щоб структура стояла.”,q:”«Без жертви нема каркасу.» — Перший Закон Ядра”},
“YOU-WEST-AUTUMN”:{t:“Уламок Дзеркал”,txt:“Холодний на дотик, але тремтить, коли підносиш до обличчя. Він відбиває не тебе — а всіх, кого ти зустрів. Партнерів, ворогів, випадкових перехожих. Усі вони — частина тебе.”,q:”«Ти — сума кожної зустрічі.» — Другий Закон Ядра”},
“THEY-NORTH-WINTER”:{t:“Уламок Порожнечі”,txt:“Чистий лід, що не тане. Нічого не випромінює. Але тримаючи його, ти раптом розумієш: порожнеча — це не відсутність. Це простір. Між нулем і одиницею — безкінечність станів.”,q:”«Між нулем і одиницею — безмежжя.» — Третій Закон Ядра”},
“ME-SOUTH-SUMMER”:{t:“Уламок Волі”,txt:“Найгарячіший з чотирьох. Пульсує в такт твоєму серцю. Тримаючи його, ти розумієш: Ядро створене не з математики. Воно створене з бажання жити. З волі, яку не можна звести до бітів.”,q:”«Волю не записати жодним кодом.» — Четвертий Закон Ядра”},
};

const HEROES=[{id:“ranger”,name:“Аерон”,title:“Мандрівник”,faction:“ME”,icon:“🌙”,atk:4,def:3,mag:3,ldr:3,maxHp:80,start:“ME-EAST-SPRING”,gold:60,army:20,ability:“Рухається без штрафів”,lore:“Народився між зірками.”},{id:“mage”,name:“Ізольда”,title:“Архімаг”,faction:“ME”,icon:“🔮”,atk:2,def:2,mag:7,ldr:2,maxHp:65,start:“ME-NORTH-AUTUMN”,gold:70,army:12,ability:“Загадки +2 Мани”,lore:“40 років серед книг.”},{id:“warrior”,name:“Рагнар”,title:“Маршал”,faction:“WE”,icon:“⚔️”,atk:8,def:5,mag:1,ldr:4,maxHp:110,start:“WE-SOUTH-SUMMER”,gold:50,army:35,ability:“HP<40%: Атака×1.5”,lore:“17 перемог. 1 поразка.”},{id:“diplomat”,name:“Сівілла”,title:“Дипломат”,faction:“YOU”,icon:“🪞”,atk:2,def:4,mag:4,ldr:7,maxHp:70,start:“YOU-EAST-SPRING”,gold:80,army:15,ability:“Переговори за 30 Впливу”,lore:“Тричі уклала мир.”},{id:“king”,name:“Орфей”,title:“Король”,faction:“WE”,icon:“👑”,atk:4,def:4,mag:3,ldr:8,maxHp:90,start:“WE-WEST-SUMMER”,gold:100,army:30,ability:“Армія −25% вартості”,lore:“Втратив все. Знайшов нове.”},{id:“engineer”,name:“Ксенос”,title:“Архітект”,faction:“THEY”,icon:“⚙️”,atk:3,def:6,mag:4,ldr:3,maxHp:85,start:“THEY-WEST-SPRING”,gold:75,army:18,ability:“Планети +50% ресурсів”,lore:“Конфлікти — баги.”}];
const EVTS={ME:[{title:“Печера Оракула”,text:“Старець у серці кам’яних гір зберігає єдину правду про Шістдесят П’яту Сферу.”,choices:[{l:“Вислухати”,ic:“👁”,ef:{mana:3,hp:-8},lg:”«Сфера — стан свідомості.»”},{l:“Дати золото”,ic:“💰”,ef:{gold:-25,xp:30},lg:“Мудрець зник.”},{l:“Мимо”,ic:“→”,ef:{},lg:“Деякі зустрічі — зайві.”}]},{title:“Самотній Паладін”,text:“Паладін у побитих обладунках шукає свого короля, що загинув триста літ тому.”,choices:[{l:“До армії”,ic:“⚔”,ef:{army:12,gold:-15},lg:“Він присягнув на вірність.”},{l:“Правду”,ic:“💬”,ef:{influence:4,xp:20},lg:“Він мовчки кивнув.”},{l:“Мимо”,ic:“→”,ef:{},lg:“Не твоя справа.”}]},{title:“Примарний Караван”,text:“Караван торговців із зниклої планети матеріалізується з туману. Їхні очі — порожні, але товари — справжні.”,choices:[{l:“Торгувати”,ic:“💰”,ef:{gold:-20,iron:15,mana:5},lg:“Товари справжні. А торговці розчинились.”},{l:“Запитати дорогу”,ic:“🧭”,ef:{xp:35,influence:3},lg:“Вони вказали шлях, якого нема на карті.”},{l:“Тікати”,ic:“💨”,ef:{hp:-5},lg:“Інстинкт не підвів — але страх лишився.”}]},{title:“Сон наяву”,text:“Ти бачиш себе — іншого себе — на сусідній планеті. Він робить усе навпаки.”,choices:[{l:“Зустрітися”,ic:“🪞”,ef:{mag:2,hp:-12},lg:“Двійник зник. Але залишив знання.”},{l:“Спостерігати”,ic:“👁”,ef:{xp:40},lg:“Ти зрозумів, чого уникав все життя.”},{l:“Відвернутися”,ic:“→”,ef:{army:5},lg:“Деякі істини краще не знати.”}]}],WE:[{title:“Бунт Легіону”,text:”«Ми воюємо за ідею, а не за тебе, герою.»”,choices:[{l:“Промовити”,ic:“❤”,ef:{influence:5,army:8},lg:“Легіон став союзником.”},{l:“Силою”,ic:“⚔”,ef:{army:-10},combat:true,lg:“Бунт придушено залізною рукою.”},{l:“Новий вождь”,ic:“👑”,ef:{army:18,gold:-40},lg:“Встановлено нову рівновагу.”}]},{title:“Голодне Місто”,text:“Місто в облозі. Харчів лишилось на два дні.”,choices:[{l:“Провіант”,ic:“🌾”,ef:{gold:-50,influence:6},lg:“Місто врятовано від голоду.”},{l:“Прорив”,ic:“🗡”,ef:{army:15},lg:“Усі живі. Це головне.”},{l:“Мимо”,ic:“→”,ef:{iron:5},lg:“Ціна байдужості стала видимою.”}]},{title:“Зрадник у рядах”,text:“Один із твоїх воїнів — шпигун Архонта. Але хто саме?”,choices:[{l:“Перевірка”,ic:“🔍”,ef:{army:-3,influence:8},lg:“Шпигун знайдений. Інші стали вірнішими.”},{l:“Амністія”,ic:“🕊”,ef:{army:5,gold:-30},lg:“Шпигун зник. Але й напруга теж.”},{l:“Чекати”,ic:“⏳”,ef:{xp:20,hp:-10},lg:“Наступної ночі щось зникло з запасів.”}]},{title:“Фортеця Тиші”,text:“Покинута фортеця. Стіни цілі, ворота відчинені. Вогнище ще тепле.”,choices:[{l:“Обстежити”,ic:“🏰”,ef:{iron:12,gold:15},lg:“Склади повні. Чому тут нікого?”},{l:“Залога”,ic:“🏴”,ef:{army:-8,influence:5},lg:“Нова база.”},{l:“Спалити”,ic:“🔥”,ef:{xp:25},lg:“Вогонь поглинув секрети фортеці.”}]}],YOU:[{title:“Подвійний Агент”,text:”«Мені відомий задум ворога. Ціна — одна твоя таємниця.»”,choices:[{l:“Обмін”,ic:“🔄”,ef:{influence:6,mana:3},frag:true,lg:“Обмін завершено.”},{l:“Відмова”,ic:“🚫”,ef:{xp:15},lg:“Розчинився в тумані.”},{l:“Арешт”,ic:“⚔”,ef:{iron:8,influence:-3},lg:“Схоплений. Але він усміхається.”}]},{title:“Розбите Дзеркало”,text:“Кожен уламок дзеркала — інша версія твого минулого.”,choices:[{l:“Зібрати”,ic:“◈”,ef:{mana:5,hp:-10},lg:“Пам’ять повернулась.”},{l:“Залишити”,ic:“∞”,ef:{xp:25},lg:“Вони прекрасніші в уламках.”},{l:“Знищити”,ic:“💥”,ef:{iron:5,influence:-4},lg:“Без минулого крокувати легше.”}]},{title:“Перехрестя Доль”,text:“Дві незнайомки. Одна каже правду, інша бреше. Обидві знають дорогу до уламку.”,choices:[{l:“Запитати обох”,ic:“❓”,ef:{mana:5,xp:20},lg:“Одна відповідь правдива. Але яка?”},{l:“Довіритись серцю”,ic:“❤”,ef:{influence:6},frag:true,lg:“Серце не помилилось.”},{l:“Свій шлях”,ic:“🚶”,ef:{xp:30},lg:“Інколи найкраща відповідь — не питати.”}]},{title:“Голос із дзеркала”,text:“Дзеркальна стіна. Твоє відображення промовляє: «Ти помиляєшся. Ядро не треба збирати.»”,choices:[{l:“Вислухати”,ic:“🪞”,ef:{mana:8,hp:-15},lg:“Відображення показало альтернативу. Страшну.”},{l:“Розбити”,ic:“💥”,ef:{iron:10,mag:1},lg:“Осколки стали чистими лінзами.”},{l:“Погодитись”,ic:“🤝”,ef:{xp:50,influence:-5},lg:“На мить ти бачив усе очима Архонта.”}]}],THEY:[{title:“Автоматон”,text:”«Протокол Шістдесят П’ять. Ідентифікуйте: Ядро чи Хаос?»”,choices:[{l:”«Союзник»”,ic:“🤖”,ef:{mana:4,xp:20},lg:“Він присягнув на вірність.”},{l:“Атакувати”,ic:“⚔”,ef:{iron:12,army:-6},combat:true,lg:“Бій виснажив обох.”},{l:“Пам’ять”,ic:“⚙”,ef:{xp:40,gold:20},lg:“Завіса секретів розвіялась.”}]},{title:“Занепала Мережа”,text:“Хтось підкинув єдиний баг — і мільярди свідомостей помиляються.”,choices:[{l:“Виправити”,ic:“🔧”,ef:{xp:30,iron:-8},lg:“Мережу відновлено.”},{l:“Хаос”,ic:“⚡”,ef:{gold:40,influence:-5},lg:“Хаос — найкращий момент для дії.”},{l:“Залишити”,ic:“→”,ef:{},lg:“Системи мають право на спокій.”}]},{title:“Оновлення Протоколу”,text:“Автономна мережа пропонує союз. Ціна — дозволити їй переписати одну з твоїх навичок.”,choices:[{l:“Погодитись”,ic:“⚙”,ef:{atk:2,mag:-1},lg:“Тіло міцніше. Але щось у мисленні змінилось.”},{l:“Контрпропозиція”,ic:“🔄”,ef:{gold:30,influence:4},lg:“Обоє виграли.”},{l:“Відхилити”,ic:“✋”,ef:{xp:25},lg:”«Наступного разу ціна буде вищою.»”}]},{title:“Архів Снів”,text:“Сервер зберігає сни всіх істот Гексеракту. Мільярди спогадів, закодовані у біти.”,choices:[{l:“Свої сни”,ic:“💭”,ef:{mana:10,hp:-8},lg:“Ти побачив сон, якого ніколи не бачив. Але він — твій.”},{l:“Сни Архонта”,ic:“👁”,ef:{xp:60,influence:-4},lg:“Архонт колись мріяв про те саме, що й ти.”},{l:“Знищити”,ic:“💀”,ef:{iron:15,mana:-5},lg:“Мільярди снів стали пилом.”}]}],SEASON:[{when:“SPRING”,title:“Весна”,text:“Планета прокидається від зимового сну.”,choices:[{l:“Енергія”,ic:“✦”,ef:{mana:4,gold:10},lg:“Весна підсилила тебе.”},{l:“Союзники”,ic:“🤝”,ef:{army:10,influence:2},lg:“Соратники відгукнулись.”}]},{when:“SUMMER”,title:“Літо”,text:“Літня міць переповнює все навкруги.”,choices:[{l:“Сонце”,ic:“☀”,ef:{army:8,hp:15},lg:“Літня міць наповнила тебе.”},{l:“Ресурси”,ic:“💰”,ef:{gold:30,iron:10},lg:“Урожай зібрано.”}]},{when:“AUTUMN”,title:“Осінь”,text:“В опалому листі мерехтить промінь до Шістдесят П’ятої Сфери.”,choices:[{l:“Слідувати”,ic:“❧”,ef:{mana:3},frag:true,lg:“Шлях відкрився.”},{l:“Координати”,ic:“📖”,ef:{xp:30,mana:2},lg:“Карта чіткіша.”}]},{when:“WINTER”,title:“Зима”,text:“Абсолютна тиша. Ти чуєш пульс самого Гексеракту.”,choices:[{l:“Відповісти”,ic:“❄”,ef:{mana:6,xp:25},frag:true,lg:“Ядро відгукнулось.”},{l:“Відпочити”,ic:“💤”,ef:{hp:20},lg:“Зимовий спокій відновив сили.”}]}]};
function getEvt(who,when,seed){if(seed%4===0){const s=EVTS.SEASON.find(e=>e.when===when);if(s)return s;}const pool=EVTS[who]||[];return pool.length?pool[seed%pool.length]:null;}
function makePuzz(who,where,when){
const code=gbin(who,where,when),bits=code.split(””).map(Number);
const diff=pdiff(gk(who,where,when));
const seed=bits.reduce((a,b,i)=>a+b*(i+1),0);
const puzzType=seed%4; // 0=XOR, 1=pattern, 2=sum, 3=mirror

if(puzzType===0){
// XOR CLASSIC — вгадай приховані біти за XOR правилами
const hideCount=diff<=2?1:2;
const hideIdx=shuf([0,1,2,3,4,5]).slice(0,hideCount);
const shown=bits.map((b,i)=>hideIdx.includes(i)?null:b);
const xorW=bits[0]^bits[1],sumR=bits[2]+bits[3],xorN=bits[4]^bits[5],total=bits.reduce((a,b)=>a+b,0);
const clues=[{rule:`WHO XOR = ${xorW}`,check:u=>(u[0]^u[1])===xorW},{rule:`WHERE + = ${sumR}`,check:u=>(u[2]+u[3])===sumR}];
if(hideCount>1)clues.push({rule:`WHEN XOR = ${xorN}`,check:u=>(u[4]^u[5])===xorN});
clues.push({rule:`Σ = ${total}`,check:u=>u.reduce((a,b)=>a+b,0)===total});
return{type:“xor”,bits,shown,hideIdx,clues,who,where,when,code,diff};
}
if(puzzType===1){
// BIГRAM MATCH — з’єднай пари WHO/WHERE/WHEN з їхніми кодами
const pairs=[{dim:“WHO”,val:who,code:WHC[who]},{dim:“WHERE”,val:where,code:WRC[where]},{dim:“WHEN”,val:when,code:WNC[when]}];
const shuffled=shuf([…pairs]);
const answer=pairs.map(p=>p.code);
return{type:“match”,pairs,shuffled,answer,who,where,when,code,diff};
}
if(puzzType===2){
// HAMMING — знайди яка планета-сусід має код, що відрізняється рівно на 1 біт
const neighbors=ALLP.filter(p=>p.key!==gk(who,where,when)&&isAdj({who,where,when},p));
const decoys=shuf(ALLP.filter(p=>!isAdj({who,where,when},p)&&p.key!==gk(who,where,when))).slice(0,2);
const correct=shuf(neighbors).slice(0,1);
const options=shuf([…correct,…decoys]);
return{type:“hamming”,options,correctKey:correct[0].key,curCode:code,who,where,when,code,diff};
}
// INVERT — знайди планету-дзеркало (інвертуй всі біти)
const inverted=bits.map(b=>1-b).join(””);
const invKey=ALLP.find(p=>gbin(p.who,p.where,p.when)===inverted);
const decoys2=shuf(ALLP.filter(p=>gbin(p.who,p.where,p.when)!==inverted&&p.key!==gk(who,where,when))).slice(0,2);
const opts3=shuf([invKey,…decoys2].filter(Boolean));
return{type:“invert”,inverted,correctKey:invKey?invKey.key:null,curCode:code,options:opts3,who,where,when,code,diff};
}

function GridMap({pos,vis,ctrl,frags,nbrs,onMove,ep}){
const [sel,setSel]=useState(null);
const ck=gk(pos.who,pos.where,pos.when),nKeys=new Set(nbrs.map(n=>gk(n.who,n.where,n.when)));
const sz=Math.min(Math.floor((typeof window!==“undefined”?window.innerWidth-48:320)/8),42);
const gap=3;
const grid=[],pm={};
for(let r=0;r<8;r++)for(let cl=0;cl<8;cl++){
const wi=Math.floor(r/2),wri=(r%2)*2+Math.floor(cl/4),wni=cl%4;
const w=WHL[wi],wr=WRL[wri],wn=WNL[wni],k=gk(w,wr,wn);
grid.push({r,c:cl,who:w,where:wr,when:wn,key:k});pm[k]={r,c:cl};
}
// SVG connection lines from current pos to neighbors
const cx=cl=>cl*(sz+gap)+sz/2, cy=r=>r*(sz+gap)+sz/2;
const lines=[];
nbrs.forEach(n=>{const nk=gk(n.who,n.where,n.when),from=pm[ck],to=pm[nk];
if(from&&to)lines.push({x1:cx(from.c),y1:cy(from.r),x2:cx(to.c),y2:cy(to.r),col:WCO[n.who]});
});
const W=8*(sz+gap)-gap,H=W;

return <div style={{display:“flex”,flexDirection:“column”,gap:10}}>
<div style={{position:“relative”,width:W,height:H,margin:“0 auto”}}>
{/* Fog overlay for unexplored areas */}
<div style={{position:“absolute”,inset:0,borderRadius:8,background:“radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(10,7,20,.6) 100%)”,pointerEvents:“none”,zIndex:4}}/>
{/* SVG layer — connection lines with animation */}
<svg style={{position:“absolute”,inset:0,width:“100%”,height:“100%”,pointerEvents:“none”,zIndex:3}}>
{lines.map((l,i)=>{const len=Math.hypot(l.x2-l.x1,l.y2-l.y1);
return <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.col} strokeWidth={1.5} strokeOpacity={0.5} strokeLinecap=“round” strokeDasharray={len} strokeDashoffset={len} style={{animation:`lineDraw .6s ${i*.08}s ease forwards`}}/>;
})}
{/* Orbiting particle around current position */}
{pm[ck]&&<circle cx={cx(pm[ck].c)} cy={cy(pm[ck].r)} r={sz/2+4} fill=“none” stroke={WCO[pos.who]} strokeWidth={1} strokeOpacity={0.3} strokeDasharray=“4 8” style={{transformOrigin:`${cx(pm[ck].c)}px ${cy(pm[ck].r)}px`,animation:“orbSpin 8s linear infinite”}}/>}
</svg>
{/* Grid cells */}
<div style={{display:“grid”,gridTemplateColumns:`repeat(8,${sz}px)`,gap,position:“relative”,zIndex:2}}>
{grid.map((p,idx)=>{
const pk=p.key,isCur=pk===ck,isN=nKeys.has(pk),isV=vis.has(pk),isOwn=ctrl.has(pk),isEn=ep.has(pk)&&!ctrl.has(pk),hasFrag=FRAGS.has(pk)&&!frags.has(pk),isCore=pk===CORE,isSel=sel===pk;
const col=WCO[p.who];
// Background gradient based on faction + season
const seasonTint=p.when===“SPRING”?“rgba(90,200,90,.08)”:p.when===“SUMMER”?“rgba(255,200,50,.08)”:p.when===“AUTUMN”?“rgba(200,120,50,.08)”:“rgba(100,150,255,.08)”;
let bg=isV?`linear-gradient(135deg,${col}12,${seasonTint})`:“rgba(8,5,14,.9)”;
let brd=“1px solid transparent”,shadow=“none”,anim=””;
if(isCur){bg=`radial-gradient(circle,${col},${col}88)`;brd=“2px solid #ffffffcc”;shadow=`0 0 12px ${col}66`;anim=“mapFloat 3s ease infinite”;}
else if(isOwn){bg=`linear-gradient(135deg,${col}35,${col}18)`;brd=`1px solid ${col}44`;}
else if(isEn&&isV){bg=“linear-gradient(135deg,rgba(192,50,50,.25),rgba(100,20,20,.15))”;brd=“1px solid rgba(200,50,50,.35)”;anim=“mapPulse 2s ease infinite”;}
else if(isCore&&isV){bg=“radial-gradient(circle,rgba(144,96,184,.3),rgba(80,40,120,.15))”;brd=“1px solid rgba(144,96,184,.5)”;shadow=“0 0 8px rgba(144,96,184,.3)”;anim=“mapGlow 2.5s ease infinite”;}
else if(isN){bg=`linear-gradient(135deg,${col}20,${col}08)`;brd=`1px solid ${col}44`;}
if(isSel&&!isCur){bg=`radial-gradient(circle,${col}55,${col}25)`;brd=`2px solid ${col}`;shadow=`0 0 8px ${col}44`;}
const op=isV?1:.25;
// Icon for each planet type
const icon=isCur?“📍”:hasFrag&&isV?“◈”:isCore&&isV?“★”:isEn&&isV?“⚔”:isOwn?”·”:””;
const iconColor=isCur?”#fff”:hasFrag?”#d4a830”:isCore?”#c090f0”:isEn?”#ff6655”:col;
return <div key={pk}
onClick={()=>{if(isN){onMove(p.who,p.where,p.when);setSel(null);}else if(isV)setSel(pk);else setSel(null);}}
style={{width:sz,height:sz,borderRadius:isCur?sz/2:6,background:bg,border:brd,opacity:op,
cursor:isN?“pointer”:“default”,display:“flex”,alignItems:“center”,justifyContent:“center”,
transition:“all .2s”,boxShadow:shadow,animation:anim,position:“relative”,overflow:“hidden”,
transform:isCur?“scale(1.1)”:“scale(1)”,zIndex:isCur?5:1}}>
{icon&&<span style={{fontSize:isCur?14:hasFrag||isCore?12:10,color:iconColor,
animation:hasFrag?“pulse 2s ease infinite”:isCore?“mapGlow 2s ease infinite”:“none”,
position:“relative”,zIndex:2}}>{icon}</span>}
{isCur&&<div style={{position:“absolute”,inset:0,borderRadius:“50%”,animation:“ripple 2s ease infinite”}}/>}
{!isV&&<span style={{fontSize:8,color:”#1a1208”,fontFamily:“monospace”,opacity:.5}}>?</span>}
</div>;
})}
</div>
</div>
{/* Legend */}
<div style={{display:“flex”,gap:8,justifyContent:“center”,fontSize:13,color:”#7a6a55”,flexWrap:“wrap”,alignItems:“center”}}>
{Object.entries(WCO).map(([k,cc])=><span key={k} style={{display:“flex”,alignItems:“center”,gap:2}}><span style={{width:8,height:8,borderRadius:3,background:cc,display:“inline-block”}}/><span>{WLA[k]}</span></span>)}
</div>
<div style={{display:“flex”,gap:8,justifyContent:“center”,fontSize:12,color:”#7a6a55”}}>
<span>📍 ти</span><span style={{color:”#d4a830”}}>◈ уламок</span><span style={{color:”#9060b8”}}>★ ядро</span><span style={{color:”#c04040”}}>⚔ ворог</span><span>· твоя</span>
</div>
{/* Selection info */}
{sel&&vis.has(sel)&&<div className=“panel fade” style={{padding:12,display:“flex”,alignItems:“center”,gap:10,borderColor:WCO[sel.split(”-”)[0]]+“33”}}>
<div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${WCO[sel.split("-")[0]]}33,${WCO[sel.split("-")[0]]}11)`,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:18,flexShrink:0}}>
{FRAGS.has(sel)&&!frags.has(sel)?“◈”:sel===CORE?“★”:ep.has(sel)&&!ctrl.has(sel)?“⚔”:WNSYM[sel.split(”-”)[2]]}
</div>
<div style={{flex:1,minWidth:0}}>
<div style={{fontSize:16,fontWeight:600,color:WCO[sel.split(”-”)[0]],overflow:“hidden”,textOverflow:“ellipsis”,whiteSpace:“nowrap”}}>{PN[sel]||”?”}</div>
<div style={{fontSize:12,color:”#7a6a55”,fontFamily:“monospace”}}>[{gbin(…sel.split(”-”))}] · {sel.split(”-”).map(x=>CODE_LABEL[x]||x).join(” · “)}</div>
{ep.has(sel)&&!ctrl.has(sel)&&<div style={{fontSize:12,color:”#c04040”,marginTop:2}}>⚔ Ворожа · Складність {pdiff(sel)}</div>}
{FRAGS.has(sel)&&!frags.has(sel)&&<div style={{fontSize:12,color:”#d4a830”,marginTop:2}}>◈ Тут ховається уламок Ядра!</div>}
</div>
{nKeys.has(sel)&&<button onClick={()=>{const[w,r,n]=sel.split(”-”);onMove(w,r,n);setSel(null);}} className=“btn btn-gold” style={{width:“auto”,minHeight:40,padding:“8px 16px”,fontSize:15}}>Іти→</button>}
</div>}

  </div>;
}

/* STARS */
function Stars(){const s=useRef(Array.from({length:20},()=>({x:Math.random()*100,y:Math.random()*100,sz:.5+Math.random()*2,d:2+Math.random()*4,dl:Math.random()*3})));return <div style={{position:“fixed”,inset:0,pointerEvents:“none”,zIndex:0}}>{s.current.map((p,i)=><div key={i} style={{position:“absolute”,left:p.x+”%”,top:p.y+”%”,width:p.sz,height:p.sz,borderRadius:“50%”,background:“rgba(212,168,48,.5)”,animation:`twinkle ${p.d}s ${p.dl}s ease infinite`}}/>)}</div>;}

/* RESOURCE BAR */
function ResBar({res,army,frags,hp,maxHp,turn}){return <div style={{display:“flex”,gap:8,padding:“10px 16px”,background:“rgba(6,4,12,.95)”,borderBottom:“1px solid rgba(184,150,90,.15)”,flexWrap:“wrap”,alignItems:“center”,position:“sticky”,top:0,zIndex:50}}>
<span style={{fontSize:14,color:”#c04040”,fontWeight:600}}>❤{hp}</span>
{[[“💰”,res.gold],[“🔮”,res.mana],[“⚔”,res.iron],[“🌿”,res.influence],[“🗡”,army]].map(([ic,v],i)=><span key={i} style={{fontSize:14}}>{ic}{v}</span>)}

  <div style={{flex:1}}/>
  <span style={{fontSize:18,color:"#d4a830"}}>{Array(frags).fill("◈").join("")}{Array(Math.max(0,4-frags)).fill("◇").join("")}</span>
  <span style={{fontSize:12,color:"#7a6a55"}}>Крок {turn}</span>
</div>;}

/* MAIN */
export default function App(){
const [scr,setScr]=useState(“intro”),[hero,setHero]=useState(null),[pos,setPos]=useState(null);
const [vis,setVis]=useState(new Set()),[ctrl,setCtrl]=useState(new Set()),[frags,setFrags]=useState(new Set());
const [res,setRes]=useState({gold:60,mana:8,iron:6,influence:4}),[army,setArmy]=useState(20),[glog,setGlog]=useState([]);
const [evt,setEvt]=useState(null),[puz,setPuz]=useState(null),[pend,setPend]=useState(null),[cbP,setCbP]=useState(null);
const [turn,setTurn]=useState(1),[audioOn,setAudioOn]=useState(true),[puzzRes,setPuzzRes]=useState(null);
const [ep,setEp]=useState(new Set()),[lvlUp,setLvlUp]=useState(false);
const [showMap,setShowMap]=useState(false);
const [storyDlg,setStoryDlg]=useState(null);
const [seenActs,setSeenActs]=useState(new Set());
const [fragDlg,setFragDlg]=useState(null);
const [tutStep,setTutStep]=useState(-1);
useEffect(()=>{const e=new Set();ALLP.forEach(p=>{if(pdiff(p.key)>2&&pdiff(p.key)<=5&&Math.random()<.35)e.add(p.key);});setEp(e);},[]);
useEffect(()=>{
if(!hero||scr!==“map”)return;
for(const a of STORY_ACTS){if(!seenActs.has(a.id)&&a.tr({ctrl:ctrl.size,frags:frags.size})){setSeenActs(s=>new Set([…s,a.id]));setTimeout(()=>{setStoryDlg(a);sfx(“story”);},600);break;}}
},[ctrl.size,frags.size,scr]);
useEffect(()=>{if(scr!==“map”||!hero||!ctrl.size)return;const inc={gold:0,mana:0,iron:0,influence:0},m=hero.id===“engineer”?1.5:1;ctrl.forEach(k=>{const p=ALLP.find(x=>x.key===k);if(p){const y=pyield(p.who);Object.keys(y).forEach(ki=>{inc[ki]+=Math.round(y[ki]*m);});}});if(Object.values(inc).some(v=>v>0))setRes(r=>({gold:Math.min(r.gold+inc.gold,999),mana:Math.min(r.mana+inc.mana,200),iron:Math.min(r.iron+inc.iron,200),influence:Math.min(r.influence+inc.influence,200)}));},[turn]);
const snd=fn=>{if(audioOn)try{fn();}catch(e){}};
const addLog=(msg,t=“normal”)=>setGlog(p=>[{msg,t,id:Date.now()+Math.random()},…p].slice(0,30));
const nbrs=pos?ALLP.filter(p=>p.key!==gk(pos.who,pos.where,pos.when)&&isAdj(pos,p)).map(p=>({…p,type:adjT(pos,p)})):[];
const curKey=pos?gk(pos.who,pos.where,pos.when):null;

function finalize(planet,nh,na,nf,combatHP=null){const key=planet.key;setVis(v=>new Set([…v,key]));setPos(planet);let newF=new Set(nf);if(FRAGS.has(key)&&!newF.has(key)){newF.add(key);setFrags(newF);snd(()=>sfx(“fragment”));addLog(`◈ УЛАМОК — ${PN[key]}!`,“frag”);if(FRAG_LORE[key])setTimeout(()=>setFragDlg(FRAG_LORE[key]),800);}else setFrags(newF);if(combatHP!=null){const newH={…nh,hp:Math.max(1,combatHP),xp:(nh.xp||0)+pdiff(key)*20};if(Math.floor(newH.xp/100)>Math.floor((nh.xp||0)/100)){newH.atk++;newH.def=(newH.def||nh.def)+1;setLvlUp(true);setTimeout(()=>setLvlUp(false),3000);}setHero(newH);setCtrl(c=>new Set([…c,key]));setEp(e=>{const n=new Set(e);n.delete(key);return n;});const yr=pyield(planet.who);setRes(r=>({gold:r.gold+yr.gold*5,mana:r.mana+yr.mana*3,iron:r.iron+yr.iron*3,influence:r.influence+yr.influence*3}));addLog(`🏴 ${PN[key]} завойована!`,“victory”);}else{setCtrl(c=>new Set([…c,key]));addLog(`→ ${PN[key]}`,“move”);}if(na!=null)setArmy(na);setPend(null);setEvt(null);setPuz(null);setCbP(null);setPuzzRes(null);if(key===CORE&&newF.size>=4){setTimeout(()=>setScr(“endgame”),800);return;}setScr(“map”);snd(()=>playP(planet.who,planet.where,planet.when));}
function moveTo(w,r,n){const key=gk(w,r,n),planet={who:w,where:r,when:n,key};snd(()=>sfx(“move”));setPend(planet);setTurn(t=>t+1);
if(tutStep===0)setTutStep(1);else if(tutStep===1&&turn>=3)setTutStep(2);if(ep.has(key)&&!ctrl.has(key)){setCbP(planet);setScr(“combat”);return;}const seed=Math.floor(Math.random()*100),e=getEvt(w,n,seed);if(e){setEvt({…e,targetKey:key,autoFrag:FRAGS.has(key)&&!frags.has(key)&&!vis.has(key)});setScr(“event”);}else finalize(planet,hero,army,frags);}
function resolveEvt(ch){const ef=ch.ef||{};setRes(r=>{const n={…r};if(ef.gold)n.gold=clamp(n.gold+ef.gold,0,999);if(ef.mana)n.mana=clamp(n.mana+ef.mana,0,200);if(ef.iron)n.iron=clamp(n.iron+ef.iron,0,200);if(ef.influence)n.influence=clamp(n.influence+ef.influence,0,200);return n;});let nh={…hero};if(ef.hp)nh.hp=clamp(nh.hp+ef.hp,1,hero.maxHp);if(ef.xp)nh.xp=(nh.xp||0)+ef.xp;setHero(nh);let na=army;if(ef.army)na=clamp(army+ef.army,0,200);let nf=new Set(frags);if(ch.frag&&pend&&FRAGS.has(pend.key)&&!nf.has(pend.key)){nf.add(pend.key);snd(()=>sfx(“fragment”));addLog(“◈ Уламок!”,“frag”);}addLog(ch.lg||“Вибір зроблено.”,“evt”);if(ch.combat){setCbP(pend);setScr(“combat”);return;}if(pend){setPuz(makePuzz(pend.who,pend.where,pend.when));setPuzzRes(null);setFrags(nf);setArmy(na);setScr(“puzzle”);}}
function resolvePuz(won){setPuzzRes(won?“ok”:“fail”);snd(()=>sfx(won?“ok”:“fail”));let nh={…hero};if(won){nh.hp=Math.min(nh.hp+5,hero.maxHp);nh.xp=(nh.xp||0)+50;addLog(“✓ Відкрито!”,“frag”);}else{nh.hp=Math.max(1,nh.hp-5);addLog(“✗ −5 HP”,“evt”);}setHero(nh);setTimeout(()=>{if(nh.hp<=1&&!won){setScr(“gameover”);return;}if(pend)finalize(pend,nh,army,frags);},900);}
function combatResult(result,heroHP){if(result===“win”){setPuz(makePuzz(cbP.who,cbP.where,cbP.when));setPuzzRes(null);setPend(cbP);setScr(“puzzle”);}else if(result===“negotiate”){if(res.influence>=30){setRes(r=>({…r,influence:r.influence-30}));finalize(cbP,hero,army,frags,hero.hp);}else addLog(“Потрібно 30 Впливу.”,“evt”);}else{addLog(“Відступ. −5 армії.”,“evt”);setArmy(a=>Math.max(0,a-5));setPend(null);setCbP(null);setScr(“map”);}}
function startGame(h){sfx(“select”);const sp=ALLP.find(p=>p.key===h.start)||ALLP[0];setHero({…h,hp:h.maxHp,xp:0});setPos(sp);setVis(new Set([sp.key]));setCtrl(new Set([sp.key]));setRes({gold:h.gold,mana:8,iron:6,influence:4});setArmy(h.army);setTurn(1);setGlog([]);setFrags(new Set());setScr(“map”);setTutStep(0);addLog(`${h.name} прокидається на ${PN[sp.key]}.`,“evt”);snd(()=>playP(sp.who,sp.where,sp.when));}

const saveGame=async()=>{
if(!hero||!pos)return;
try{
const state={hero,pos:{who:pos.who,where:pos.where,when:pos.when,key:pos.key},
vis:[…vis],ctrl:[…ctrl],frags:[…frags],res,army,turn,glog:glog.slice(0,10),
ep:[…ep],scr,audioOn,tutStep,seenActs:[…seenActs]};
await window.storage.set(“hexeract-save”,JSON.stringify(state));
addLog(“💾 Гру збережено!”,“frag”);
}catch(e){addLog(“⚠ Не вдалось зберегти”,“evt”);}
};
const loadGame=async()=>{
try{
const r=await window.storage.get(“hexeract-save”);
if(!r||!r.value)return false;
const s=JSON.parse(r.value);
setHero(s.hero);setPos(s.pos);setVis(new Set(s.vis));setCtrl(new Set(s.ctrl));
setFrags(new Set(s.frags));setRes(s.res);setArmy(s.army);setTurn(s.turn);
setGlog(s.glog||[]);setEp(new Set(s.ep||[]));setAudioOn(s.audioOn!==false);
setTutStep(s.tutStep!=null?s.tutStep:-1);setSeenActs(new Set(s.seenActs||[]));setScr(“map”);
return true;
}catch(e){return false;}
};
const [hasSave,setHasSave]=useState(false);
useEffect(()=>{(async()=>{try{const r=await window.storage.get(“hexeract-save”);setHasSave(!!r&&!!r.value);}catch(e){}})();},[]);

const restart=()=>{setHasSave(false);setScr(“hero_select”);setHero(null);setPos(null);setVis(new Set());setCtrl(new Set());setFrags(new Set());setGlog([]);setTutStep(-1);setStoryDlg(null);setSeenActs(new Set());setFragDlg(null);};
const Page=({children})=><div style={{minHeight:“100vh”,background:”#0a0714”,fontFamily:”‘Inter’,system-ui,sans-serif”,fontSize:16,color:”#d0c8b0”,display:“flex”,flexDirection:“column”}}>{children}</div>;

if(scr===“intro”)return <Page><Stars/><div style={{flex:1,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:24,position:“relative”,zIndex:1,textAlign:“center”,gap:20}}>
<div className="label" style={{fontSize:13}}>ANNO HEXERACTUS</div>
<h1 className=“title” style={{fontSize:“clamp(32px,9vw,52px)”}}>Сузір’я Гексеракт</h1>
<p style={{color:”#7a6a55”,fontSize:17,maxWidth:340,lineHeight:1.6}}>64 світи. 4 уламки Ядра. Один шлях до істини.</p>
<div style={{display:“flex”,flexDirection:“column”,gap:12,width:“100%”,maxWidth:320,marginTop:12}}>
{hasSave&&<button onClick={async()=>{sfx(“select”);const ok=await loadGame();if(!ok)setScr(“hero_select”);}} className=“btn btn-gold” style={{justifyContent:“center”,fontSize:20,fontFamily:”‘Cormorant Garamond’,Georgia,serif”,fontWeight:700,padding:“18px 24px”}}>Продовжити</button>}
<button onClick={()=>{sfx(“select”);setScr(“hero_select”);}} className=“btn btn-gold” style={{justifyContent:“center”,fontSize:20,fontFamily:”‘Cormorant Garamond’,Georgia,serif”,fontWeight:700,padding:“18px 24px”}}>Грати</button>
<button onClick={()=>setAudioOn(a=>!a)} className=“btn” style={{justifyContent:“center”,fontSize:15}}>{audioOn?“🔊 Звук”:“🔇 Тиша”}</button>
</div>

  </div></Page>;

if(scr===“hero_select”)return <Page><div style={{padding:“20px 16px”,textAlign:“center”}}><h2 className="title" style={{fontSize:26}}>Обери героя</h2></div>
<div style={{flex:1,overflowY:“auto”,padding:“0 16px 24px”,display:“flex”,flexDirection:“column”,gap:12}}>
{HEROES.map((h,i)=>{const fc=WCO[h.faction];return <button key={h.id} onClick={()=>startGame(h)} className=“btn fade” style={{flexDirection:“column”,alignItems:“stretch”,gap:10,padding:16,borderColor:fc+“44”,animationDelay:i*.06+“s”}}>
<div style={{display:“flex”,alignItems:“center”,gap:14}}><span style={{fontSize:36}}>{h.icon}</span><div><div className="title" style={{fontSize:20,color:fc}}>{h.name}</div><div style={{fontSize:14,color:”#7a6a55”}}>{h.title} · {h.lore}</div></div></div>
<div style={{display:“flex”,gap:10,fontSize:15}}>{[[“⚔”,h.atk],[“🛡”,h.def],[“✨”,h.mag],[“👑”,h.ldr]].map(([ic,v])=><span key={ic} style={{color:fc}}>{ic}{v}</span>)}<span style={{color:”#7a6a55”}}>HP{h.maxHp} 💰{h.gold} 🗡{h.army}</span></div>
<div style={{fontSize:14,color:fc,padding:“8px 12px”,background:fc+“0d”,borderRadius:8}}>✦ {h.ability}</div>
</button>;})}
<button onClick={()=>setScr(“intro”)} className=“btn” style={{justifyContent:“center”,color:”#7a6a55”,fontSize:15}}>← Назад</button>
</div></Page>;

if(scr===“gameover”)return <Page><div style={{flex:1,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:24,textAlign:“center”,gap:20}}>
<div style={{fontSize:56}}>⚰️</div><h2 className=“title” style={{fontSize:28,color:”#c04040”}}>Герой загинув</h2>
<p style={{fontSize:16,color:”#7a6a55”,maxWidth:300}}>{hero?.name} загинув. Планет: {ctrl.size}. Уламки: {frags.size}/4.</p>
<button onClick={restart} className=“btn btn-red” style={{justifyContent:“center”,maxWidth:300,fontSize:18}}>Нова легенда</button>

  </div></Page>;

if(scr===“endgame”)return <Page><Stars/><div style={{flex:1,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:24,textAlign:“center”,gap:20,position:“relative”,zIndex:1}}>
<div style={{fontSize:56,animation:“float 3s ease infinite”}}>◈</div>
<h2 className=“title” style={{fontSize:“clamp(24px,7vw,40px)”,color:”#d4a830”}}>Гексеракт Відновлено</h2>
<p style={{fontSize:16,maxWidth:360,lineHeight:1.7}}>Тиша впала мов завіса. Шістдесят чотири світи зітхнули одночасно й з’єднались. Архонт Безодні скрикнув — і розчинився в новонародженій гармонії.</p>
<p style={{fontSize:16,color:”#d4a830”,fontStyle:“italic”,maxWidth:340}}>«Ядро — не місце і не річ. Ядро — той, хто здатен утримати всі шістдесят чотири відповіді. Відтепер це — ти.»</p>
<button onClick={restart} className=“btn btn-gold” style={{justifyContent:“center”,maxWidth:300,fontSize:18}}>Нова легенда</button>

  </div></Page>;

if(!hero||!pos)return null;
const col=WCO[pos.who];

if(scr===“map”)return <Page>
<ResBar res={res} army={army} frags={frags.size} hp={hero.hp} maxHp={hero.maxHp} turn={turn}/>
{storyDlg&&<div className=“fade” style={{position:“fixed”,inset:0,zIndex:100,display:“flex”,alignItems:“center”,justifyContent:“center”,padding:16,background:“rgba(0,0,0,.85)”}}>
<div style={{maxWidth:420,width:“100%”,background:“rgba(10,7,18,.98)”,border:“1px solid rgba(212,168,48,.25)”,borderRadius:12,overflow:“hidden”}}>
<div style={{padding:“14px 18px”,background:“rgba(212,168,48,.06)”,borderBottom:“1px solid rgba(184,150,90,.12)”}}><div className=“label” style={{color:”#d4a830”}}>{storyDlg.n}</div><div className="title" style={{fontSize:22,marginTop:4}}>{storyDlg.t}</div></div>
<div style={{padding:18,fontSize:16,lineHeight:1.8,color:”#c0b090”,maxHeight:“50vh”,overflowY:“auto”}}>{storyDlg.txt}{storyDlg.voice&&<div style={{marginTop:12,padding:“10px 14px”,background:“rgba(212,168,48,.04)”,borderLeft:“3px solid rgba(212,168,48,.2)”,fontStyle:“italic”,color:”#a89060”,fontSize:15}}>{storyDlg.voice}</div>}</div>
<div style={{padding:“12px 18px”}}><button onClick={()=>setStoryDlg(null)} className=“btn btn-gold” style={{justifyContent:“center”,fontSize:16}}>Далі</button></div>
</div></div>}
{fragDlg&&<div className=“fade” style={{position:“fixed”,inset:0,zIndex:100,display:“flex”,alignItems:“center”,justifyContent:“center”,padding:16,background:“rgba(0,0,0,.85)”}}>
<div style={{maxWidth:380,width:“100%”,background:“rgba(10,7,18,.98)”,border:“1px solid #d4a830”,borderRadius:12,overflow:“hidden”}}>
<div style={{padding:16,textAlign:“center”,background:“rgba(212,168,48,.08)”}}><div style={{fontSize:36,animation:“float 3s ease infinite”}}>◈</div><div className=“title” style={{fontSize:20,color:”#d4a830”,marginTop:6}}>{fragDlg.t}</div></div>
<div style={{padding:18,fontSize:16,lineHeight:1.8,color:”#c0b090”}}>{fragDlg.txt}<div style={{marginTop:10,textAlign:“center”,fontStyle:“italic”,color:”#a89060”,fontSize:15}}>{fragDlg.q}</div></div>
<div style={{padding:“12px 18px”}}><button onClick={()=>setFragDlg(null)} className=“btn btn-gold” style={{justifyContent:“center”,fontSize:16}}>Зберегти уламок ◈</button></div>
</div></div>}
{tutStep>=0&&tutStep<3&&TUTORIAL[tutStep]&&<div className=“fade” style={{margin:“0 16px”,marginTop:12,padding:16,background:“rgba(90,171,110,.06)”,border:“1px solid rgba(90,171,110,.25)”,borderRadius:12}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:6}}><span className=“title” style={{fontSize:17,color:”#5aab6e”}}>{TUTORIAL[tutStep].title}</span><button onClick={()=>setTutStep(s=>s>=2?-1:s)} className=“btn” style={{width:“auto”,minHeight:32,padding:“4px 12px”,fontSize:13,color:”#7a6a55”,background:“transparent”,border:“1px solid rgba(184,150,90,.15)”}}>✕</button></div>
<div style={{fontSize:15,lineHeight:1.65,color:”#b0c8b0”,marginBottom:8}}>{TUTORIAL[tutStep].text}</div>
<div style={{fontSize:14,color:”#8aba8a”,padding:“8px 12px”,background:“rgba(90,171,110,.05)”,borderRadius:8,borderLeft:“3px solid rgba(90,171,110,.3)”}}>💡 {TUTORIAL[tutStep].tip}</div>
</div>}
<div style={{flex:1,overflowY:“auto”,WebkitOverflowScrolling:“touch”,padding:“12px 16px 24px”,display:“flex”,flexDirection:“column”,gap:12}}>
<div className=“panel fade” style={{borderLeft:`4px solid ${col}`}}>
<div className="label" style={{color:col}}>📍 Зараз</div>
<div className=“title” style={{fontSize:22,margin:“4px 0”}}>{PN[curKey]}</div>
<div style={{fontSize:15,color:”#7a6a55”,lineHeight:1.6}}>{PL[`${pos.who}-${pos.where}`]}</div>
<div style={{display:“flex”,gap:8,marginTop:8,fontSize:14,color:”#7a6a55”,flexWrap:“wrap”}}><span style={{color:col}}>{WLA[pos.who]}</span><span>{WHLA[pos.where]}</span><span>{WNSYM[pos.when]} {WNLA[pos.when]}</span><span style={{fontFamily:“monospace”,color:”#7a6a55”}}>[{gbin(pos.who,pos.where,pos.when)}]</span></div>
{curKey===CORE&&frags.size<4&&<div style={{marginTop:10,padding:“10px 14px”,background:“rgba(144,96,184,.08)”,borderRadius:8,fontSize:15,color:”#9060b8”}}>★ Ще {4-frags.size} уламки до Ядра</div>}
{lvlUp&&<div style={{marginTop:10,padding:“10px 14px”,background:“rgba(212,168,48,.08)”,borderRadius:8,fontSize:15,color:”#d4a830”,animation:“glow 2s infinite”}}>⭐ Рівень UP! +Атака +Захист</div>}
</div>
<div style={{fontSize:15,color:”#d4a830”,textAlign:“center”,fontStyle:“italic”}}>{frags.size<1?“🔍 Досліджуй світи, шукай уламки”:frags.size<4?`◈ ${frags.size}/4 уламки зібрано`:“★ Іди до Темної Пустелі!”}</div>
<button onClick={()=>setShowMap(m=>!m)} className=“btn” style={{justifyContent:“center”,fontSize:15,minHeight:44,padding:“10px 14px”}}>{showMap?“▼ Сховати карту”:“🗺 Показати карту 8×8”}</button>
{showMap&&<div className="panel fade"><GridMap pos={pos} vis={vis} ctrl={ctrl} frags={frags} nbrs={nbrs} onMove={(w,r,n)=>{setShowMap(false);moveTo(w,r,n);}} ep={ep}/></div>}
<div className="label">Куди рухатися</div>
{nbrs.map((n,i)=>{const nk=gk(n.who,n.where,n.when),nc=WCO[n.who],isEn=ep.has(nk)&&!ctrl.has(nk),hf=FRAGS.has(nk)&&!frags.has(nk),isCore=nk===CORE;
return <button key={i} onClick={()=>moveTo(n.who,n.where,n.when)} className={`btn fade ${isEn?"btn-red":hf?"btn-gold":""}`} style={{animationDelay:i*.04+“s”,borderColor:isEn?“rgba(192,64,64,.25)”:isCore?“rgba(144,96,184,.35)”:hf?“rgba(212,168,48,.25)”:nc+“1a”}}>
<span style={{fontSize:22}}>{isEn?“⚔”:hf?“◈”:isCore?“★”:WNSYM[n.when]}</span>
<div style={{flex:1,minWidth:0}}><div style={{fontSize:16,fontWeight:500,color:isEn?”#c04040”:isCore?”#9060b8”:”#d0c8b0”,overflow:“hidden”,textOverflow:“ellipsis”,whiteSpace:“nowrap”}}>{PN[nk]}</div><div style={{fontSize:13,color:”#7a6a55”}}>{n.type} · {WLA[n.who]}{isEn?` · Скл.${pdiff(nk)}`:””}</div></div>
<span style={{fontSize:16,color:”#7a6a55”}}>→</span>
</button>;})}
{glog.length>0&&<div className=“panel” style={{maxHeight:120,overflowY:“auto”}}><div className="label" style={{marginBottom:6}}>Літопис</div>{glog.slice(0,6).map(l=><div key={l.id} style={{fontSize:14,marginBottom:4,color:l.t===“frag”?”#d4a830”:l.t===“victory”?”#5aab6e”:”#7a6a55”}}>{l.msg}</div>)}</div>}
<button onClick={saveGame} className=“btn btn-green” style={{justifyContent:“center”,fontSize:15,minHeight:44,padding:“10px 14px”}}>💾 Зберегти</button>
<div style={{display:“flex”,gap:8}}><button onClick={()=>snd(()=>playP(pos.who,pos.where,pos.when))} className=“btn” style={{flex:1,justifyContent:“center”,fontSize:14,minHeight:44,padding:“10px 12px”}}>▶ Мелодія</button><button onClick={()=>setAudioOn(a=>!a)} className=“btn” style={{justifyContent:“center”,width:48,minHeight:44,padding:10}}>{audioOn?“🔊”:“🔇”}</button><button onClick={restart} className=“btn” style={{justifyContent:“center”,width:48,minHeight:44,padding:10,color:”#7a6a55”}}>↺</button></div>
</div></Page>;

if(scr===“event”&&evt){const tKey=pend?gk(pend.who,pend.where,pend.when):curKey,eCol=WCO[pend?.who||pos.who];
return <Page><ResBar res={res} army={army} frags={frags.size} hp={hero.hp} maxHp={hero.maxHp} turn={turn}/>
<div style={{flex:1,overflowY:“auto”,padding:“12px 16px 24px”,display:“flex”,flexDirection:“column”,gap:12}}>
<div className=“panel fade” style={{borderLeft:`4px solid ${eCol}`}}><div className="label" style={{color:eCol}}>Подія</div><div className=“title” style={{fontSize:22,margin:“6px 0”}}>{evt.title}</div><div style={{fontSize:14,color:”#7a6a55”}}>{PN[tKey]}</div></div>
<div className=“panel fade” style={{fontSize:16,lineHeight:1.7,animationDelay:”.1s”}}>{evt.autoFrag&&<div style={{color:”#d4a830”,marginBottom:10,fontSize:16}}>◈ Пульс уламку Ядра відлунює в долонях…</div>}{evt.text}</div>
<div className="label">Твій вибір</div>
{evt.choices.map((ch,i)=>{const efs=Object.entries(ch.ef||{}).filter(([,v])=>v!==0).map(([k,v])=>`${v>0?"+":""}${v} ${k}`);if(ch.combat)efs.push(“→ Бій”);if(ch.frag)efs.push(“◈”);
return <button key={i} onClick={()=>{snd(()=>sfx(“select”));resolveEvt(ch);}} className=“btn fade” style={{borderColor:eCol+“22”,animationDelay:i*.07+“s”}}>
<span style={{fontSize:26}}>{ch.ic}</span><div style={{flex:1}}><div style={{fontSize:16,fontWeight:500}}>{ch.l}</div>{efs.length>0&&<div style={{fontSize:13,marginTop:3}}>{efs.map((e,j)=><span key={j} style={{color:e.startsWith(”+”)||e.includes(“◈”)?”#5aab6e”:”#c04040”,marginRight:8}}>{e}</span>)}</div>}</div>
</button>;})}
</div></Page>;}

if(scr===“combat”&&cbP){const planet=cbP,pCol=WCO[planet.who];return <CombatPage hero={hero} army={army} planet={planet} audioOn={audioOn} onResult={combatResult} col={pCol} res={res} frags={frags} turn={turn}/>;}

if(scr===“puzzle”&&puz){const pCol=WCO[pend?.who||pos.who];return <Page><ResBar res={res} army={army} frags={frags.size} hp={hero.hp} maxHp={hero.maxHp} turn={turn}/>
<div style={{flex:1,overflowY:“auto”,padding:“12px 16px 24px”,display:“flex”,flexDirection:“column”,gap:12}}>
<div className=“panel fade” style={{borderLeft:`4px solid ${pCol}`}}><div className="label" style={{color:pCol}}>Замок Рун</div><div className="title" style={{fontSize:18,marginTop:4}}>{PN[pend?gk(pend.who,pend.where,pend.when):curKey]}</div></div>
<PuzUI puz={puz} col={pCol} onAnswer={resolvePuz} puzzRes={puzzRes}/>
{puzzRes&&<div className=“panel fade” style={{textAlign:“center”}}><div className=“title” style={{fontSize:20,color:puzzRes===“ok”?”#5aab6e”:”#c04040”}}>{puzzRes===“ok”?“✓ Відкрито!”:“✗ Невірно”}</div><div style={{fontSize:14,color:”#7a6a55”,marginTop:4}}>{puzzRes===“ok”?”+5 HP · +50 XP”:“−5 HP”}</div></div>}
{!puzzRes&&<button onClick={()=>{addLog(“Пропущено. −8 HP”,“evt”);const nh={…hero,hp:Math.max(1,hero.hp-8)};setHero(nh);if(nh.hp<=1){setScr(“gameover”);return;}if(pend)finalize(pend,nh,army,frags);}} className=“btn” style={{justifyContent:“center”,color:”#7a6a55”,fontSize:15}}>Пропустити (−8 HP)</button>}
</div></Page>;}
return null;
}

/* PUZZLE */
function PuzUI({puz,col,onAnswer,puzzRes}){
const [checked,setChecked]=useState(false);

// === TYPE: XOR ===
if(puz.type===“xor”){
const [ub,setUb]=useState([…puz.shown]);
const toggle=i=>{if(checked||puz.shown[i]!==null)return;sfx(“select”);setUb(p=>{const n=[…p];n[i]=n[i]===null?0:n[i]===0?1:null;return n;});};
const [results,setResults]=useState([]);
const check=()=>{const u=ub.map(b=>b===null?0:b);const res=puz.clues.map(c=>c.check(u));setResults(res);setChecked(true);setTimeout(()=>onAnswer(res.every(Boolean)),700);};
const filled=ub.every(b=>b!==null);
const pairLabels=[“WHO”,“WHO”,“WHERE”,“WHERE”,“WHEN”,“WHEN”];
const pairColors=[BIGRAM_COL[WHC[puz.who]],BIGRAM_COL[WHC[puz.who]],BIGRAM_COL[WRC[puz.where]],BIGRAM_COL[WRC[puz.where]],BIGRAM_COL[WNC[puz.when]],BIGRAM_COL[WNC[puz.when]]];
return <div style={{display:“flex”,flexDirection:“column”,gap:14}}>
<div style={{textAlign:“center”,fontSize:15,color:”#7a6a55”}}>🔐 Замок XOR — тисни на «?» щоб перемикати 0↔1</div>
<div style={{display:“flex”,justifyContent:“center”,gap:6,padding:“8px 0”}}>{ub.map((b,i)=>{const isH=puz.hideIdx.includes(i),sep=i===2||i===4;return <div key={i} style={{display:“flex”,alignItems:“center”}}>{sep&&<div style={{width:2,height:36,background:“rgba(184,150,90,.1)”,margin:“0 6px”,borderRadius:1}}/>}<div style={{textAlign:“center”}}><div style={{fontSize:11,color:pairColors[i],marginBottom:3,fontWeight:600}}>{pairLabels[i]}</div><div onClick={()=>toggle(i)} style={{width:52,height:52,display:“flex”,alignItems:“center”,justifyContent:“center”,borderRadius:10,fontSize:24,fontWeight:700,fontFamily:“monospace”,cursor:isH&&!checked?“pointer”:“default”,background:isH?(b===null?“rgba(184,150,90,.06)”:b===1?pairColors[i]+“25”:“rgba(0,0,0,.35)”):(puz.bits[i]===1?pairColors[i]+“18”:“rgba(0,0,0,.25)”),border:isH?(b===null?`2px dashed ${pairColors[i]}44`:`2px solid ${pairColors[i]}`):“1px solid rgba(255,255,255,.05)”,color:isH?(b===null?pairColors[i]:b===1?”#f0e0c0”:”#5a4a38”):(puz.bits[i]===1?”#c0b090”:”#3a2a18”)}}>{isH?(b===null?”?”:b):puz.bits[i]}</div></div></div>;})}</div>
<div style={{textAlign:“center”,fontSize:13,color:”#7a6a55”,fontFamily:“monospace”}}>[{ub.map(b=>b===null?”?”:b).join(””)}]</div>
<div style={{background:“rgba(0,0,0,.2)”,borderRadius:10,padding:14,display:“flex”,flexDirection:“column”,gap:8}}>
<div style={{fontSize:13,color:”#d4a830”,fontWeight:600}}>💡 XOR: однакові біти → 0, різні → 1</div>
{puz.clues.map((cl,i)=><div key={i} style={{fontSize:15,padding:“10px 12px”,borderRadius:8,display:“flex”,justifyContent:“space-between”,alignItems:“center”,background:checked?(results[i]?“rgba(90,171,110,.1)”:“rgba(192,64,64,.08)”):“rgba(0,0,0,.15)”,border:`1px solid ${checked?(results[i]?"#5aab6e33":"#c0404033"):"rgba(255,255,255,.04)"}`,color:checked?(results[i]?”#5aab6e”:”#c04040”):”#d0c8b0”}}><span>{cl.rule}</span>{checked&&<span style={{fontWeight:700,fontSize:18}}>{results[i]?“✓”:“✗”}</span>}</div>)}
</div>
{!checked&&<button onClick={check} disabled={!filled} className={`btn ${filled?"btn-gold":""}`} style={{justifyContent:“center”,fontSize:17,opacity:filled?1:.4}}>{filled?“Звірити код →”:“Встанови всі біти”}</button>}
</div>;
}

// === TYPE: MATCH — з’єднай виміри з кодами ===
if(puz.type===“match”){
const [picks,setPicks]=useState({});
const codes=[“10”,“11”,“01”,“00”];
const select=(dim,code)=>{if(checked)return;sfx(“select”);setPicks(p=>({…p,[dim]:code}));};
const check=()=>{const ok=puz.pairs.every(p=>picks[p.dim]===p.code);setChecked(true);setTimeout(()=>onAnswer(ok),700);};
const filled=puz.pairs.every(p=>picks[p.dim]);
return <div style={{display:“flex”,flexDirection:“column”,gap:14}}>
<div style={{textAlign:“center”,fontSize:15,color:”#7a6a55”}}>🧩 З’єднай кожен вимір із його кодом</div>
{puz.shuffled.map((p,i)=><div key={i} style={{display:“flex”,alignItems:“center”,gap:10,padding:10,background:“rgba(0,0,0,.15)”,borderRadius:10}}>
<div style={{flex:1,fontSize:16,fontWeight:600,color:BIGRAM_COL[p.code]}}>{p.dim}: {p.dim===“WHO”?WLA[p.val]:p.dim===“WHERE”?WHLA[p.val]:WNLA[p.val]}</div>
<div style={{display:“flex”,gap:6}}>{codes.map(cd=><button key={cd} onClick={()=>select(p.dim,cd)} className=“btn” style={{width:48,minHeight:40,padding:“6px”,justifyContent:“center”,fontSize:15,fontFamily:“monospace”,fontWeight:700,background:picks[p.dim]===cd?BIGRAM_COL[cd]+“25”:“rgba(0,0,0,.2)”,border:picks[p.dim]===cd?`2px solid ${BIGRAM_COL[cd]}`:“1px solid rgba(255,255,255,.05)”,color:BIGRAM_COL[cd]}}>{cd}</button>)}</div>
</div>)}
<div style={{fontSize:13,color:”#d4a830”,padding:10,background:“rgba(0,0,0,.15)”,borderRadius:8}}>💡 ME=10, WE=11, YOU=01, THEY=00 · Схід=10, Південь=11, Захід=01, Північ=00 · Весна=10, Літо=11, Осінь=01, Зима=00</div>
{!checked&&<button onClick={check} disabled={!filled} className={`btn ${filled?"btn-gold":""}`} style={{justifyContent:“center”,fontSize:17,opacity:filled?1:.4}}>{filled?“Звірити →”:“Обери коди”}</button>}
</div>;
}

// === TYPE: HAMMING — знайди сусідню планету ===
if(puz.type===“hamming”){
const [pick,setPick]=useState(null);
const check=()=>{setChecked(true);setTimeout(()=>onAnswer(pick===puz.correctKey),700);};
return <div style={{display:“flex”,flexDirection:“column”,gap:14}}>
<div style={{textAlign:“center”,fontSize:15,color:”#7a6a55”}}>🔗 Яка планета — справжній сусід? (відрізняється на 1 біт)</div>
<div style={{textAlign:“center”,fontSize:14,color:”#d4a830”,fontFamily:“monospace”}}>Поточний код: [{puz.curCode}]</div>
{puz.options.map((p,i)=>{const pk=p.key,cd=gbin(p.who,p.where,p.when),d=ham(puz.curCode,cd);
return <button key={i} onClick={()=>{if(!checked){sfx(“select”);setPick(pk);}}} className={`btn ${checked?(pk===puz.correctKey?"btn-green":(pk===pick?"btn-red":"")):(pick===pk?"btn-gold":"")}`} style={{justifyContent:“space-between”}}>
<div><div style={{fontSize:16,fontWeight:500}}>{PN[pk]}</div><div style={{fontSize:13,color:”#7a6a55”,fontFamily:“monospace”}}>[{cd}] · відстань {d}</div></div>
{checked&&<span style={{fontSize:18,fontWeight:700,color:pk===puz.correctKey?”#5aab6e”:”#c04040”}}>{pk===puz.correctKey?“✓”:pk===pick?“✗”:””}</span>}
</button>;})}
<div style={{fontSize:13,color:”#d4a830”,padding:10,background:“rgba(0,0,0,.15)”,borderRadius:8}}>💡 Сусідні планети відрізняються рівно на 1 біт (відстань Геммінга = 1)</div>
{!checked&&<button onClick={check} disabled={!pick} className={`btn ${pick?"btn-gold":""}`} style={{justifyContent:“center”,fontSize:17,opacity:pick?1:.4}}>Обрати →</button>}
</div>;
}

// === TYPE: INVERT — знайди дзеркальну планету ===
if(puz.type===“invert”){
const [pick,setPick]=useState(null);
const check=()=>{setChecked(true);setTimeout(()=>onAnswer(pick===puz.correctKey),700);};
return <div style={{display:“flex”,flexDirection:“column”,gap:14}}>
<div style={{textAlign:“center”,fontSize:15,color:”#7a6a55”}}>🪞 Знайди планету-дзеркало (всі біти інвертовані)</div>
<div style={{textAlign:“center”,fontSize:14,fontFamily:“monospace”}}><span style={{color:”#d4a830”}}>[{puz.curCode}]</span> → <span style={{color:”#9060b8”}}>[{puz.inverted}]</span></div>
{puz.options.map((p,i)=>{const pk=p.key,cd=gbin(p.who,p.where,p.when);
return <button key={i} onClick={()=>{if(!checked){sfx(“select”);setPick(pk);}}} className={`btn ${checked?(pk===puz.correctKey?"btn-green":(pk===pick?"btn-red":"")):(pick===pk?"btn-gold":"")}`} style={{justifyContent:“space-between”}}>
<div><div style={{fontSize:16,fontWeight:500}}>{PN[pk]}</div><div style={{fontSize:13,color:”#7a6a55”,fontFamily:“monospace”}}>[{cd}] · {WLA[p.who]} · {WHLA[p.where]} · {WNLA[p.when]}</div></div>
{checked&&<span style={{fontSize:18,fontWeight:700,color:pk===puz.correctKey?”#5aab6e”:”#c04040”}}>{pk===puz.correctKey?“✓”:pk===pick?“✗”:””}</span>}
</button>;})}
<div style={{fontSize:13,color:”#d4a830”,padding:10,background:“rgba(0,0,0,.15)”,borderRadius:8}}>💡 Інвертування: кожен 0 стає 1, кожен 1 стає 0. ME↔THEY, WE↔YOU, EAST↔NORTH, SOUTH↔WEST, SPRING↔WINTER, SUMMER↔AUTUMN</div>
{!checked&&<button onClick={check} disabled={!pick} className={`btn ${pick?"btn-gold":""}`} style={{justifyContent:“center”,fontSize:17,opacity:pick?1:.4}}>Обрати →</button>}
</div>;
}
return null;
}

/* COMBAT */
function CombatPage({hero,army,planet,audioOn,onResult,col,res,frags,turn}){
const [herHP,setHerHP]=useState(hero.hp),[enHP,setEnHP]=useState(100),[clog,setClog]=useState([]),[done,setDone]=useState(null),[shake,setShake]=useState(null);
const hPow=hero.atk*3+Math.min(army,50)+hero.def*2,ePow=pdiff(planet.key)*9;
const attack=()=>{const b=hero.id===“warrior”&&herHP<hero.maxHp*.4,pow=b?Math.floor(hPow*1.5):hPow,eD=Math.max(2,Math.floor(pow*(.6+Math.random()*.8))),hD=Math.max(1,Math.floor(ePow*(.4+Math.random()*.6)-hero.def)),ne=Math.max(0,enHP-eD),nh=Math.max(0,herHP-hD);setEnHP(ne);setHerHP(nh);if(audioOn)sfx(“hit”);setShake(“e”);setTimeout(()=>{setShake(“h”);setTimeout(()=>setShake(null),180);},180);setClog(p=>[`⚔ −${eD} ← −${hD}${b?" 🔥":""}` ,…p].slice(0,4));if(ne<=0||nh<=0){setDone(ne<=0?“win”:“lose”);if(audioOn)setTimeout(()=>sfx(ne<=0?“victory”:“defeat”),300);}};
const spell=()=>{const d=hero.mag*12,ne=Math.max(0,enHP-d);setEnHP(ne);if(audioOn)sfx(“fragment”);setClog(p=>[`✨ −${d}`,…p].slice(0,4));if(ne<=0){setDone(“win”);if(audioOn)setTimeout(()=>sfx(“victory”),300);}};
const defend=()=>{const hD=Math.max(0,Math.floor(ePow*(.2+Math.random()*.3)-hero.def*2)),nh=Math.max(0,herHP-hD),hl=Math.min(5,hero.maxHp-nh);setHerHP(Math.min(hero.maxHp,nh+hl));if(audioOn)sfx(“ok”);setClog(p=>[`🛡 −${hD} +${hl}hp`,…p].slice(0,4));if(nh<=0){setDone(“lose”);if(audioOn)setTimeout(()=>sfx(“defeat”),300);}};
const Page=({children})=><div style={{minHeight:“100vh”,background:”#0a0714”,fontFamily:”‘Inter’,system-ui,sans-serif”,fontSize:16,color:”#d0c8b0”,display:“flex”,flexDirection:“column”}}>{children}</div>;

if(done)return <Page><ResBar res={res} army={army} frags={frags.size} hp={herHP} maxHp={hero.maxHp} turn={turn}/><div style={{flex:1,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,padding:24,textAlign:“center”,gap:20}}>
<div style={{fontSize:56}}>{done===“win”?“⚔”:“💀”}</div><h2 className=“title” style={{fontSize:28,color:done===“win”?”#5aab6e”:”#c04040”}}>{done===“win”?“Перемога!”:“Поразка”}</h2>
<button onClick={()=>onResult(done,herHP)} className={`btn ${done==="win"?"btn-green":"btn-red"}`} style={{justifyContent:“center”,maxWidth:300,fontSize:18}}>Далі</button>

  </div></Page>;

return <Page><ResBar res={res} army={army} frags={frags.size} hp={herHP} maxHp={hero.maxHp} turn={turn}/>
<div style={{flex:1,overflowY:“auto”,padding:“12px 16px 24px”,display:“flex”,flexDirection:“column”,gap:12}}>
<div className=“panel fade” style={{borderLeft:“4px solid #c04040”}}><div className=“label” style={{color:”#c04040”}}>Битва</div><div className="title" style={{fontSize:20,marginTop:4}}>{hero.name} vs {PN[planet.key]}</div><div style={{fontSize:14,color:”#7a6a55”}}>{WLA[planet.who]} · Складність {pdiff(planet.key)}</div></div>
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:12}}>
<div className=“panel” style={{textAlign:“center”,animation:shake===“h”?“shake .2s”:“none”}}><div style={{fontSize:36}}>{hero.icon}</div><div style={{fontSize:16,fontWeight:600,color:WCO[hero.faction],marginTop:4}}>{hero.name}</div><div style={{height:6,borderRadius:3,background:“rgba(255,255,255,.05)”,marginTop:6,overflow:“hidden”}}><div style={{height:“100%”,borderRadius:3,background:”#c04040”,width:`${herHP/hero.maxHp*100}%`,transition:“width .4s”}}/></div><div style={{fontSize:14,color:”#c04040”,marginTop:4}}>❤ {herHP}/{hero.maxHp}</div></div>
<div className=“panel” style={{textAlign:“center”,borderColor:col+“33”,animation:shake===“e”?“shake .2s”:“none”}}><div style={{fontSize:36}}>{planet.who===“WE”?“🛡”:planet.who===“YOU”?“🪞”:planet.who===“THEY”?“⚙”:“◎”}</div><div style={{fontSize:16,fontWeight:600,color:col,marginTop:4}}>{PN[planet.key].substring(0,14)}</div><div style={{height:6,borderRadius:3,background:“rgba(255,255,255,.05)”,marginTop:6,overflow:“hidden”}}><div style={{height:“100%”,borderRadius:3,background:col,width:`${enHP}%`,transition:“width .4s”}}/></div><div style={{fontSize:14,color:col,marginTop:4}}>⚔ {enHP}%</div></div>
</div>
{clog.length>0&&<div className="panel" style={{padding:12}}>{clog.map((l,i)=><div key={i} style={{fontSize:14,opacity:i===0?1:.5,marginBottom:2}}>{l}</div>)}</div>}
<button onClick={attack} className=“btn btn-red” style={{justifyContent:“center”,fontSize:18}}>⚔ Атакувати</button>
<div style={{display:“flex”,gap:8}}><button onClick={defend} className=“btn” style={{flex:1,justifyContent:“center”,fontSize:15}}>🛡 Захист</button>{hero.mag>2&&<button onClick={spell} className=“btn” style={{flex:1,justifyContent:“center”,fontSize:15,borderColor:“rgba(144,96,184,.25)”}}>✨ Магія</button>}</div>
<div style={{display:“flex”,gap:8}}>{hero.id===“diplomat”&&<button onClick={()=>onResult(“negotiate”)} className=“btn” style={{flex:1,justifyContent:“center”,fontSize:15,borderColor:“rgba(32,128,176,.25)”}}>🪞 Договір</button>}<button onClick={()=>onResult(“retreat”)} className=“btn” style={{flex:1,justifyContent:“center”,fontSize:15,color:”#7a6a55”}}>↩ Відступ</button></div>
</div></Page>;
}