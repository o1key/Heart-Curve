// selector
const canvas = document.querySelector("canvas");
const input = document.querySelector("input");
const text = document.querySelector("#value");

const ctx = canvas.getContext("2d");

const WIDTH = window.innerWidth > 500 ? 500 : window.innerWidth - 10;
const HEIGHT = WIDTH;
const BOX_SIZE = WIDTH / 10;

const initScreen = () => {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  canvas.style.background === "#fff";
  canvas.style.border = "2px solid black";
};

const drawCrosswords = () => {
  const CENTER_POSITION_X = WIDTH / 2 / BOX_SIZE;
  const CENTER_POSITION_Y = HEIGHT / 2 / BOX_SIZE;

  ctx.font = "16px Arial";
  ctx.fillStyle = "gray";

  // x: axis
  for (let i = 0; i < WIDTH / BOX_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * BOX_SIZE, 0);
    ctx.lineTo(i * BOX_SIZE, HEIGHT);
    ctx.strokeStyle = i === CENTER_POSITION_X ? "red" : "gray";
    ctx.stroke();
    ctx.closePath();

    let number = 0;
    if (i >= CENTER_POSITION_Y) {
      number = i - CENTER_POSITION_X;
    } else {
      number = (-i + CENTER_POSITION_X) * -1;
    }

    ctx.fillText(number, i * BOX_SIZE + CENTER_POSITION_Y, HEIGHT / 2 + 20);
  }

  // y: axis
  for (let i = 0; i < HEIGHT / BOX_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * BOX_SIZE);
    ctx.lineTo(WIDTH, i * BOX_SIZE);
    ctx.strokeStyle = i === CENTER_POSITION_Y ? "red" : "gray";
    ctx.stroke();
    ctx.closePath();

    let number = 0;
    if (i >= CENTER_POSITION_X) {
      number = (i - CENTER_POSITION_Y) * -1;
    } else {
      number = -i + CENTER_POSITION_Y;
    }
    if (number !== 0) {
      ctx.fillText(number, WIDTH / 2 - 20, i * BOX_SIZE + CENTER_POSITION_X);
    }
  }
};

const validPow = (x, y) => {
  let result = Math.pow(x, y);
  if (x > 0) {
    return result;
  } else {
    return -1 * Math.pow(-x, y);
  }
};

const calculateCurveCoordinates = (x, a) => {
  const y =
    validPow(x, 2 / 3) +
    0.9 * validPow(3.3 - x * x, 0.5) * Math.sin(a * Math.PI * x);
  return y;
};

const drawSinCurve = (a) => {
  console.log(a);
  let i = WIDTH / 2;
  let j = WIDTH / 2;

  for (let x = 0; x <= 1.8; x += BOX_SIZE / 10000) {
    const y = -calculateCurveCoordinates(x.toFixed(2), a);
    ctx.beginPath();
    ctx.moveTo(i, j);
    ctx.lineTo(WIDTH / 2 + x * BOX_SIZE, HEIGHT / 2 + y * BOX_SIZE);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    i = WIDTH / 2 + (x + BOX_SIZE / 10000) * BOX_SIZE;
    j = HEIGHT / 2 + (y + BOX_SIZE / 10000) * BOX_SIZE;
  }

  i = WIDTH / 2;
  j = WIDTH / 2;

  for (let x = 0; x >= -1.8; x -= BOX_SIZE / 10000) {
    const y = calculateCurveCoordinates(x.toFixed(2), a);
    ctx.beginPath();
    ctx.moveTo(i, j);
    ctx.lineTo(WIDTH / 2 + x * BOX_SIZE, HEIGHT / 2 + y * BOX_SIZE);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    i = WIDTH / 2 + (x - BOX_SIZE / 10000) * BOX_SIZE;
    j = HEIGHT / 2 + (y - BOX_SIZE / 10000) * BOX_SIZE;
  }
};

// main logic
(() => {
  initScreen();
  drawCrosswords();
  drawSinCurve();

  input.addEventListener("input", (e) => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    value = e.target.value;
    text.textContent = value;
    initScreen();
    drawCrosswords();
    drawSinCurve(e.target.value);
  });
})();
