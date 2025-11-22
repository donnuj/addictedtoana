// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
navToggle?.addEventListener("click", () => navList.classList.toggle("open"));

// Filtros da galeria
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === "all" || filter === cat;
      card.classList.toggle("hide", !show);
    });
  });
});

// Lightbox com navegação
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-nav.prev");
const nextBtn = document.querySelector(".lightbox-nav.next");

const galleryImgs = [...document.querySelectorAll("#gallery img")];
let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  const img = galleryImgs[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNext(){
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  openLightbox(currentIndex);
}
function showPrev(){
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  openLightbox(currentIndex);
}

galleryImgs.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

closeBtn?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if(e.target === lightbox) closeLightbox();
});
nextBtn?.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
prevBtn?.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });

// Teclas
window.addEventListener("keydown", (e) => {
  if(!lightbox.classList.contains("open")) return;
  if(e.key === "Escape") closeLightbox();
  if(e.key === "ArrowRight") showNext();
  if(e.key === "ArrowLeft") showPrev();
});

// Ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

// Feedback simples do form
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", () => {
  const btn = contactForm.querySelector("button[type='submit']");
  btn.textContent = "Enviando...";
});