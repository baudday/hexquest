const alpha = 2 * Math.PI / 6 // 2π / 6 = 360º

const draw = (ctx, x, y, size) => {
  ctx.beginPath()

  for (let i = 0; i < 6; i++) {
    const vertexX = x + size * Math.cos(alpha * i)
    const vertexY = y + size * Math.sin(alpha * i)
    ctx.lineTo(vertexX, vertexY)
  }

  ctx.closePath()
  ctx.stroke()
}

const grid = (ctx, width, height, hexSize) => {
  for (let q = 0; q < width; q++) {
    for (let r = 0; r < height; r++) {
      const { x, y } = axialToPixel(q, r - Math.floor(q / 2), hexSize)

      draw(ctx, x, y, hexSize)
    }
  }
}

const axialToPixel = (q, r, size) => {
  return {
    x: size * (3 / 2 * q) + size,
    y: size * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r) + size
  }
}

export default function (canvas, size) {
  const ctx = canvas.getContext('2d')
  ctx.globalAlpha = 1

  return {
    draw: (x, y) => draw(ctx, x, y, size),
    grid: (width, height) => grid(ctx, width, height, size)
  }
}
