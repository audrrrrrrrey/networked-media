window.onload = () => {
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
