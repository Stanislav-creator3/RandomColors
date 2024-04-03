const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(e.target.textContent);
  }
});

const copyToClickboard = (text) => {
  return navigator.clipboard.writeText(text);
};

const gerenerateRandomColor = () => {
  const hexCodex = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodex[Math.floor(Math.random() * hexCodex.length)];
  }
  return "#" + color;
};

const setRandomColors = (isInitial) => {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : gerenerateRandomColor()
      : gerenerateRandomColor();

    if (!isInitial) {
      colors.push(color);
    }
    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
  updateColorsHash(colors);
};

const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
};

const updateColorsHash = (colors = []) => {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
};

const getColorsFromHash = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
};

setRandomColors(true);
