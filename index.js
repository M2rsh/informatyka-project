const parallax = document.getElementById("parallax");
const root = getComputedStyle(document.querySelector(':root'));
const main = document.getElementById("main");
const linkContainer = document.getElementById("linkContainer");
const procentageBar = document.getElementById("procentageBar")
const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');
const layerGroup = document.getElementById("layerGroup");

document.getElementById("arrow-down").onclick = () => scrollToElement(main, 5, 1, parallax.scrollTop);

[...linkContainer.children].filter(element => element.classList.contains("link")).forEach((element) => {
  element.onclick = () => document.getElementById(element.dataset.href).scrollIntoView({behavior: "smooth"});
});

detectColorScheme();
toggleSwitch.addEventListener('change', switchTheme, false);
toggleSwitch.checked = document.documentElement.getAttribute("data-theme") === "light";

parallax.onscroll = () => {
  let scrolledProcentage = parallax.scrollTop / (parallax.scrollHeight - window.innerHeight)
  procentageBar.style.width = `${scrolledProcentage*100}%`
  updateTabs();
  moveLayers();
}

updateTabs();