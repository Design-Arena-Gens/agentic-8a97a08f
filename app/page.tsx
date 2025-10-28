'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'

type PatternType = 'grid' | 'hexagon' | 'circles' | 'waves' | 'triangles' | 'stars' | 'diamonds' | 'spirals'

interface PatternConfig {
  type: PatternType
  size: number
  spacing: number
  color1: string
  color2: string
  strokeWidth: number
  rotation: number
  scale: number
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [config, setConfig] = useState<PatternConfig>({
    type: 'grid',
    size: 50,
    spacing: 10,
    color1: '#FF6B6B',
    color2: '#4ECDC4',
    strokeWidth: 2,
    rotation: 0,
    scale: 1,
  })
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    drawPattern()
  }, [config])

  const drawPattern = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Apply transformations
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((config.rotation * Math.PI) / 180)
    ctx.scale(config.scale, config.scale)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    ctx.lineWidth = config.strokeWidth

    switch (config.type) {
      case 'grid':
        drawGrid(ctx, canvas)
        break
      case 'hexagon':
        drawHexagons(ctx, canvas)
        break
      case 'circles':
        drawCircles(ctx, canvas)
        break
      case 'waves':
        drawWaves(ctx, canvas)
        break
      case 'triangles':
        drawTriangles(ctx, canvas)
        break
      case 'stars':
        drawStars(ctx, canvas)
        break
      case 'diamonds':
        drawDiamonds(ctx, canvas)
        break
      case 'spirals':
        drawSpirals(ctx, canvas)
        break
    }

    ctx.restore()
  }

  const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const step = config.size + config.spacing
    for (let x = 0; x < canvas.width; x += step) {
      for (let y = 0; y < canvas.height; y += step) {
        ctx.fillStyle = (x + y) % (step * 2) === 0 ? config.color1 : config.color2
        ctx.fillRect(x, y, config.size, config.size)
        ctx.strokeStyle = '#000000'
        ctx.strokeRect(x, y, config.size, config.size)
      }
    }
  }

  const drawHexagons = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const radius = config.size / 2
    const height = radius * Math.sqrt(3)
    const step = (radius * 3 / 2) + config.spacing

    for (let x = 0; x < canvas.width + radius; x += step) {
      for (let y = 0; y < canvas.height + height; y += height * 2 + config.spacing) {
        const offsetX = (y / (height * 2 + config.spacing)) % 2 === 0 ? 0 : step / 2
        drawHexagon(ctx, x + offsetX, y, radius, config.color1)
        drawHexagon(ctx, x + offsetX, y + height + config.spacing, radius, config.color2)
      }
    }
  }

  const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const hx = x + radius * Math.cos(angle)
      const hy = y + radius * Math.sin(angle)
      if (i === 0) ctx.moveTo(hx, hy)
      else ctx.lineTo(hx, hy)
    }
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeStyle = '#000000'
    ctx.stroke()
  }

  const drawCircles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const step = config.size + config.spacing
    const radius = config.size / 2

    for (let x = radius; x < canvas.width; x += step) {
      for (let y = radius; y < canvas.height; y += step) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = (x + y) % (step * 2) === 0 ? config.color1 : config.color2
        ctx.fill()
        ctx.strokeStyle = '#000000'
        ctx.stroke()
      }
    }
  }

  const drawWaves = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const amplitude = config.size / 2
    const wavelength = config.size + config.spacing
    const step = 20

    for (let y = 0; y < canvas.height; y += amplitude * 2 + config.spacing) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      for (let x = 0; x <= canvas.width; x += step) {
        const wave = y + amplitude * Math.sin((x / wavelength) * Math.PI * 2)
        ctx.lineTo(x, wave)
      }
      ctx.strokeStyle = config.color1
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, y + amplitude + config.spacing / 2)
      for (let x = 0; x <= canvas.width; x += step) {
        const wave = y + amplitude + config.spacing / 2 + amplitude * Math.cos((x / wavelength) * Math.PI * 2)
        ctx.lineTo(x, wave)
      }
      ctx.strokeStyle = config.color2
      ctx.stroke()
    }
  }

  const drawTriangles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const step = config.size + config.spacing
    const height = (config.size * Math.sqrt(3)) / 2

    for (let x = 0; x < canvas.width; x += step) {
      for (let y = 0; y < canvas.height; y += height + config.spacing) {
        const isUp = ((x + y) / step) % 2 === 0
        ctx.beginPath()
        if (isUp) {
          ctx.moveTo(x + config.size / 2, y)
          ctx.lineTo(x, y + height)
          ctx.lineTo(x + config.size, y + height)
        } else {
          ctx.moveTo(x, y)
          ctx.lineTo(x + config.size, y)
          ctx.lineTo(x + config.size / 2, y + height)
        }
        ctx.closePath()
        ctx.fillStyle = isUp ? config.color1 : config.color2
        ctx.fill()
        ctx.strokeStyle = '#000000'
        ctx.stroke()
      }
    }
  }

  const drawStars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const step = config.size + config.spacing
    const outerRadius = config.size / 2
    const innerRadius = outerRadius / 2.5

    for (let x = outerRadius; x < canvas.width; x += step) {
      for (let y = outerRadius; y < canvas.height; y += step) {
        drawStar(ctx, x, y, 5, outerRadius, innerRadius, (x + y) % (step * 2) === 0 ? config.color1 : config.color2)
      }
    }
  }

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string) => {
    let rot = (Math.PI / 2) * 3
    let x = cx
    let y = cy
    const step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeStyle = '#000000'
    ctx.stroke()
  }

  const drawDiamonds = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const step = config.size + config.spacing

    for (let x = 0; x < canvas.width; x += step) {
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath()
        ctx.moveTo(x + config.size / 2, y)
        ctx.lineTo(x + config.size, y + config.size / 2)
        ctx.lineTo(x + config.size / 2, y + config.size)
        ctx.lineTo(x, y + config.size / 2)
        ctx.closePath()
        ctx.fillStyle = (x + y) % (step * 2) === 0 ? config.color1 : config.color2
        ctx.fill()
        ctx.strokeStyle = '#000000'
        ctx.stroke()
      }
    }
  }

  const drawSpirals = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const step = config.size + config.spacing
    const turns = 3

    for (let x = config.size / 2; x < canvas.width; x += step) {
      for (let y = config.size / 2; y < canvas.height; y += step) {
        ctx.beginPath()
        const maxRadius = config.size / 2
        for (let angle = 0; angle < turns * Math.PI * 2; angle += 0.1) {
          const radius = (angle / (turns * Math.PI * 2)) * maxRadius
          const sx = x + radius * Math.cos(angle)
          const sy = y + radius * Math.sin(angle)
          if (angle === 0) ctx.moveTo(sx, sy)
          else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = (x + y) % (step * 2) === 0 ? config.color1 : config.color2
        ctx.stroke()
      }
    }
  }

  const generateFromPrompt = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    const lowerPrompt = prompt.toLowerCase()
    const newConfig: Partial<PatternConfig> = {}

    // Pattern type detection
    if (lowerPrompt.includes('grid') || lowerPrompt.includes('square')) newConfig.type = 'grid'
    else if (lowerPrompt.includes('hex')) newConfig.type = 'hexagon'
    else if (lowerPrompt.includes('circle') || lowerPrompt.includes('dot')) newConfig.type = 'circles'
    else if (lowerPrompt.includes('wave') || lowerPrompt.includes('wavy')) newConfig.type = 'waves'
    else if (lowerPrompt.includes('triangle')) newConfig.type = 'triangles'
    else if (lowerPrompt.includes('star')) newConfig.type = 'stars'
    else if (lowerPrompt.includes('diamond')) newConfig.type = 'diamonds'
    else if (lowerPrompt.includes('spiral')) newConfig.type = 'spirals'

    // Size detection
    if (lowerPrompt.includes('small')) newConfig.size = 30
    else if (lowerPrompt.includes('large') || lowerPrompt.includes('big')) newConfig.size = 80
    else if (lowerPrompt.includes('medium')) newConfig.size = 50

    // Spacing detection
    if (lowerPrompt.includes('tight') || lowerPrompt.includes('close')) newConfig.spacing = 2
    else if (lowerPrompt.includes('loose') || lowerPrompt.includes('far')) newConfig.spacing = 20

    // Color detection
    if (lowerPrompt.includes('red')) newConfig.color1 = '#FF0000'
    if (lowerPrompt.includes('blue')) newConfig.color2 = '#0000FF'
    if (lowerPrompt.includes('green')) {
      if (lowerPrompt.includes('red')) newConfig.color2 = '#00FF00'
      else newConfig.color1 = '#00FF00'
    }
    if (lowerPrompt.includes('yellow')) newConfig.color1 = '#FFD700'
    if (lowerPrompt.includes('purple')) newConfig.color1 = '#9B59B6'
    if (lowerPrompt.includes('orange')) newConfig.color1 = '#FF8C00'
    if (lowerPrompt.includes('pink')) newConfig.color1 = '#FF69B4'
    if (lowerPrompt.includes('black')) newConfig.color1 = '#000000'

    // Rotation detection
    if (lowerPrompt.includes('rotate') || lowerPrompt.includes('diagonal')) {
      newConfig.rotation = 45
    }

    // Stroke detection
    if (lowerPrompt.includes('thick')) newConfig.strokeWidth = 4
    else if (lowerPrompt.includes('thin')) newConfig.strokeWidth = 1

    setConfig(prev => ({ ...prev, ...newConfig }))
    setIsGenerating(false)
  }

  const downloadPattern = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `pattern-${config.type}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const randomize = () => {
    const types: PatternType[] = ['grid', 'hexagon', 'circles', 'waves', 'triangles', 'stars', 'diamonds', 'spirals']
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788']

    setConfig({
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.floor(Math.random() * 60) + 30,
      spacing: Math.floor(Math.random() * 20) + 5,
      color1: colors[Math.floor(Math.random() * colors.length)],
      color2: colors[Math.floor(Math.random() * colors.length)],
      strokeWidth: Math.floor(Math.random() * 3) + 1,
      rotation: Math.floor(Math.random() * 360),
      scale: Math.random() * 0.5 + 0.75,
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pattern Maker Agent</h1>
      <p className={styles.subtitle}>AI-Powered Precise Pattern Generator</p>

      <div className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.promptSection}>
            <label className={styles.label}>AI Prompt Generator</label>
            <textarea
              className={styles.textarea}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your pattern... (e.g., 'large blue hexagons with tight spacing' or 'red stars rotated 45 degrees')"
              rows={3}
            />
            <button
              className={styles.generateBtn}
              onClick={generateFromPrompt}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? 'Generating...' : '✨ Generate from Prompt'}
            </button>
          </div>

          <div className={styles.divider} />

          <div className={styles.controlGroup}>
            <label className={styles.label}>Pattern Type</label>
            <select
              className={styles.select}
              value={config.type}
              onChange={(e) => setConfig({ ...config, type: e.target.value as PatternType })}
            >
              <option value="grid">Grid</option>
              <option value="hexagon">Hexagons</option>
              <option value="circles">Circles</option>
              <option value="waves">Waves</option>
              <option value="triangles">Triangles</option>
              <option value="stars">Stars</option>
              <option value="diamonds">Diamonds</option>
              <option value="spirals">Spirals</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Size: {config.size}px</label>
            <input
              type="range"
              className={styles.slider}
              min="20"
              max="100"
              value={config.size}
              onChange={(e) => setConfig({ ...config, size: parseInt(e.target.value) })}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Spacing: {config.spacing}px</label>
            <input
              type="range"
              className={styles.slider}
              min="0"
              max="30"
              value={config.spacing}
              onChange={(e) => setConfig({ ...config, spacing: parseInt(e.target.value) })}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Stroke Width: {config.strokeWidth}px</label>
            <input
              type="range"
              className={styles.slider}
              min="0.5"
              max="5"
              step="0.5"
              value={config.strokeWidth}
              onChange={(e) => setConfig({ ...config, strokeWidth: parseFloat(e.target.value) })}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Rotation: {config.rotation}°</label>
            <input
              type="range"
              className={styles.slider}
              min="0"
              max="360"
              value={config.rotation}
              onChange={(e) => setConfig({ ...config, rotation: parseInt(e.target.value) })}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Scale: {config.scale.toFixed(2)}</label>
            <input
              type="range"
              className={styles.slider}
              min="0.5"
              max="2"
              step="0.1"
              value={config.scale}
              onChange={(e) => setConfig({ ...config, scale: parseFloat(e.target.value) })}
            />
          </div>

          <div className={styles.colorGroup}>
            <div className={styles.colorControl}>
              <label className={styles.label}>Color 1</label>
              <input
                type="color"
                className={styles.colorInput}
                value={config.color1}
                onChange={(e) => setConfig({ ...config, color1: e.target.value })}
              />
            </div>
            <div className={styles.colorControl}>
              <label className={styles.label}>Color 2</label>
              <input
                type="color"
                className={styles.colorInput}
                value={config.color2}
                onChange={(e) => setConfig({ ...config, color2: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={randomize}>
              🎲 Randomize
            </button>
            <button className={styles.buttonPrimary} onClick={downloadPattern}>
              💾 Download PNG
            </button>
          </div>
        </div>

        <div className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className={styles.canvas}
          />
        </div>
      </div>
    </div>
  )
}
