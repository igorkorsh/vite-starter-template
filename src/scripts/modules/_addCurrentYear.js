const element = document.querySelector("#year");

if (element) {
  element.innerText = new Date().getFullYear();
}
