/* =========================================================
   ENABLE SCROLL-REVEAL (progressive enhancement)
========================================================= */

document.documentElement.classList.add("js-loaded");


/* =========================================================
   YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById("mobile-menu-button");

const mobileMenu =
  document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

    const isActive =
      mobileMenu.classList.contains("active");

    menuButton.setAttribute(
      "aria-expanded",
      isActive ? "true" : "false"
    );

    const icon =
      menuButton.querySelector("i");

    if (isActive) {

      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");

    } else {

      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");

    }

  });


  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        const icon =
          menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

      });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =========================================================
   STAGGER ANIMATION
========================================================= */

document
  .querySelectorAll(
    `
    .skills-bento .reveal,
    .projects-grid .reveal,
    .currently-grid .reveal,
    .about-side .reveal
    `
  )
  .forEach((element, index) => {

    element.style.transitionDelay =
      `${(index % 5) * 80}ms`;

  });

/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const navLinkGroups = {};

document
  .querySelectorAll(
    ".nav-links a[href^='#'], .mobile-menu a[href^='#']"
  )
  .forEach((link) => {

    const id =
      link.getAttribute("href").slice(1);

    if (!navLinkGroups[id]) {
      navLinkGroups[id] = [];
    }

    navLinkGroups[id].push(link);

  });


const trackedSections =
  document.querySelectorAll("section[id]");


const activeSectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        const links =
          navLinkGroups[entry.target.id];

        if (!links) {
          return;
        }

        document
          .querySelectorAll(
            ".nav-links a, .mobile-menu a"
          )
          .forEach((link) => {
            link.classList.remove("active"); link.removeAttribute("aria-current");
          });

        links.forEach((link) => {
          link.classList.add("active"); link.setAttribute("aria-current", "location");
        });

      });

    },

    {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0
    }
  );


trackedSections.forEach((section) => {
  activeSectionObserver.observe(section);
});


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener(
      "click",
      function (event) {

        const href =
          this.getAttribute("href");


        if (
          !href ||
          href === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(href);


        if (target) {

          event.preventDefault();

          const offset = 70;

          const position =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;


          window.scrollTo({

            top: position,

            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"

          });

        }

      }
    );

  });

