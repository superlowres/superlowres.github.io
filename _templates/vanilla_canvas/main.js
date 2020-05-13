/**
 * 	Example HTML5 canvas
 */

const TAU    = Math.PI * 2

const canvas = document.querySelector('canvas')
const ctx    = canvas.getContext('2d')

requestAnimationFrame(loop)

function loop(time){
	requestAnimationFrame(loop)

	// resize canvas
	const ratio  = window.devicePixelRatio
	const width  = ctx.canvas.clientWidth
	const height = ctx.canvas.clientHeight
	const cw = Math.floor(width * ratio)
	const ch = Math.floor(height * ratio)
	if (ctx.canvas.width != cw || ctx.canvas.height != ch ){
	    ctx.canvas.width  = cw
	    ctx.canvas.height = ch
	}

	// save transform
	ctx.save()

	// scale canvas (HiDPI)
	ctx.scale(ratio, ratio)

	// clear background
	// ctx.clearRect(0, 0, width, height)

	// rect
	ctx.fillStyle = 'rgb(255,255,255)'
	ctx.fillRect(20, 20, 100, 100)
	ctx.strokeStyle = 'rgb(0,0,0)'
	ctx.strokeRect(20, 20, 100, 100)

	// circle
	ctx.beginPath()
	ctx.arc(180, 70, 50, 0, TAU, false) // x, y, radius, start a., end a., dir
	ctx.fill()
	ctx.stroke()

	if (pointer.pressed){
		ctx.beginPath()
		ctx.moveTo(pointer.px, pointer.py)
		ctx.lineTo(pointer.x, pointer.y)
		ctx.stroke()
	}

	ctx.restore()

	// previous position
	pointer.px = pointer.x
	pointer.py = pointer.y

}

// pointer events
const pointer = {
	x  : 0,
	y  : 0,
	px : 0,
	py : 0,
	pressed : false
}

canvas.addEventListener('mousemove', e => {
	pointer.x = e.offsetX
	pointer.y = e.offsetY
})

canvas.addEventListener('mousedown', e => {
	pointer.pressed = true
})

canvas.addEventListener('mouseup', e => {
	pointer.pressed = false
})




