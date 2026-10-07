/* =========================================================
   CONFIG — все персональные данные находятся здесь.
   ========================================================= */
const CONFIG = {
  meetingDate: "2026-10-26T00:45:00+03:00",
  videoUrl: "assets/-5246718283568057000.mp4",

  messages: {
    why: "Мне нравятся твои глаза, твоя искренняя улыбка и твой смех. Мне нравится и молчать с тобой, и говорить обо всём на свете. Я ценю каждую минуту, которую мы проводим вместе — даже когда между нами расстояние. Рядом с тобой мне хорошо просто потому, что это ты.",
    want: "Я хочу стать твоим домом — местом, куда всегда хочется возвращаться. Хочу засыпать и просыпаться рядом с тобой, смеяться и плакать вместе, поддерживать друг друга, решать проблемы и говорить о будущем с уверенностью, что именно так всё и будет. Я хочу не просто мечтать об этом, а однажды назвать это нашей обычной жизнью.",
    aboutMe: "Если бы мне пришлось прожить эту жизнь заново, я бы нашёл тебя раньше, чтобы любить тебя дольше.",
    miss: "Я скучаю по тебе. Очень. И иногда расстояние особенно сильно напоминает мне, как сильно мне хочется просто оказаться рядом."
  },

  text: {
    heroTitle: ["Для тебя.", "Только для тебя."],
    heroCopy: "Я хотел сделать для тебя кое-что особенное.\nТак что просто нажми.",
    open: "Открыть",

    messagesTitle: "Тогда давай начнём.",
    messagesCopy: "Здесь есть несколько вещей, которые я хотел тебе сказать.",
    cards: ["Почему ты мне нравишься", "Что я хочу с тобой", "Немного от меня"],

    comfortTitle: "А если вдруг станет грустно…",
    comfortCopy: "У меня есть маленькое средство.",
    sadButton: "Мне грустно",
    missButton: "Я скучаю",

    countdownTitle: "Осталось совсем немного.",
    countdownCopy: "Наконец нам не придётся посылать поцелуйчики через экран.",
    countdownCompleteTitle: "Мы уже там.",
    countdownCompleteText: "Теперь самое важное — просто оказаться рядом.",

    finaleFirst: "А теперь главное…",
    finaleSecond: "И пусть я не самый лучший и совершал ошибки, я уверен в одном: написать тебе никогда не станет одной из них. Ведь для меня нет ничего важнее, чем знать, что ты просто счастлива.",
    watch: "Смотреть",

    videoEyebrow: "ОТ МУСИ",
    videoTitle: "Это для тебя, моя королева.",
    videoAfter: "Теперь ты знаешь всё.",
    restart: "Начать сначала",
    videoMissing: "Видео пока не найдено.\nПроверь, что файл находится в assets/video.mp4."
  }
};

/* =========================================================
   Ниже — механика сайта.
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  createParticles();
  setupNavigation();
  setupMessageCards();
  setupComfort();
  setupCountdown();
  setupFinale();
  setupVideo();
});

function applyConfig() {
  const title = $("#hero-title");
  title.innerHTML = CONFIG.text.heroTitle.map(line => `<span>${escapeHTML(line)}</span>`).join("");
  $("#hero-copy").textContent = CONFIG.text.heroCopy;
  $("#openBtnText").textContent = CONFIG.text.open;

  $("#messages-title").textContent = CONFIG.text.messagesTitle;
  $("#messages-copy").textContent = CONFIG.text.messagesCopy;
  $$(".card-title").forEach((el, index) => el.textContent = CONFIG.text.cards[index]);

  $("#comfort-title").textContent = CONFIG.text.comfortTitle;
  $("#comfort-copy").textContent = CONFIG.text.comfortCopy;
  $(".round-action-label").textContent = CONFIG.text.sadButton;
  $("#missBtn span").textContent = CONFIG.text.missButton;

  $("#countdown-title").textContent = CONFIG.text.countdownTitle;
  $("#countdown-copy").textContent = CONFIG.text.countdownCopy;
  $("#countdownCompleteTitle").textContent = CONFIG.text.countdownCompleteTitle;
  $("#countdownCompleteText").textContent = CONFIG.text.countdownCompleteText;

  $("#finale-first").textContent = CONFIG.text.finaleFirst;
  $("#finale-second").textContent = CONFIG.text.finaleSecond;
  $("#watchBtnText").textContent = CONFIG.text.watch;

  $("#videoEyebrow").textContent = CONFIG.text.videoEyebrow;
  $("#videoTitle").textContent = CONFIG.text.videoTitle;
  $("#videoAfter").textContent = CONFIG.text.videoAfter;
  $("#restartBtnText").textContent = CONFIG.text.restart;
  $("#videoEmptyText").textContent = CONFIG.text.videoMissing;
}

function setupNavigation() {
  $("#openBtn").addEventListener("click", () => {
    document.getElementById("messages").scrollIntoView({ behavior: "smooth" });
  });
}

function setupMessageCards() {
  const modal = $("#messageModal");
  const panelTitle = $("#messagePanelTitle");
  const panelText = $("#messagePanelText");
  const panelEyebrow = $("#messagePanelEyebrow");

  $$(".glass-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      const key = card.dataset.message;
      panelEyebrow.textContent = String(index + 1).padStart(2, "0");
      panelTitle.textContent = CONFIG.text.cards[index];
      panelText.textContent = CONFIG.messages[key];
      openOverlay(modal);
    });
  });

  $$("[data-close-message]").forEach(el => el.addEventListener("click", () => closeOverlay(modal)));
}

function setupComfort() {
  const screen = $("#comfort");
  const message = $("#comfortMessage");
  const messageText = $("p", message);

  $("#sadBtn").addEventListener("click", () => {
    messageText.textContent = "Иди сюда. Я мысленно тебя обнимаю.";
    showComfortMessage();
    burstHearts();
  });

  $("#missBtn").addEventListener("click", () => {
    messageText.textContent = CONFIG.messages.miss;
    showComfortMessage();
    burstHearts(12);
  });

  function showComfortMessage() {
    message.classList.remove("is-visible");
    requestAnimationFrame(() => message.classList.add("is-visible"));

    screen.classList.remove("bloom");
    requestAnimationFrame(() => screen.classList.add("bloom"));

    clearTimeout(showComfortMessage.timer);
    showComfortMessage.timer = setTimeout(() => {
      message.classList.remove("is-visible");
    }, 5200);
  }
}

  function showComfortMessage() {
    message.classList.remove("is-visible");
    requestAnimationFrame(() => message.classList.add("is-visible"));
    screen.classList.remove("bloom");
    requestAnimationFrame(() => screen.classList.add("bloom"));
    clearTimeout(showComfortMessage.timer);
    showComfortMessage.timer = setTimeout(() => message.classList.remove("is-visible"), 5200);
  }
}

function burstHearts(amount = 24) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > .25 ? "♥" : "·";
    heart.style.setProperty("--size", `${10 + Math.random() * 14}px`);
    heart.style.setProperty("--x", `${(Math.random() - .5) * 82}vw`);
    heart.style.setProperty("--y", `${80 + Math.random() * 42}vh`);
    heart.style.setProperty("--rotate", `${(Math.random() - .5) * 55}deg`);
    heart.style.setProperty("--duration", `${2.2 + Math.random() * 1.7}s`);
    heart.style.setProperty("--delay", `${Math.random() * .45}s`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4700);
  }
}

function setupCountdown() {
  const target = new Date(CONFIG.meetingDate).getTime();
  const timer = $("#countdownTimer");
  const complete = $("#countdownComplete");
  let lastSecond = null;

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      timer.hidden = true;
      complete.hidden = false;
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setUnit("days", days, 3);
    setUnit("hours", hours, 2);
    setUnit("minutes", minutes, 2);
    setUnit("seconds", seconds, 2);

    if (lastSecond !== seconds) {
      animateSecond();
      lastSecond = seconds;
    }
  }

  function setUnit(name, value, length) {
    const el = $(`[data-unit="${name}"]`);
    el.textContent = String(value).padStart(length, "0");
  }

  function animateSecond() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seconds = $('[data-unit="seconds"]');
    seconds.animate(
      [{ transform: "translateY(-3px)", opacity: .55 }, { transform: "translateY(0)", opacity: 1 }],
      { duration: 350, easing: "cubic-bezier(.22,.8,.2,1)" }
    );
  }

  tick();
  setInterval(tick, 1000);
}

function setupFinale() {
  const section = $("#finale");
  const button = $("#watchBtn");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => button.classList.add("ready"), 1150);
      }
    });
  }, { threshold: .35 });

  observer.observe(section);
}

function setupVideo() {
  const lightbox = $("#videoLightbox");
  const video = $("#video");
  const source = $("#videoSource");
  const empty = $("#videoEmpty");

  source.src = CONFIG.videoUrl;
  video.load();

  video.addEventListener("error", () => {
    video.hidden = true;
    empty.hidden = false;
  });

  $("#watchBtn").addEventListener("click", () => {
    openOverlay(lightbox);
    video.hidden = false;
    empty.hidden = true;
    video.currentTime = 0;
    setTimeout(() => video.play().catch(() => {}), 350);
  });

  $$("[data-close-video]").forEach(el => el.addEventListener("click", () => {
    closeOverlay(lightbox);
    video.pause();
  }));

  $("#restartBtn").addEventListener("click", () => {
    closeOverlay(lightbox);
    document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      video.currentTime = 0;
    }, 700);
  });
}

function openOverlay(el) {
  el.classList.add("is-open");
  el.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeOverlay(el) {
  el.classList.remove("is-open");
  el.setAttribute("aria-hidden", "true");
  if (!$$(".message-modal.is-open, .video-lightbox.is-open").length) {
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  $$(".message-modal.is-open, .video-lightbox.is-open").forEach(closeOverlay);
});

function createParticles() {
  const container = $("#particles");
  const count = window.innerWidth < 600 ? 18 : 32;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${85 + Math.random() * 20}%`;
    particle.style.setProperty("--x", `${(Math.random() - .5) * 120}px`);
    particle.style.setProperty("--duration", `${10 + Math.random() * 14}s`);
    particle.style.setProperty("--delay", `${Math.random() * -18}s`);
    container.appendChild(particle);
  }
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
