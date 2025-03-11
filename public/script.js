window.onload = () => {
    console.log("script has loaded");
  
    const savedFont = localStorage.getItem('font');
    const savedFontSize = localStorage.getItem('fontSize');
  
    if (savedFont && savedFontSize) {
      document.body.style.fontFamily = savedFont;
      document.body.style.fontSize = savedFontSize;
    }
  
    let isEnglish = savedFont === "proggy-clean";
    const translateButton = document.getElementById("translate-button");
  
    translateButton.addEventListener("click", () => {
      if (!isEnglish) {
        document.body.style.fontFamily = "proggy-clean";
        document.body.style.fontSize = "22px";
  
        localStorage.setItem('font', "proggy-clean");
        localStorage.setItem('fontSize', "22px");
      } else {
        document.body.style.fontFamily = "pixelated-wingdings";
        document.body.style.fontSize = "16px";
  
        localStorage.removeItem('font');
        localStorage.removeItem('fontSize');
      }
      isEnglish = !isEnglish;
    });
}