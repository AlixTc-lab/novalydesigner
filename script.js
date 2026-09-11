/* =========================================
   MENÚ MÓVIL
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}


/* =========================================
   CERRAR MENÚ AL HACER CLICK
========================================= */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }
    });
});


/* =========================================
   CARRUSEL SLIDER DE GALERÍA
========================================= */

const sliderTrack = document.getElementById("sliderTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("sliderDots");

if (sliderTrack && prevBtn && nextBtn && dotsContainer) {
    const slides = Array.from(sliderTrack.children);
    let currentIndex = 0;

    // Crear dinámicamente los indicadores (puntos) según la cantidad de slides
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    // Desplazamiento automático opcional (descomentar si deseas que pase solo cada 5s)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % slides.length;
    //     updateSlider();
    // }, 5000);
}


/* =========================================
   VENTANA EMERGENTE (MODAL)
========================================= */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");
const modalBtn = document.getElementById("modalBtn");

// Abrir modal con los datos del formato
function openModal(title, imageSrc, description, whatsappMessage) {
    if (!modal) return;

    modalTitle.textContent = title;
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalDesc.textContent = description;

    // Configurar el enlace de WhatsApp con un mensaje personalizado
    const encodedMsg = encodeURIComponent(whatsappMessage || `Hola, me interesa obtener información sobre ${title}.`);
    modalBtn.href = `https://wa.me/525524084019?text=${encodedMsg}`; // Reemplazar por tu número real de WhatsApp

    modal.classList.add("active");
}

function closeModal() {
    if (modal) {
        modal.classList.remove("active");
    }
}

// Evento para abrir modal al hacer click en los formatos
const clickableFormats = document.querySelectorAll(".clickable-format");

clickableFormats.forEach(format => {
    format.addEventListener("click", () => {
        const title = format.getAttribute("data-title") || "Detalle del servicio";
        const image = format.getAttribute("data-img") || "img/placeholder.jpg";
        const desc = format.getAttribute("data-desc") || "Sin descripción disponible.";
        const msg = format.getAttribute("data-msg") || "";

        openModal(title, image, desc, msg);
    });
});

// Eventos para cerrar modal
if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

// Cerrar al hacer click fuera del contenedor principal
if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Cerrar al presionar la tecla Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
    }
});


/* =========================================
   ESTRELLAS ADICIONALES
========================================= */

const starsContainer = document.querySelector(".stars");

for (let i = 0; i < 35; i++) {

    const star = document.createElement("span");

    star.innerHTML = "✦";

    star.style.position = "absolute";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.fontSize =
        Math.random() * 8 + 4 + "px";

    star.style.color =
        Math.random() > .7
        ? "#00d9ff"
        : "#ffffff";

    star.style.opacity =
        Math.random() * .8 + .2;

    star.style.textShadow =
        "0 0 8px currentColor, 0 0 15px currentColor";

    star.style.animation =
        `starBlink ${Math.random() * 4 + 2}s infinite alternate`;

    star.style.animationDelay =
        Math.random() * 4 + "s";

    starsContainer.appendChild(star);
}


/* =========================================
   ANIMACIÓN DE ESTRELLAS
========================================= */

const style = document.createElement("style");

style.innerHTML = `

@keyframes starBlink {

    0% {
        opacity: .2;
        transform: scale(.7);
    }

    50% {
        opacity: 1;
        transform: scale(1.4);
    }

    100% {
        opacity: .3;
        transform: scale(.8);
    }

}

`;

document.head.appendChild(style);


/* =========================================
   EFECTO PARALLAX SUAVE
========================================= */

window.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - .5) * 10;

    const y =
        (event.clientY / window.innerHeight - .5) * 10;

    document.querySelector(".hero-content").style.transform =
        `translate(${x}px, ${y}px)`;

});
