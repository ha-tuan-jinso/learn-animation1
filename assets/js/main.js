if (window.matchMedia('(min-width:769px)').matches){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show')
      }
    })
  },{
    threshold:0.3
  })

  document.querySelectorAll('.fade-up')
    .forEach(el => observer.observe(el))
}

const interactive = document.querySelector('.interactive')

if(interactive){
  const blobs = interactive.querySelectorAll('.blob')

  let mouseX = 0
  let mouseY = 0

  let currentX = 0
  let currentY = 0

  // lấy vị trí chuột
  interactive.addEventListener('mousemove', (e)=>{
    const rect = interactive.getBoundingClientRect()
    mouseX = e.clientX - rect.left - rect.width/2
    mouseY = e.clientY - rect.top - rect.height/2
  })

  // animation loop (mượt)
  function animate(){
    currentX += (mouseX - currentX) * 0.05
    currentY += (mouseY - currentY) * 0.05

    blobs.forEach((blob, i)=>{
      const speed = (i + 1) * 0.3

      blob.style.transform = `
        translate(${currentX * speed}px, ${currentY * speed}px)
      `
    })

    requestAnimationFrame(animate)
  }

  animate()
}

const sphere = document.getElementById('sphere')
const total = 30
const radius = 150

let items = []

// ===== create items =====
for(let i=0;i<total;i++){
  const theta = Math.acos(-1 + (2*i)/total)
  const phi = Math.sqrt(total * Math.PI) * theta

  const div = document.createElement('div')
  div.className = 'item'

  const img = document.createElement('img')
  img.src = `https://picsum.photos/200?random=${i}`

  div.appendChild(img)
  sphere.appendChild(div)

  items.push({ el: div, theta, phi })
}

// ===== animation =====
let angleX = 0
let angleY = 0

function render(){
  angleX += 0.002
  angleY += 0.003

  items.forEach(item=>{
    let x = radius * Math.sin(item.theta) * Math.cos(item.phi)
    let y = radius * Math.sin(item.theta) * Math.sin(item.phi)
    let z = radius * Math.cos(item.theta)

    let x1 = x * Math.cos(angleY) - z * Math.sin(angleY)
    let z1 = x * Math.sin(angleY) + z * Math.cos(angleY)

    let y1 = y * Math.cos(angleX) - z1 * Math.sin(angleX)
    let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX)

    const scale = (z2 + 300) / 600

    item.el.style.transform = `
      translate3d(${x1}px, ${y1}px, ${z2}px)
      scale(${scale})
    `

    item.el.style.opacity = scale*1.2
  })

  requestAnimationFrame(render)
}

render()

