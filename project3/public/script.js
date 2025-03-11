window.onload = () => {
  console.log("script has loaded");

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

  const promiseCheckbox = document.getElementById("promise");
  const homeIcon = document.getElementById("home-icon");

  homeIcon.addEventListener("click", () => {
    location.href = "/";
    // window.location.href = '';
  });
  promiseCheckbox.addEventListener("change", () => {
    if (promiseCheckbox.checked) {
      window.location.href = "/become-a-collector-2";
    }
  });
};
