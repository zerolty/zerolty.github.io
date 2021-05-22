class ClipBox {
  constructor(points) {
    this.points = points;
  }

  static create() {
    return new ClipBox(
      "60,80;80,250;170,250;190, 80"
        .split(";")
        .map((_) => _.split(",").map(Number))
    );
  }

  circleInBox(c) {
    return this.circleHit(c) === undefined;
  }

  circleHit(c) {
    const p = [c.x, c.y];
    const l = [];
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      const pointOnLine = this.points[i];
      let n = [
        this.points[j][0] - pointOnLine[0],
        this.points[j][1] - pointOnLine[1],
      ];
      const d = Math.sqrt(n[0] ** 2 + n[1] ** 2);
      n = [n[0] / d, n[1] / d];
      const r = this.pointAndLine(pointOnLine, n, p);
      if (r.onside) return r;
      if (r.dist < c.r * 2) return r;
    }
    return undefined;
  }

  pointAndLine(pointOnLine, lineNormal, point) {
    const v = [pointOnLine[0] - point[0], pointOnLine[1] - point[1]];
    const vdn = v[0] * lineNormal[0] + v[1] * lineNormal[1];
    const m = [vdn * lineNormal[0], vdn * lineNormal[1]];
    const vec = [v[0] - m[0], v[1] - m[1]];

    const lineOrth = [-lineNormal[1], lineNormal[0]];
    const dir = lineOrth[0] * vec[0] + lineOrth[1] * vec[1] < 0;

    const vd = Math.sqrt(vec[0] ** 2 + vec[1] ** 2);

    return {
      onside: dir,
      dist: Math.sqrt(vec[0] ** 2 + vec[1] ** 2),
      vec,
      ivec: [-vec[0], -vec[1]],
      fix: [-vec[0] / vd, -vec[1] / vd],
    };
  }
}

class Circle {
  constructor(x, y, r, id) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
  }

  static createCircleElement() {
    return document.createElementNS("http://www.w3.org/2000/svg", "circle");
  }

  createCircle() {
    this.e = Circle.createCircleElement();
    this.e.setAttribute("r", this.r + 0.3);
  }

  setPos(cx, cy) {
    this.x = cx;
    this.y = cy;
    this.e.setAttribute("cx", this.x);
    this.e.setAttribute("cy", this.y);
  }

  move(x, y) {
    this.setPos(this.x + x, this.y + y);
  }

  dist(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  touching(other) {
    return this.dist(other) < this.r + other.r;
  }

  touchingAny(others) {
    return others.some((o) => {
      if (o.id === this.id) return false;
      return this.touching(o);
    });
  }

  moveThrough(others, x, y, cb) {
    if (this.y + y > cb.points[1][1] - this.r * 2) return;
    // add x, y to pos
    this.move(x, y);
    const hitA = cb.circleHit(this);
    if (hitA) {
      const pen = this.r * 2 - hitA.dist;
      this.move(
        hitA.fix[0] * pen,
        0 //hitA.ivec[1]
      );
      // return;
    }
    // check if hit anything
    const hits = others.filter((o) => {
      if (o.id === this.id) return false;
      return this.touching(o);
    });
    // if hit none, leave / update
    if (hits.length === 0) return;
    // if hit more than 1, undo and return
    if (hits.length > 1) {
      this.move(-x, -y);
      return;
    }
    // if hit just 1, move
    const hit = hits[0];

    // get normal from other to this
    let n = [this.x - hit.x, this.y - hit.y];
    const m = Math.sqrt(n[0] ** 2 + n[1] ** 2);
    n = [n[0] / m, n[1] / m];
    const pen = this.r * 2 - m;
    const v = [n[0] * pen, n[1] * pen];
    this.move(v[0], v[1]);
    // push until not touching
  }
}

const msgs = getMsgs();

const svg = document.querySelector("#pearls");
const clipBox = ClipBox.create();

let circles = [];
let pearlsLevel = 0;
updatePearlsLevel();

function addPearls(N) {
  let count = 0;
  while (count < N) {
    const x = Math.random() * 180 + 60;
    const y = Math.random() * 230 + 80;
    const c = new Circle(x, y, 6, count);
    if (c.touchingAny(circles) || !clipBox.circleInBox(c)) {
      continue;
    }
    c.createCircle();
    circles.push(c);
    svg.appendChild(c.e);
    count++;
  }
}

addPearls(20);

function createCircle() {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  return c;
}

function animate() {
  circles.forEach((c) => {
    c.moveThrough(circles, 0, 0.3, clipBox);
    c.moveThrough(circles, 0, 0.3, clipBox);
    c.moveThrough(circles, 0, 0.3, clipBox);
  });
  requestAnimationFrame(animate);
}

animate();

function morepearls() {
  addPearls(10);
  pearlsLevel++;
  updatePearlsLevel();
}

function updatePearlsLevel() {
    document.querySelector(".msg").innerHTML = getMsgs()[pearlsLevel] || "老板喊你工作了👽";
    document.querySelector('body').style.backgroundColor = getBgs()[pearlsLevel] || ""
}

function getBgs() {
    return [
        "#ffe9d5",
        "#ffe3cb",
        "#ffdec1",
        "#ffd8b6",
        "#ffd2ac",
        "#ffcda1",
        "#ffc797",
        "#ffc28c",
        "#ffbc82"
    ]
}

function getMsgs() {
  return [
    "一杯小奶茶 😊",
    "double珍珠! ",
    "珍珠真好吃",
    "大份珍珠",
    "不能再多了",
    "还能再多😱",
    "今年出的新🐷",
    "饮🐷啦",
  ];
}

function reset() {
  pearlsLevel = 0;
  updatePearlsLevel();
  circles.forEach((c) => {
    svg.removeChild(c.e);
  });
  circles = [];

  addPearls(20);
}

function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const href = urlParams.get('link');
  const footer = document.querySelector('.footer');
  if (name) {
    footer.style.display = 'block';
    const link = footer.querySelector('a')
    link.innerText = name;
    link.href = href;
  } else {
    footer.style.display = 'none';
  }
}

main();
