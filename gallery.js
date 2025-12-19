// Auto gallery: categorize images by filename keywords and provide a simple lightbox
(function () {
  const images = [
    "foto.jpeg",
    "foto1.jpeg",
    "foto2.jpeg",
    "foto3.jpeg",
    "foto4.jpeg",
    "foto5.jpeg",
    "foto6.jpeg",
    "foto7.jpeg",
    "foto8.jpeg",
    "foto9.jpeg",
    "foto10.jpeg",
    "foto11.jpeg",
    "sound.jpg",
    "sound1.jpg",
    "sound2.jpg",
    "sound3.jfif",
    "sound4.jfif",
    "sound5.jfif",
    "sound6.jfif",
  ];

  // do NOT include 'foto' here — photos named 'foto*' are event (acara)
  const peralatanKeywords = ["sound", "logo"];
  const eventKeywords = ["acara", "event", "whatsapp"];

  // initialise default categories if user hasn't set any
  const defaultCategories = {
    "sound.jpg": "equipment",
    "sound1.jpg": "equipment",
    "sound2.jpg": "equipment",
    "sound3.jfif": "equipment",
    "sound4.jfif": "equipment",
    "sound5.jfif": "equipment",
    "sound6.jfif": "equipment",
    "foto.jpeg": "event",
    "foto1.jpeg": "event",
    "foto2.jpeg": "event",
    "foto3.jpeg": "event",
    "foto4.jpeg": "event",
    "foto5.jpeg": "event",
    "foto6.jpeg": "event",
    "foto7.jpeg": "event",
    "foto8.jpeg": "event",
    "foto9.jpeg": "event",
    "foto10.jpeg": "event",
    "foto11.jpeg": "event",
  };
  if (!localStorage.getItem("gallery_categories")) {
    localStorage.setItem("gallery_categories", JSON.stringify(defaultCategories));
  }
  // load saved mapping and normalize: ensure any file starting with 'foto' is 'event'
  const savedRaw = JSON.parse(localStorage.getItem("gallery_categories") || "{}");
  const saved = Object.assign({}, savedRaw);
  // migrate any saved .jfif keys to .jpg if the .jpg file is now present in images
  Object.keys(savedRaw).forEach((k) => {
    if (k.toLowerCase().endsWith(".jfif")) {
      const jpgKey = k.replace(/\.jfif$/i, ".jpg");
      if (images.indexOf(jpgKey) >= 0 && !Object.prototype.hasOwnProperty.call(saved, jpgKey)) {
        saved[jpgKey] = savedRaw[k];
        delete saved[k];
      }
    }
  });
  images.forEach((name) => {
    const ln = name.toLowerCase();
    if (ln.startsWith("foto")) {
      saved[name] = "event";
    }
  });
  // persist normalization back to localStorage
  localStorage.setItem("gallery_categories", JSON.stringify(saved));
  const equipment = [];
  const event = [];

  images.forEach((name) => {
    const n = name.toLowerCase();
    if (saved[name] === "equipment") equipment.push(name);
    else if (saved[name] === "event") event.push(name);
    else if (peralatanKeywords.some((k) => n.includes(k))) equipment.push(name);
    else if (eventKeywords.some((k) => n.includes(k))) event.push(name);
    else equipment.push(name);
  });

  const eqGrid = document.getElementById("gallery-equipment");
  const evGrid = document.getElementById("gallery-event");

  function mkImgEl(src, alt) {
    const img = document.createElement("img");
    img.src = "img/" + src;
    img.alt = alt || src;
    img.className = "gallery-item";
    // make images non-clickable by default (click disabled)
    img.dataset.clickable = "false";
    img.dataset.src = src;
    // fallback: if the image fails to load, show a simple SVG placeholder
    img.onerror = function () {
      this.onerror = null;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6b7280">Image not found: ${src}</text></svg>`;
      this.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    };
    return img;
  }

  function renderList(list, container) {
    container.innerHTML = "";
    list.forEach((src, i) => {
      const img = mkImgEl(src, src);
      img.dataset.index = i;
      container.appendChild(img);
    });
  }

  renderList(equipment, eqGrid);
  renderList(event, evGrid);

  // tabs
  document.querySelectorAll(".gallery-tabs .tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".gallery-tabs .tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.target;
      document.getElementById("gallery-equipment").style.display =
        target === "equipment" ? "grid" : "none";
      document.getElementById("gallery-event").style.display = target === "event" ? "grid" : "none";
    });
  });

  // no manage UI — gallery categories are taken from saved mapping only

  // lightbox
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="close">×</button>
    <div class="lightbox-content">
      <div class="lightbox-nav">
        <button class="prev">◀</button>
        <button class="next">▶</button>
      </div>
      <img class="lightbox-img" src="" alt="">
    </div>`;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector(".lightbox-img");
  const btnClose = overlay.querySelector(".lightbox-close");
  const btnPrev = overlay.querySelector(".prev");
  const btnNext = overlay.querySelector(".next");

  let currentList = equipment;
  let currentIndex = 0;

  function open(list, index) {
    currentList = list;
    currentIndex = index;
    lbImg.src = "img/" + currentList[currentIndex];
    overlay.classList.add("open");
  }
  function close() {
    overlay.classList.remove("open");
  }
  function next() {
    currentIndex = (currentIndex + 1) % currentList.length;
    lbImg.src = "img/" + currentList[currentIndex];
  }
  function prev() {
    currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    lbImg.src = "img/" + currentList[currentIndex];
  }

  // bind click on generated images
  document.body.addEventListener("click", (e) => {
    const t = e.target;
    if (t.classList && t.classList.contains("gallery-item")) {
      // only open lightbox if explicitly allowed (data-clickable="true")
      if (t.dataset.clickable !== "true") return;
      const src = t.dataset.src;
      // determine which list
      const list = equipment.indexOf(src) >= 0 ? equipment : event;
      const index = list.indexOf(src);
      open(list, index);
    }
  });

  btnClose.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
})();
