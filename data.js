// ===== РЕДАГУЙТЕ ТУТ: усі тексти, ціни й товари сайту =====
// Після змін: git add . && git commit -m "update" && git push — сайт оновиться сам.
window.SITE = {
  name: "ShaRlpSMP",
  ip: "sharlpSmp.aternos.me",
  discord: "https://discord.gg/sharlpsmp",
  discordNick: "artem4340036",      // у кого купувати в Discord
  currency: "грн",
  description: "Ванільний Minecraft Java SMP. Будуй, досліджуй, торгуй і грай з друзями.",
  advantages: [
    {i:"🌍", t:"Java SMP", d:"Класичне виживання для Minecraft Java Edition."},
    {i:"🤝", t:"Дружня спільнота", d:"Активний Discord, допомога новачкам."},
    {i:"🛡", t:"Чесні правила", d:"Модерація та справедливі правила для всіх."},
    {i:"🎁", t:"Магазин без обману", d:"Купівля напряму в Discord — жодних посередників."}
  ],
  // price: null → на сайті буде «Ціну уточнюйте». Вкажіть число, коли визначитесь.
  // popular: true → показувати на головній. image: посилання на картинку (необов’язково).
  products: [
    {id:"imperor", cat:"donat", name:"Імператор", icon:"👑", image:"", price:null, popular:true,
     desc:"Привілей найвищого рівня.", perks:["Додайте переваги в js/data.js"]},
    {id:"knyaz", cat:"donat", name:"Князь", icon:"🛡", image:"", price:null, popular:true,
     desc:"Привілей для активних гравців.", perks:["Додайте переваги в js/data.js"]},
    {id:"kit-start", cat:"kit", name:"Стартовий кіт (приклад)", icon:"🎒", image:"", price:null, popular:false,
     desc:"Приклад кіта — змініть або видаліть.", perks:["Вміст кіта вкажіть тут"]},
    {id:"other-1", cat:"other", name:"Інший товар (приклад)", icon:"✨", image:"", price:null, popular:false,
     desc:"Приклад товару — змініть або видаліть.", perks:["Опис переваг"]}
  ],
  categories: [{id:"donat",name:"Донати"},{id:"kit",name:"Кіти"},{id:"other",name:"Інші товари"}],
  // Промокоди: percent — знижка у %. Перевіряються лише на сайті й підтверджуються при покупці в Discord.
  promos: [ /* {code:"WELCOME", percent:10} */ ],
  news: [
    {date:"2026-10-28", title:"Новий сайт ShaRlpSMP", text:"Ми запустили сайт із магазином. Покупки — через Discord."}
  ],
  rules: [
    "Поважайте інших гравців. Образи та дискримінація заборонені.",
    "Заборонені чити, X-ray та експлойти, що дають нечесну перевагу.",
    "Не руйнуйте чужі будівлі й не крадіть без дозволу, якщо це не передбачено правилами сервера.",
    "Не рекламуйте інші сервери.",
    "Рішення адміністрації остаточні. Спірні питання — в Discord."
  ],
  support: "Маєте питання щодо покупки чи проблему на сервері? Напишіть у Discord — відповімо якнайшвидше.",
  contacts: "Discord-сервер: discord.gg/sharlpsmp. Власник: artem4340036 (Discord)."
};
