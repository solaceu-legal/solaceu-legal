/* Shared App Store QR tooltip for every website download link. */
(() => {
  const links = Array.from(document.querySelectorAll('a[href^="https://apps.apple.com/"]'))
    .filter((link) => /^\/app\/(?:apple-store\/)?id6800191641$/.test(new URL(link.href).pathname));
  if (!links.length) return;
  const desktop = window.matchMedia("(min-width: 721px) and (hover: hover) and (pointer: fine)");
  const zh = document.documentElement.lang === "zh-Hans";
  const card = document.createElement("div");
  card.className = "download-qr-card";
  card.id = "app-store-download-qr";
  card.hidden = true;
  card.setAttribute("role", "tooltip");
  const image = document.createElement("img");
  image.src = "/assets/app-store-qr.png";
  image.width = image.height = 180;
  image.alt = zh ? "Lightvessel App Store 下载二维码" : "Lightvessel App Store download QR code";
  const title = document.createElement("p");
  title.textContent = zh ? "扫码下载 Lightvessel" : "Scan to download Lightvessel";
  const hint = document.createElement("small");
  hint.textContent = zh ? "用 iPhone 相机扫一扫，前往 App Store" : "Scan with your iPhone camera to open the App Store";
  card.append(image, title, hint);
  document.body.append(card);
  let activeLink;
  let closeTimer;

  function hide() {
    clearTimeout(closeTimer);
    card.hidden = true;
    activeLink = null;
  }

  function position() {
    if (!activeLink) return;
    if (!desktop.matches) { hide(); return; }
    const button = activeLink.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    if (button.bottom <= 0 || button.top >= height) { hide(); return; }
    const gap = 12;
    const bounds = card.getBoundingClientRect();
    const left = Math.max(gap, Math.min(button.left + button.width / 2 - bounds.width / 2, width - bounds.width - gap));
    const below = button.bottom + gap;
    const top = below + bounds.height <= height - gap ? below : button.top - bounds.height - gap;
    card.style.left = `${left}px`;
    card.style.top = `${Math.max(gap, top)}px`;
  }

  function show(link) {
    if (!desktop.matches) return;
    clearTimeout(closeTimer);
    activeLink = link;
    card.hidden = false;
    position();
  }

  function leave() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (card.matches(":hover") || activeLink?.matches(":hover, :focus")) return;
      hide();
    }, 180);
  }

  links.forEach((link) => {
    link.classList.add("download-link");
    link.setAttribute("aria-describedby", [link.getAttribute("aria-describedby"), card.id].filter(Boolean).join(" "));
    link.addEventListener("mouseenter", () => show(link));
    link.addEventListener("mouseleave", leave);
    link.addEventListener("focus", () => show(link));
    link.addEventListener("blur", leave);
  });
  card.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  card.addEventListener("mouseleave", leave);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") hide(); });
  window.addEventListener("scroll", position, { passive: true, capture: true });
  window.addEventListener("resize", position, { passive: true });
  desktop.addEventListener("change", hide);
})();
