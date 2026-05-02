const progress = document.querySelector(".scroll-progress");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const commentForm = document.querySelector("#comment-form");
const commentStatus = document.querySelector("#comment-status");
const commentsList = document.querySelector("#comments-list");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
let ticking = false;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
}

function syncParallax() {
  if (reduceMotion.matches) return;

  const viewportHeight = window.innerHeight;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();
    const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
    const y = centerOffset * speed * -1;
    item.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
  });
}

function requestScrollSync() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateProgress();
    syncParallax();
    ticking = false;
  });
}

function closeMenu() {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

function initNavigation() {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-42% 0px -48% 0px", threshold: 0 },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function initReveals() {
  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 35, 420)}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function setCommentStatus(message, tone = "neutral") {
  if (!commentStatus) return;
  commentStatus.textContent = message;
  commentStatus.dataset.tone = tone;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function renderComments(comments) {
  if (!commentsList) return;

  commentsList.replaceChildren();

  if (!comments.length) {
    const empty = document.createElement("p");
    empty.className = "comments-empty";
    empty.textContent = "Aun no hay comentarios aprobados.";
    commentsList.append(empty);
    return;
  }

  comments.forEach((comment) => {
    const article = document.createElement("article");
    article.className = "comment-item";

    const header = document.createElement("div");
    header.className = "comment-meta";

    const author = document.createElement("strong");
    author.textContent = comment.author_name;

    const time = document.createElement("time");
    time.dateTime = comment.created_at;
    time.textContent = formatDate(comment.created_at);

    const body = document.createElement("p");
    body.textContent = comment.body;

    header.append(author, time);
    article.append(header, body);
    commentsList.append(article);
  });
}

async function loadComments() {
  if (!commentsList) return;

  if (window.location.protocol === "file:") {
    commentsList.innerHTML =
      '<p class="comments-empty">Los comentarios se cargan cuando la pagina se abre desde el servidor.</p>';
    return;
  }

  try {
    const response = await fetch("/api/comments");
    const payload = await response.json();

    if (!response.ok) throw new Error(payload.error);

    renderComments(payload.comments ?? []);
  } catch {
    commentsList.innerHTML = '<p class="comments-empty">No se pudieron cargar los comentarios.</p>';
  }
}

async function submitComment(event) {
  event.preventDefault();

  if (window.location.protocol === "file:") {
    setCommentStatus("Los comentarios se envian cuando la pagina se abre desde el servidor.", "error");
    return;
  }

  const submitButton = commentForm.querySelector('button[type="submit"]');
  const formData = new FormData(commentForm);

  submitButton.disabled = true;
  setCommentStatus("Enviando comentario...");

  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const payload = await response.json();

    if (!response.ok) throw new Error(payload.error);

    commentForm.reset();
    setCommentStatus("Comentario recibido. Aparecera cuando sea aprobado.", "success");
  } catch (error) {
    setCommentStatus(error.message || "No se pudo enviar el comentario.", "error");
  } finally {
    submitButton.disabled = false;
  }
}

function initComments() {
  if (!commentForm) return;
  commentForm.addEventListener("submit", submitComment);
  loadComments();
}

function initScroll() {
  window.addEventListener("scroll", requestScrollSync, { passive: true });
  window.addEventListener("resize", requestScrollSync);
  requestScrollSync();
}

initNavigation();
initReveals();
initScroll();
initComments();
