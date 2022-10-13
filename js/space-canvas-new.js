let container, canvas, ctx, aurora = [], auroraCount = 30, stars = [], starsCount = 100

const auroraMinWidth = 50,
  auroraMaxWidth = 100,
  auroraMinHeight = 200,
  auroraMaxHeight = 800,
  starMinSize = 2,
  starMaxSize = 5,
  minTTL = 200,
  maxTTL = 800,
  backgroundColor = '#000000'


function init() {
  setCanvas()
  resizeReset()
  animationLoop()
}

window.addEventListener("DOMContentLoaded", init)
window.addEventListener("resize", resizeReset)

function setCanvas() {
  container = document.querySelector(".space-canvas")
  canvas = {
    a: document.createElement("canvas"),
    b: document.createElement("canvas")
  }
  ctx = {
    a: canvas.a.getContext("2d"),
    b: canvas.b.getContext("2d")
  }
  canvas.b.width = screen.width;
  canvas.b.height = screen.height;
  canvas.a.width = screen.width;
  canvas.a.height = screen.height;
  canvas.b.style = "position: fixed; top:0px; left:0; width:100%; height:calc(100% + 30px)"
  container.appendChild(canvas.b)   
}


function resizeReset() {
  canvas.a.width = window.innerWidth
  canvas.a.width = window.innerHeight
  ctx.a.drawImage(canvas.b, 0, 0)

  canvas.b.width = window.innerWidth
  canvas.b.width = window.innerHeight
  ctx.b.drawImage(canvas.a, 0, 0)

  for (let i = 0; i < auroraCount; i++) {
    aurora.push(new Aurora())
  }

  for (let j = 0; j < starsCount; j++) {
    stars.push(new Star())
    
  }
}

function animationLoop() {
  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)
  ctx.b.fillStyle = backgroundColor
  ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height)
  for (let i = 0; i < aurora.length; i++) {
    aurora[i].update()
		aurora[i].draw()
  }
  for (let j = 0; j < stars.length; j++) {
    stars[j].update()
		stars[j].draw()
  }
  ctx.b.save()
  ctx.b.filter = 'blur(10px)'
  ctx.a.filter = 'blur(1px)'
  ctx.b.globalCompositeOperation = "lighter"
  ctx.a.globalCompositeOperation = "lighter"
  ctx.b.drawImage(canvas.a, 0, 0)
  ctx.b.restore()

  requestAnimationFrame(animationLoop)
}

function fadeInOut(t, m){
	let hm = 0.5 * m
  return Math.abs((t + hm) % m - hm) / hm
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

class Aurora {
  constructor() {
    this.x = getRandomInt(0, canvas.a.width)
    this.y = canvas.a.height 
    this.width = getRandomInt(auroraMinWidth, auroraMaxWidth)
    if(this.x >= canvas.a.width / 2){
        var a = canvas.a.width - this.x
        this.height = getRandomInt(auroraMinHeight, auroraMaxHeight - (a /2))
    }
    else{
        this.height = getRandomInt(auroraMinHeight, auroraMaxHeight - (this.x /2))
    }
    
    this.hue = getRandomInt(120, 180)
    this.ttl = getRandomInt(minTTL, maxTTL)
    this.life = 0
  }
  draw() {
    let gradient
    gradient = ctx.a.createLinearGradient(this.x, this.y - this.height, this.x, this.y)
    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 65%, 0)`)
    gradient.addColorStop(0.9, `hsla(${this.hue}, 100%, 30%, ${fadeInOut(this.life, this.ttl)/4})`)
    gradient.addColorStop(1, `hsla(${this.hue}, 100%, 65%, 0)`)

    ctx.a.save()
    ctx.a.beginPath()
    ctx.a.strokeStyle = gradient
    ctx.a.lineWidth = this.width
    ctx.a.moveTo(this.x, canvas.a.height - this.height)
    ctx.a.lineTo(this.x, canvas.a.height + (canvas.a.height / 10))
    ctx.a.stroke()
    ctx.a.closePath()
    ctx.a.restore()
  }
  update() {
		this.life++
    if(this.life > this.ttl){
    	this.life = 0
        this.x = getRandomInt(0, canvas.a.width)
        this.width = getRandomInt(auroraMinWidth, auroraMaxWidth)
    }
  }
}

class Star {
  constructor() {
    this.x = getRandomInt(0, canvas.a.width)
    this.y = getRandomInt(0, canvas.a.width)
    this.size = getRandomInt(starMinSize, starMaxSize)
    this.width = this.size / 2
    this.height = this.size / 2
    this.opacity = getRandomInt(1, 10)
    this.ttl = getRandomInt(minTTL, maxTTL)
    this.life = 0
  }
  draw() {
    ctx.b.save()
    ctx.b.fillStyle = `rgba(255, 255, 255,${fadeInOut(this.life, this.ttl)/2})`
    // ctx.b.opacity = this.opacity / 10
    ctx.b.fillRect(this.x, this.y, this.width, this.height)
    ctx.b.restore()
  }
  update() {
		this.life++
    if(this.life > this.ttl){
    	this.life = 0
        this.x = getRandomInt(0, canvas.a.width)
        this.y = getRandomInt(0, canvas.a.height)
        this.width = getRandomInt(starMinSize, starMaxSize) / 2
        this.height = getRandomInt(starMinSize, starMaxSize) / 2
    }
  }
}

