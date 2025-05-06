let slideIndex = 1;

window.onload = () => {
  console.log("script has loaded");
  const path = window.location.pathname;

  // translation stuff
  const savedFont = localStorage.getItem("font");
  const savedFontSize = localStorage.getItem("fontSize");
  const translateButton = document.getElementById("translate-button");

  if (savedFont && savedFontSize) {
    document.body.style.fontFamily = savedFont;
    document.body.style.fontSize = savedFontSize;

    if (savedFont == "proggy-clean") {
      translateButton.style.fontFamily = "pixelated-wingdings";
      translateButton.style.fontSize = "16px";
    } else {
      translateButton.style.fontFamily = "proggy-clean";
      translateButton.style.fontSize = "22px";
    }
  }

  let isEnglish = savedFont === "proggy-clean";

  translateButton.addEventListener("click", () => {
    if (!isEnglish) {
      document.body.style.fontFamily = "proggy-clean";
      document.body.style.fontSize = "22px";

      translateButton.style.fontFamily = "pixelated-wingdings";
      translateButton.style.fontSize = "16px";

      localStorage.setItem("font", "proggy-clean");
      localStorage.setItem("fontSize", "22px");
    } else {
      document.body.style.fontFamily = "pixelated-wingdings";
      document.body.style.fontSize = "16px";

      translateButton.style.fontFamily = "proggy-clean";
      translateButton.style.fontSize = "22px";

      localStorage.setItem("font", "pixelated-wingdings");
      localStorage.setItem("fontSize", "16px");
    }
    isEnglish = !isEnglish;
  });

  //collector's oath promise stuff
  if (path === "/become-a-collector") {
    const promiseCheckbox = document.getElementById("promise");
    const homeIcon = document.getElementById("home-icon");

    homeIcon.addEventListener("click", () => {
      location.href = "/";
    });

    promiseCheckbox.addEventListener("change", () => {
      if (promiseCheckbox.checked) {
        window.location.href = "/become-a-collector-2";
      }
    });
  }

  // modal/slideshow stuff
  if (path === "/") {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const closeBtn = document.getElementsByClassName("close")[0];
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    const images = Array.from(document.querySelectorAll(".tableImage"));
    let currentModalIndex = 0;

    function openModal(index) {
      currentModalIndex = index;
      const img = images[currentModalIndex];
      modalImg.src = img.src;
      modalCaption.textContent = img.getAttribute("data-caption") || "";
      modal.style.display = "flex";
    }

    images.forEach((img, index) => {
      img.addEventListener("click", () => openModal(index));
    });

    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    prevBtn.onclick = () => {
      currentModalIndex =
        (currentModalIndex - 1 + images.length) % images.length;
      openModal(currentModalIndex);
    };

    nextBtn.onclick = () => {
      currentModalIndex = (currentModalIndex + 1) % images.length;
      openModal(currentModalIndex);
    };

    showSlides(slideIndex);
  }
};

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}