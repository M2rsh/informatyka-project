async function scrollToElement(element, speed, delay, offset) {
  let current = offset;

  const interval = setInterval(() => {
    if (element.offsetTop <= current) {
      element.scrollIntoView({ behavior: "smooth" });
      clearInterval(interval);
    }
    const distanceRemaining = element.offsetTop - current;
    const scrollSpeed = speed * Math.pow(distanceRemaining / (1000 - speed), 2) + speed / 2;

    parallax.scrollTo({ top: current + 1 });
    current += scrollSpeed;
  }, delay);
}

function updateTabs() {
  const tabs = [...linkContainer.children].filter(element => element.classList.contains("link"));
  const activeTab = tabs.find(element => {
    const refElement = document.getElementById(element.dataset.href);
    return refElement.offsetTop + 30 <= parallax.scrollTop + window.innerHeight
      && refElement.offsetTop + refElement.offsetHeight - 30 >= parallax.scrollTop;
  });
  tabs.forEach(tab => tab.classList.remove("active"));
  if (activeTab) activeTab.classList.add("active");
}

function moveLayers() {
  var value = parallax.scrollTop;
  [...layerGroup.children].forEach((element, i) => {
    if (element.className != "layer") return;
    element.style.top = value * ( -0.3 * (layerGroup.childElementCount - i - 1)) + 'px';
  })
}

function switchTheme(event) {
  const theme = event.target.checked ? "light" : "dark";
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

function detectColorScheme() {
  let theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", theme);
}