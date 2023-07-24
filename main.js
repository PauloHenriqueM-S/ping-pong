const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  lineWidth = 15,
  gapX = 10

const mouse = { x: 0, y: 0 }

const field = {
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function () {
    ctx.fillStyle = "#286047"
    ctx.fillRect(0, 0, this.w, this.h)
  }
}
const line = {
  w: 15,
  h: field.h,
  draw: function () {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h)
  }
}
const lRacket = {
  x: gapX,
  y: 0,
  w: line.w,
  h: 200,
  _move: function () {
    this.y = mouse.y - this.h / 2
  },
  draw: function () {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(this.x, this.y, this.w, this.h)

    this._move()
  }
}
const rRacket = {
  x: field.w - line.w - gapX,
  y: 200,
  w: line.w,
  h: 200,
  speed: 5,
  _move: function () {
    if (this.y + this.h / 2 < ball.y + ball.r) {
      this.y += this.speed
    } else {
      this.y -= this.speed
    }
  },
  speedUp: function () {
    this.speed += 2
  },
  draw: function () {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(this.x, this.y, this.w, this.h)
    this._move()
  }
}
const score = {
  human: 0,
  computer: 0,
  icreaseHuman: function () {
    this.human++
  },
  icreaseComputer: function () {
    this.computer++
  },
  draw: function () {
    ctx.font = "bold 72px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillStyle = "#01341D"
    ctx.fillText(this.human, field.w / 4, field.h / 2.1)
    ctx.fillText(this.computer, field.w / 4 + field.w / 2, field.h / 2.1)
  },
}
const ball = {
  x: 0,
  y: 0,
  r: 20,
  directionX: 1,
  directionY: 1,
  speed: 5,
  _calcPosition: function () {
    if (this.x > field.w - this.r - rRacket.w - gapX) {
      if (this.y + this.r > rRacket.y && this.y - this.r < rRacket.y + rRacket.h) {
        this._reverseX()
      } else {
        score.icreaseHuman()
        this._pointUp()
      }
    }
    if (this.x < this.r + lRacket.w + gapX) {
      if (this.y + this.r > lRacket.y && this.y - this.r < lRacket.y + lRacket.h) {
        this._reverseX()
      } else {
        score.icreaseComputer()
        this._pointUp()
      }
    }
    if (
      (this.y - this.r < 0 && this.directionY < 0) ||
      (this.y > field.h - this.r && this.directionY > 0)
    ) {
      this._reverseY()
    }
  },
  _reverseX: function () {
    this.directionX *= -1
  },
  _reverseY: function () {
    this.directionY *= -1
  },
  _speedUp: function () {
    this.speed += 3
  },
  _pointUp: function () {
    this._speedUp()
    rRacket.speedUp()
    this.x = field.w / 2
    this.y = field.h / 2
  },
  _move: function () {
    this.x += this.directionX * this.speed
    this.y += this.directionY * this.speed
  },
  draw: function () {
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    ctx.fill()

    this._calcPosition()
    this._move()
  }
}


function setup() {
  canvas.width = ctx.width = field.w
  canvas.height = ctx.height = field.h
}
function draw() {
  field.draw()

  line.draw()

  lRacket.draw()
  rRacket.draw()

  score.draw()

  ball.draw()
}

window.animateFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  )
})()

function main() {
  animateFrame(main)
  draw()
}

setup()
main()

canvas.addEventListener('mousemove', function (e) {
  mouse.x = e.pageX
  mouse.y = e.pageY
})