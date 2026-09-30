/* Lightvessel site — language toggle and page interactions */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ───────────────────────── language strings ───────────────────────── */

const L = {
  en: {
    chatPlaceholder: "Say what’s on your mind…",
    bottlePlaceholder: "A line is enough — or none at all",
    forget: "Forget",
    forgetConfirm: "Confirm?",
    copiedAsk: "Message copied — send it to someone you trust.",
    checkinLogged: (w) => `${w} · recorded`,
    checkinQuestion: "What’s the weather in your inner sea?",
    checkinSubtitle: "A small note for today’s self. It will find its place in your tide chart.",
    checkinBodyQuestion: "How does your body feel?",
    checkinNote: "Leave a note for today’s self…",
    checkinSubmit: "Log Sea Conditions",
    bottleNeed: "Write a sentence first — one is enough.",
    bottleToast: "Released into the sea · A reply will be waiting at 7:30",
    weather: [
      { id: "storm", name: "Storm", icon: "⛈" },
      { id: "rain", name: "Rain", icon: "☂" },
      { id: "fog", name: "Fog", icon: "≋" },
      { id: "cloudy", name: "Cloudy", icon: "☁" },
      { id: "breeze", name: "Breeze", icon: "≈" },
      { id: "sunny", name: "Sunny", icon: "☼" },
      { id: "aurora", name: "Aurora", icon: "✧" },
    ],
    bodyFeelings: ["Light", "Steady", "Tense", "Heavy", "Noisy mind", "Numb"],
    memories: [
      { tag: "PREFERENCE", text: "Prefers being heard before advice is offered" },
      { tag: "RECENT", text: "Rainy evenings have felt heavy lately" },
      { tag: "UPCOMING", text: "Has a big presentation on Friday" },
    ],
    clarityCardTitle: "Clarity Card · sample",
    clarityLabels: ["What happened", "When it began", "What your body may be holding", "A gentler way to see it", "One small next step"],
    clarityExamples: ["Notice where tension is showing up, without needing to change it yet.", "This feeling is worth listening to; it doesn’t define the whole story.", "Choose one small thing you can leave until tomorrow."],
    modes: {
      vent: {
        name: "Vent",
        guidance: "I’m here — say whatever’s on your mind.",
        chips: ["Today was a lot.", "I can’t stop overthinking.", "Just needed to say it out loud."],
        replies: [
          "That sounds like a lot to hold at once. I’m listening.",
          "That makes sense — anyone would feel that after a day like today.",
          "I hear you. You don’t have to make it smaller for me.",
        ],
      },
      tidy: {
        name: "Tidy",
        guidance: "Tell me about one specific thing that’s been weighing on you — one sentence is enough.",
        chips: ["Work has been swallowing my evenings.", "I keep putting off a hard conversation."],
        replies: ["Got it. When did this feeling first come up? What else was happening around then?"],
      },
      stay: {
        name: "Stay",
        guidance: "I’m here quietly with you — no need to rush into words.",
        chips: ["Can you just stay with me a while?", "Not ready to talk about it yet."],
        replies: ["I’m here. No rush.", "Still here — keeping the light on.", "You don’t have to be okay yet. Stay awhile."],
      },
    },
    modeOrder: ["vent", "tidy", "stay"],
  },
  zh: {
    chatPlaceholder: "想说就说……",
    bottlePlaceholder: "写一句也可以，什么都不写也可以",
    forget: "忘记",
    forgetConfirm: "确定？",
    copiedAsk: "求助短信已复制，可以发给你信任的人。",
    checkinLogged: (w) => `${w} · 已记录`,
    checkinQuestion: "今天的内海是什么天气？",
    checkinSubtitle: "替今天的自己记一笔，它会留在你的潮汐表里。",
    checkinBodyQuestion: "身体现在的感觉",
    checkinNote: "给今天的自己留句话……",
    checkinSubmit: "登记海况",
    bottleNeed: "先写一句吧——一句就够了。",
    bottleToast: "已放归大海 · 明早 7:30 有回信",
    weather: [
      { id: "storm", name: "雷暴", icon: "⛈" },
      { id: "rain", name: "落雨", icon: "☂" },
      { id: "fog", name: "有雾", icon: "≋" },
      { id: "cloudy", name: "多云", icon: "☁" },
      { id: "breeze", name: "微风", icon: "≈" },
      { id: "sunny", name: "晴朗", icon: "☼" },
      { id: "aurora", name: "极光", icon: "✧" },
    ],
    bodyFeelings: ["轻盈", "平稳", "紧绷", "沉重", "脑子很吵", "麻木"],
    memories: [
      { tag: "偏好", text: "希望先被听见，再听建议" },
      { tag: "近况", text: "最近雨天的傍晚容易低落" },
      { tag: "待办", text: "周五有个重要的汇报" },
    ],
    clarityCardTitle: "梳理卡 · 示例",
    clarityLabels: ["发生了什么", "最初的源头", "身体可能在经历什么", "一个更温和的看法", "最小的下一步"],
    clarityExamples: ["留意一下紧绷感出现在哪里，不必急着改变它。", "这个感受值得被听见，但它不等于整个故事。", "挑一件今晚可以留到明天再做的小事。"],
    modes: {
      vent: {
        name: "倾诉",
        guidance: "我在——想说什么都可以。",
        chips: ["今天太多了。", "脑子里停不下来。", "只是想说出来。"],
        replies: ["听起来今天要装的事太多了。我在听。", "这很正常——谁经历过这样的一天都会这样。", "我听到了。你不用把它说得更小。"],
      },
      tidy: {
        name: "梳理",
        guidance: "说一件最近压在心上的具体的事——一句话就够。",
        chips: ["工作把我的晚上都吞掉了。", "我一直在拖一场艰难的对话。"],
        replies: ["收到。这个念头第一次冒出来，大概是什么时候？那前后还发生了什么？"],
      },
      stay: {
        name: "陪伴",
        guidance: "我安静地在这儿，不用急着说话。",
        chips: ["你能陪我待一会儿吗？", "还没准备好说这件事。"],
        replies: ["我在。不急。", "还在——灯留着。", "你不用现在就好起来。再待一会儿。"],
      },
    },
    modeOrder: ["vent", "tidy", "stay"],
  },
};

let lang = document.documentElement.lang === "zh-Hans" ? "zh" : "en";
const t = (key) => L[lang][key];

function updateGreeting() {
  const hour = new Date().getHours();
  const period = hour >= 5 && hour < 12 ? 0 : hour >= 12 && hour < 18 ? 1 : 2;
  const en = [["Good morning.", "How are you this morning?"], ["Good afternoon.", "How are you doing today?"], ["Good evening.", "How are you doing tonight?"]][period];
  const zh = [["早上好。", "上午过得怎么样？"], ["下午好。", "今天过得怎么样？"], ["晚上好。", "今晚过得怎么样？"]][period];
  [["#greetingEn", en], ["#greetingZh", zh]].forEach(([selector, lines]) => {
    const node = $(selector);
    if (!node) return;
    node.replaceChildren(document.createTextNode(lines[0]), document.createElement("br"), document.createTextNode(lines[1]));
  });
}

/* ───────────────────────── language toggle ───────────────────────── */

function setLang(next) {
  lang = next;
  document.documentElement.lang = next === "en" ? "en" : "zh-Hans";
  updateGreeting();
  $$(".en").forEach((el) => (el.hidden = next !== "en"));
  $$(".zh").forEach((el) => (el.hidden = next !== "zh"));
  const btn = $(".language-button");
  if (btn) {
    btn.textContent = next === "en" ? "中文" : "EN";
    btn.setAttribute("aria-label", next === "en" ? "切换到简体中文" : "Switch to English");
  }
  try { localStorage.setItem("lv-lang", next); } catch (e) { /* private mode */ }
  renderDynamic();
}

/* ───────────────────────── phone: screens & tabs ───────────────────────── */

const BASE_SCREENS = ["now", "tides", "memory"];
let activeScreen = "now";
let returnScreen = "now";

function showScreen(name) {
  const isTab = BASE_SCREENS.includes(name);
  if (isTab) returnScreen = name;
  else if (BASE_SCREENS.includes(activeScreen)) returnScreen = activeScreen;
  activeScreen = name;
  $$(".app-screen").forEach((s) => {
    const active = s.dataset.screen === name;
    s.classList.toggle("active", active);
    s.classList.toggle("overlay", active && !isTab);
    s.setAttribute("aria-hidden", active ? "false" : "true");
  });
  $$(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  const tabbar = $(".phone-tabbar");
  if (tabbar) tabbar.hidden = !isTab;
}

$$(".tab-btn").forEach((btn) =>
  btn.addEventListener("click", () => showScreen(btn.dataset.tab))
);

/* ───────────────────────── phone: toast ───────────────────────── */

let toastTimer = null;
function phoneToast(msg) {
  const el = $("#phoneToast");
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => (el.hidden = true), 320);
  }, 2400);
}

/* ───────────────────────── check-in demo ───────────────────────── */

let checkedIn = null; // { weather, body, note }
let selectedWeather = null;
let selectedBodyFeeling = null;

const WEATHER_ICON_SVG = {
  storm: '<svg viewBox="0 0 24 24"><path d="M5.2 14.2a4.1 4.1 0 0 1 .9-8.1A6.1 6.1 0 0 1 17.7 7a3.7 3.7 0 0 1 .8 7.2"/><path d="m13 12-3 5h3l-1 4 4-6h-3l1-3"/></svg>',
  rain: '<svg viewBox="0 0 24 24"><path d="M5.2 13.5a4 4 0 0 1 .9-8A6 6 0 0 1 17.7 6.5a3.4 3.4 0 0 1 .7 6.9H5.2Z"/><path d="m8 16-1 2m6-2-1 2m6-2-1 2"/></svg>',
  fog: '<svg viewBox="0 0 24 24"><path d="M5.2 12.5a4 4 0 0 1 .9-8A6 6 0 0 1 17.7 5.5a3.4 3.4 0 0 1 .7 6.9H5.2Z"/><path d="M4 16h15M6 19h12"/></svg>',
  cloudy: '<svg viewBox="0 0 24 24"><path d="M5.2 15a4.1 4.1 0 0 1 .9-8.1A6.1 6.1 0 0 1 17.7 7a3.7 3.7 0 0 1 .8 7.2H5.2Z"/></svg>',
  breeze: '<svg viewBox="0 0 24 24"><path d="M3 8h12.5a2.5 2.5 0 1 0-2.4-3.2M3 12h17a2.5 2.5 0 1 1-2.4 3.2M3 16h8.5"/></svg>',
  sunny: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  aurora: '<svg viewBox="0 0 24 24"><path d="M3 17c2.1-5.6 5.2-8.7 9-9.2 3.5-.5 6.5 1.2 9 5.2M3 20c3.5-3.4 6.8-4.6 10-3.7 2.8.8 5 2.4 8 2.7"/><path d="M12 3v2m-1-1h2"/></svg>',
};

function addVesselLogRow({ en, zh, mark = "≈" }) {
  const list = $("#vesselLogRows");
  if (!list) return;
  const row = document.createElement("div");
  row.className = "vessel-log-row new-log-row";
  const time = document.createElement("span");
  time.className = "log-time";
  time.textContent = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  const icon = document.createElement("span");
  icon.className = "log-mark";
  icon.textContent = mark;
  const label = document.createElement("span");
  const enText = document.createElement("span");
  enText.className = "en";
  enText.textContent = en;
  const zhText = document.createElement("span");
  zhText.className = "zh";
  zhText.hidden = true;
  zhText.textContent = zh;
  label.append(enText, zhText);
  row.append(time, icon, label);
  list.prepend(row);
}

function updateDemoChart(score) {
  const y = Math.max(4, Math.min(68, 84 - score * 16));
  const dot = $("#miniTodayDot");
  if (dot) {
    dot.setAttribute("cx", "292");
    dot.setAttribute("cy", y.toFixed(1));
    dot.setAttribute("opacity", "1");
  }
  const enMetric = $("#chartMetricEn");
  const zhMetric = $("#chartMetricZh");
  if (enMetric) enMetric.textContent = `Today’s entry · ${score.toFixed(1)}`;
  if (zhMetric) zhMetric.textContent = `今天的记录 · ${score.toFixed(1)}`;
}

function renderCheckinChoices() {
  const weatherRoot = $("#weatherOptions");
  const bodyRoot = $("#bodyOptions");
  if (!weatherRoot || !bodyRoot) return;

  weatherRoot.innerHTML = "";
  L[lang].weather.forEach((weather) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "weather-choice" + (selectedWeather === weather.id ? " on" : "");
    button.setAttribute("aria-pressed", String(selectedWeather === weather.id));
    const icon = document.createElement("span");
    icon.className = "weather-symbol";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = WEATHER_ICON_SVG[weather.id] || "";
    const label = document.createElement("span");
    label.className = "weather-label";
    label.textContent = weather.name;
    button.append(icon, label);
    button.addEventListener("click", () => {
      selectedWeather = weather.id;
      renderCheckinChoices();
    });
    weatherRoot.appendChild(button);
  });

  bodyRoot.innerHTML = "";
  L[lang].bodyFeelings.forEach((name, index) => {
    const id = ["light", "steady", "tense", "heavy", "noisy", "numb"][index];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "body-choice" + (selectedBodyFeeling === id ? " on" : "");
    button.setAttribute("aria-pressed", String(selectedBodyFeeling === id));
    button.textContent = name;
    button.addEventListener("click", () => {
      selectedBodyFeeling = selectedBodyFeeling === id ? null : id;
      renderCheckinChoices();
    });
    bodyRoot.appendChild(button);
  });

  const note = $("#checkinNote");
  if (note) note.placeholder = L[lang].checkinNote;
  const submit = $(".checkin-save-top");
  if (submit) submit.disabled = !selectedWeather;
}

function openCheckin() {
  selectedWeather = checkedIn?.weather || null;
  selectedBodyFeeling = checkedIn?.body || null;
  const note = $("#checkinNote");
  if (note) note.value = checkedIn?.note || "";
  renderCheckinChoices();
  showScreen("checkin");
}

function saveCheckin() {
  if (!selectedWeather) return;
  const weatherEn = L.en.weather.find((item) => item.id === selectedWeather)?.name || "";
  const weatherZh = L.zh.weather.find((item) => item.id === selectedWeather)?.name || "";
  const bodyIndex = ["light", "steady", "tense", "heavy", "noisy", "numb"].indexOf(selectedBodyFeeling);
  const bodyEn = bodyIndex >= 0 ? L.en.bodyFeelings[bodyIndex] : "";
  const bodyZh = bodyIndex >= 0 ? L.zh.bodyFeelings[bodyIndex] : "";
  const noteValue = $("#checkinNote")?.value.trim() || "";
  checkedIn = { weather: selectedWeather, body: selectedBodyFeeling, note: noteValue };

  const weatherScore = { storm: 1, rain: 2, fog: 2.5, cloudy: 3, breeze: 3.5, sunny: 4, aurora: 5 }[selectedWeather];
  const bodyModifier = { light: 0.4, steady: 0, tense: -0.3, heavy: -0.5, noisy: -0.4, numb: -0.6 }[selectedBodyFeeling] || 0;
  const score = Math.round(Math.max(1, Math.min(5, weatherScore + bodyModifier)) * 10) / 10;

  $("#checkinTitleEn").textContent = `Today · ${weatherEn}`;
  $("#checkinTitleZh").textContent = `今天 · ${weatherZh}`;
  $("#checkinSubtitleEn").textContent = bodyEn ? `Body · ${bodyEn}` : (noteValue || "Your sea, recorded on this device.");
  $("#checkinSubtitleZh").textContent = bodyZh ? `身体 · ${bodyZh}` : (noteValue || "今天的海况已记下，只保存在本机。");
  $("#checkinHomeButton .en").textContent = "Edit today’s entry";
  $("#checkinHomeButton .zh").textContent = "修改今天的记录";
  const recentEn = $(".recent-empty .en");
  const recentZh = $(".recent-empty .zh");
  if (recentEn) recentEn.textContent = `Today’s sea conditions: ${weatherEn.toLowerCase()}. A few more check-ins will help reveal patterns.`;
  if (recentZh) recentZh.textContent = `今天的海况：${weatherZh}。再记录几次，就能慢慢看见变化。`;
  updateDemoChart(score);
  addVesselLogRow({ en: `Sea conditions · ${weatherEn}`, zh: `登记海况 · ${weatherZh}` });
  showScreen(returnScreen);
  phoneToast(L[lang].checkinLogged(lang === "en" ? weatherEn : weatherZh));
}

/* ───────────────────────── memory demo ───────────────────────── */

const forgotten = new Set();
let armedMemory = null;
let memoryTimer = null;

function renderMemory() {
  const list = $("#memoryList");
  const empty = $("#memoryEmpty");
  if (!list) return;
  list.innerHTML = "";
  const items = L[lang].memories;
  items.forEach((memory, i) => {
    if (forgotten.has(i)) return;
    const item = document.createElement("div");
    item.className = "memory-item";
    const tag = document.createElement("span");
    tag.className = "memory-tag";
    tag.textContent = memory.tag;
    const p = document.createElement("p");
    p.textContent = memory.text;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "memory-forget";
    const isArmed = armedMemory === i;
    btn.classList.toggle("armed", isArmed);
    btn.textContent = isArmed ? L[lang].forgetConfirm : L[lang].forget;
    btn.addEventListener("click", () => {
      if (armedMemory === i) {
        clearTimeout(memoryTimer);
        armedMemory = null;
        forgotten.add(i);
        addVesselLogRow({ en: "Memory forgotten", zh: "已忘记一条记忆", mark: "⌁" });
        renderMemory();
        phoneToast(lang === "en" ? "Memory forgotten in this preview." : "已在预览中忘记这条记忆。");
        return;
      }
      clearTimeout(memoryTimer);
      armedMemory = i;
      renderMemory();
      memoryTimer = setTimeout(() => {
        if (armedMemory === i) {
          armedMemory = null;
          renderMemory();
        }
      }, 3000);
    });
    item.append(tag, p, btn);
    list.appendChild(item);
  });
  const visible = items.filter((_, i) => !forgotten.has(i)).length;
  if (empty) empty.hidden = visible > 0;
}

/* ───────────────────────── chat demo ───────────────────────── */

let chatMode = "vent";
let chatMsgs = []; // { role, en, zh, kind }
let replyIndex = { vent: 0, tidy: 0, stay: 0 };
let typingTimer = null;

function bubbleEl(m) {
  const div = document.createElement("div");
  div.className = "bubble" + (m.role === "user" ? " user" : " ai") + (m.kind === "guidance" ? " guidance" : "");
  if (m.kind === "clarity-card") {
    div.classList.add("clarity-bubble");
    const title = document.createElement("strong");
    title.className = "clarity-bubble-title";
    title.textContent = L[lang].clarityCardTitle;
    div.appendChild(title);
    const values = [m.answers[0] || "—", m.answers[1] || "—", ...L[lang].clarityExamples];
    L[lang].clarityLabels.forEach((label, index) => {
      const row = document.createElement("div");
      row.className = "clarity-bubble-row";
      const field = document.createElement("span");
      field.textContent = label;
      const value = document.createElement("p");
      value.textContent = values[index];
      row.append(field, value);
      div.appendChild(row);
    });
    return div;
  }
  div.textContent = m[lang === "en" ? "en" : "zh"];
  return div;
}

function renderChat() {
  const scroll = $("#chatScroll");
  if (!scroll) return;
  scroll.innerHTML = "";
  if (chatMsgs.length === 0) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = lang === "en" ? "What’s on your mind today?" : "今天有什么在你心上？";
    scroll.appendChild(empty);
  } else {
    chatMsgs.forEach((m) => scroll.appendChild(bubbleEl(m)));
  }
  scroll.scrollTop = scroll.scrollHeight;
}

function typingEl() {
  const div = document.createElement("div");
  div.className = "bubble ai typing";
  div.innerHTML = "<i></i><i></i><i></i>";
  return div;
}

function sendUserMessage(text) {
  chatMsgs.push({ role: "user", en: text, zh: text });
  renderChat();
  const scroll = $("#chatScroll");
  const typing = typingEl();
  scroll.appendChild(typing);
  scroll.scrollTop = scroll.scrollHeight;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    const mode = L[lang].modes[chatMode];
    const modeEn = L.en.modes[chatMode];
    if (chatMode === "tidy") {
      const lastCardIndex = chatMsgs.map((m) => m.kind).lastIndexOf("clarity-card");
      const round = chatMsgs.slice(lastCardIndex + 1).filter((m) => m.role === "user");
      if (round.length >= 2) {
        chatMsgs.push({ role: "ai", kind: "clarity-card", answers: round.slice(-2).map((m) => m.en) });
      } else {
        chatMsgs.push({ role: "ai", en: modeEn.replies[0], zh: mode.replies[0] });
      }
    } else {
      const idx = replyIndex[chatMode] % modeEn.replies.length;
      replyIndex[chatMode] += 1;
      chatMsgs.push({ role: "ai", en: modeEn.replies[idx], zh: mode.replies[idx] });
    }
    renderChat();
  }, 950 + Math.random() * 450);
}

function resetChat(mode) {
  chatMode = mode;
  chatMsgs = [];
  renderModeChips();
  renderSuggestions();
  renderChat();
}

function renderModeChips() {
  const wrap = $("#modeChips");
  if (!wrap) return;
  wrap.innerHTML = "";
  L[lang].modeOrder.forEach((id) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "mode-chip" + (id === chatMode ? " on" : "");
    chip.textContent = L[lang].modes[id].name;
    chip.addEventListener("click", () => resetChat(id));
    wrap.appendChild(chip);
  });
}

function renderSuggestions() {
  const wrap = $("#chatSuggest");
  if (!wrap) return;
  wrap.innerHTML = "";
  wrap.innerHTML = "";
  wrap.hidden = true;
}

$("#chatForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#chatText");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  sendUserMessage(text);
});

/* ───────────────────────── bottle demo ───────────────────────── */

function releaseBottle(textarea, toastFn) {
  const text = textarea.value.trim();
  if (!text) {
    toastFn(L[lang].bottleNeed);
    return false;
  }
  textarea.value = "";
  toastFn(L[lang].bottleToast);
  return true;
}

let ritualToastTimer = null;
function showRitualToast(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(ritualToastTimer);
  ritualToastTimer = setTimeout(() => (el.hidden = true), 4200);
}

$("#ritualBottleSend")?.addEventListener("click", () => {
  releaseBottle($("#ritualBottleInput"), (msg) => showRitualToast($("#ritualBottleToast"), msg));
});

/* ───────────────────────── beacon copy button ───────────────────────── */

$("#beaconCopy")?.addEventListener("click", (e) => {
  const btn = e.currentTarget;
  const text = btn.dataset.copy;
  const done = () => {
    btn.querySelector(".copy-idle").hidden = true;
    btn.querySelector(".copy-done").hidden = false;
    setTimeout(() => {
      btn.querySelector(".copy-idle").hidden = false;
      btn.querySelector(".copy-done").hidden = true;
    }, 2200);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (err) { /* noop */ }
    ta.remove();
    done();
  }
});

/* ───────────────────────── app actions ───────────────────────── */

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "talk") {
    showScreen("chat");
    if (chatMsgs.length === 0) resetChat(chatMode);
  } else if (action === "beacon") {
    showScreen("beacon");
  } else if (action === "copy-ask") {
    const text = lang === "en"
      ? "I’m having a hard time. Can you stay with me for a few minutes?"
      : "我现在有些难熬，你能陪我一会儿吗？";
    const done = () => phoneToast(L[lang].copiedAsk);
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(done);
    else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (err) { /* noop */ }
      ta.remove();
      done();
    }
  } else if (action === "breathe") {
    showScreen("breathe");
    phoneBreath.start();
  } else if (action === "bottle") {
    showScreen("bottle");
  } else if (action === "back-now") {
    if (phoneBreath.isRunning()) phoneBreath.stop();
    showScreen(returnScreen);
  } else if (action === "stop-breathe") {
    phoneBreath.stop();
    showScreen(returnScreen);
  } else if (action === "send-bottle") {
    const ta = $("#bottleInput");
    const ok = releaseBottle(ta, phoneToast);
    if (ok) setTimeout(() => showScreen(returnScreen), 900);
  } else if (action === "checkin") {
    openCheckin();
  } else if (action === "save-checkin") {
    saveCheckin();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const target = e.target.closest?.("[data-action][role='button']");
  if (!target) return;
  e.preventDefault();
  target.click();
});

/* ───────────────────────── dynamic re-render on language switch ───────────────────────── */

function renderDynamic() {
  renderModeChips();
  renderSuggestions();
  renderChat();
  renderMemory();
  renderCheckinChoices();
  const chatInput = $("#chatText");
  if (chatInput) chatInput.placeholder = L[lang].chatPlaceholder;
  const bottleInputs = $$(".bottle-input");
  bottleInputs.forEach((ta) => (ta.placeholder = L[lang].bottlePlaceholder));
}

/* ───────────────────────── language button ───────────────────────── */

// Locale links navigate to static URLs, so language and search metadata agree.

/* ───────────────────────── scroll reveal ───────────────────────── */

const revealEls = $$(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.1 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ───────────────────────── boot ───────────────────────── */

/* Automatically cycle through the real app screenshots. */
(function productCarousel() {
  const carousel = $(".product-carousel");
  if (!carousel) return;
  const slides = $$(".product-slide", carousel);
  let current = 0;
  let visible = true;
  let timer;

  function restart() {
    clearTimeout(timer);
    if (visible && !document.hidden) timer = setTimeout(showNext, 5500);
  }
  async function showNext() {
    const next = (current + 1) % slides.length;
    const img = $("img", slides[next]);
    if (img.dataset.src) {
      img.srcset = img.dataset.srcset;
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
    try { await img.decode(); } catch { restart(); return; }
    current = next;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.classList.toggle("is-active", i === current);
    });
    restart();
  }
  document.addEventListener("visibilitychange", restart);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); }).observe(carousel);
  }
  restart();
})();

/* A local QR image keeps downloads fast and avoids a third-party QR service. */
$$('a[href="https://apps.apple.com/app/id6800191641"]').forEach((link, index) => {
  const wrapper = document.createElement("span");
  wrapper.className = "download-qr";
  link.before(wrapper);
  wrapper.append(link);
  link.classList.add("download-link");
  const card = document.createElement("span");
  card.className = "qr-card";
  card.id = `download-qr-${index}`;
  card.setAttribute("role", "tooltip");
  card.innerHTML = '<img src="/assets/app-store-qr.png" width="164" height="164" alt="App Store download QR code" decoding="async"><p><span class="en">Scan to download</span><span class="zh" hidden>扫码下载</span><small><span class="en">Open your iPhone camera</span><span class="zh" hidden>使用 iPhone 相机扫一扫</span></small></p>';
  link.setAttribute("aria-describedby", card.id);
  wrapper.append(card);
});

(function boot() {
  showScreen("now");
  setLang(document.documentElement.lang === "zh-Hans" ? "zh" : "en");
})();
