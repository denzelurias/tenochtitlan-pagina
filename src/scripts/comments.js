const API_ENDPOINT = "/api/comments";

function setCommentStatus(statusElement, message, tone = "neutral") {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.dataset.tone = tone;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function renderEmptyState(commentsList, message) {
  commentsList.replaceChildren();

  const empty = document.createElement("p");
  empty.className = "comments-empty";
  empty.textContent = message;
  commentsList.append(empty);
}

function renderComments(commentsList, comments) {
  commentsList.replaceChildren();

  if (!comments.length) {
    renderEmptyState(commentsList, "Aun no hay comentarios aprobados.");
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

async function loadComments(commentsList) {
  if (window.location.protocol === "file:") {
    renderEmptyState(
      commentsList,
      "Los comentarios se cargan cuando la pagina se abre desde el servidor.",
    );
    return;
  }

  try {
    const response = await fetch(API_ENDPOINT);
    const payload = await response.json();

    if (!response.ok) throw new Error(payload.error);

    renderComments(commentsList, payload.comments ?? []);
  } catch {
    renderEmptyState(commentsList, "No se pudieron cargar los comentarios.");
  }
}

async function submitComment(event, form, statusElement) {
  event.preventDefault();

  if (window.location.protocol === "file:") {
    setCommentStatus(
      statusElement,
      "Los comentarios se envian cuando la pagina se abre desde el servidor.",
      "error",
    );
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);

  submitButton.disabled = true;
  setCommentStatus(statusElement, "Enviando comentario...");

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const payload = await response.json();

    if (!response.ok) throw new Error(payload.error);

    form.reset();
    setCommentStatus(statusElement, "Comentario recibido. Aparecera cuando sea aprobado.", "success");
  } catch (error) {
    setCommentStatus(statusElement, error.message || "No se pudo enviar el comentario.", "error");
  } finally {
    submitButton.disabled = false;
  }
}

export function initComments() {
  const commentForm = document.querySelector("#comment-form");
  const commentStatus = document.querySelector("#comment-status");
  const commentsList = document.querySelector("#comments-list");

  if (!commentForm || !commentsList) return;

  commentForm.addEventListener("submit", (event) => {
    submitComment(event, commentForm, commentStatus);
  });

  loadComments(commentsList);
}
