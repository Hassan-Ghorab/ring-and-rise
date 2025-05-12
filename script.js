const sections = document.querySelectorAll(".section");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navLinksContainer = document.querySelector("ul");
const allLinks = navLinksContainer.querySelectorAll("a");
const navLinksEl = document.querySelectorAll(".nav-link");
const closeBtn = document.getElementById("closeBtn");
const hiddenElements = document.querySelectorAll(".hidden");
const images = document.querySelectorAll(".partners-logos img");
const yearEl = document.querySelector(".year");
const goToTopButton = document.getElementById("goToTopBtn");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
  navLinks.classList.remove("open");
});

allLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const themeToggleButton = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  themeToggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M120 40v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0m8 24a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64m-69.66 5.66a8 8 0 0 0 11.32-11.32l-8-8a8 8 0 0 0-11.32 11.32Zm0 116.68l-8 8a8 8 0 0 0 11.32 11.32l8-8a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l8-8a8 8 0 0 0-11.32-11.32l-8 8A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l8 8a8 8 0 0 0 11.32-11.32ZM40 120h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16m88 88a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-8a8 8 0 0 0-8-8m96-88h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16"/></svg>`;
} else {
  themeToggleButton.innerHTML = `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M13.719 1.8A8.759 8.759 0 1 1 1.8 13.719c3.335 1.867 7.633 1.387 10.469-1.449c2.837-2.837 3.318-7.134 1.45-10.47"
                />
              </svg>`;
}

themeToggleButton.addEventListener("click", () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    themeToggleButton.innerHTML = `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M13.719 1.8A8.759 8.759 0 1 1 1.8 13.719c3.335 1.867 7.633 1.387 10.469-1.449c2.837-2.837 3.318-7.134 1.45-10.47"
                />
              </svg>`;
    localStorage.setItem("theme", "light"); // Store light mode in localStorage
  } else {
    body.classList.add("dark-theme");
    themeToggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M120 40v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0m8 24a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64m-69.66 5.66a8 8 0 0 0 11.32-11.32l-8-8a8 8 0 0 0-11.32 11.32Zm0 116.68l-8 8a8 8 0 0 0 11.32 11.32l8-8a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l8-8a8 8 0 0 0-11.32-11.32l-8 8A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l8 8a8 8 0 0 0 11.32-11.32ZM40 120h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16m88 88a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-8a8 8 0 0 0-8-8m96-88h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16"/></svg>`;
    localStorage.setItem("theme", "dark"); // Store dark mode in localStorage
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

hiddenElements.forEach((el) => observer.observe(el));

// IntersectionObserver to track sections
const linksObserver = new IntersectionObserver(
  (entries) => {
    let visibleSectionId = null;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSectionId = entry.target.getAttribute("id");
      }
    });

    if (visibleSectionId) {
      navLinksEl.forEach((navLink) => navLink.classList.remove("active"));

      const activeLink = document.querySelector(
        `.nav-link[href="#${visibleSectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  },
  {
    threshold: [0.3, 0.6],
  }
);

sections.forEach((section) => {
  linksObserver.observe(section);
});

const logosObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...images].indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 350);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

images.forEach((img) => logosObserver.observe(img));

document.addEventListener("DOMContentLoaded", () => {
  const contents = document.querySelectorAll(".hero-content");
  const bullets = document.querySelectorAll(".bullet");
  let current = 0;
  let interval = setInterval(nextSlide, 10000);

  const imagesArray = [
    "images/hero/hero-bg-1.jpg",
    "images/hero/hero-bg-2.jpg",
    "images/hero/hero-bg-3.jpg",
  ];

  function showSlide(index) {
    contents.forEach((content, i) => {
      content.classList.toggle("active", i === index);
    });
    bullets.forEach((bullet, i) => {
      bullet.classList.toggle("active", i === index);
    });

    const hero = document.querySelector(".hero");
    hero.style.backgroundImage = `url(${imagesArray[index]})`;

    current = index;
  }

  showSlide(0);

  function nextSlide() {
    let next = (current + 1) % contents.length;
    showSlide(next);
  }

  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
      showSlide(index);
      clearInterval(interval);
      interval = setInterval(nextSlide, 10000);
    });
  });
});

const year = new Date().getFullYear();
yearEl.innerText = year;

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("main-content");

  loader.style.display = "none";
  content.style.visibility = "visible";
});

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopButton.style.display = "block";
  } else {
    goToTopButton.style.display = "none";
  }
};

goToTopButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const modal = document.getElementById("calendlyModal");
const modalContent = document.getElementById("modalContent");
const successMessage = document.getElementById("successMessage");

document.getElementById("showCalendlyBtn").addEventListener("click", () => {
  modal.style.display = "block";
});

document.getElementById("openCalendlyDemo").addEventListener("click", () => {
  modal.style.display = "block";
});

document.getElementById("closeCalendly").addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

window.addEventListener("message", function (e) {
  if (e.origin !== "https://calendly.com") return;

  if (
    e.data &&
    typeof e.data === "object" &&
    e.data.event === "calendly.event_scheduled"
  ) {
    successMessage.classList.add("show");

    setTimeout(() => {
      successMessage.classList.remove("show");
      modal.style.display = "none";
      window.location.reload();
    }, 4000);
  }
});
