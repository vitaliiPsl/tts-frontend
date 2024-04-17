import React, { useEffect, useState, useRef } from 'react'

const AudioVisualizer = ({ samples, options = [] }) => {
	const canvasRef = useRef(null)

	const [config, setConfig] = useState({
		backgroundColor: 'white',
		waveformColor: 'black',
		playedWaveformColor: 'orange',

		barWidth: 2,
		barSpacing: 1,

		...options,
	})

	useEffect(() => {
		window.addEventListener('resize', resizeCanvas)

        drawWaveform(samples)

		return () => window.removeEventListener('resize', resizeCanvas)
	}, [])

	const resizeCanvas = () => {
		const canvas = canvasRef.current
		canvas.width = canvas.parentElement.clientWidth
		canvas.height = canvas.parentElement.clientHeight
	}

	const drawWaveform = (samples, playbackPosition = 0) => {
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		const { width, height } = canvas

		context.fillStyle = config.backgroundColor
		context.fillRect(0, 0, width, height)

		drawBars(samples, playbackPosition, width, height, context)
	}

	const drawBars = (samples, playbackPosition, width, height, context) => {
		const barWidth = config.barWidth
		const barSpacing = config.barSpacing

		const numBars = Math.floor(width / (barWidth + barSpacing))
		const step =
			samples.length < numBars ? 1 : Math.ceil(samples.length / numBars)

		const playbackBars = playbackPosition / step

		let maxAvg = 0
		let avgArray = new Array(numBars).fill(0)
		for (let i = 0; i < numBars; i++) {
			let avg = 0
			for (let j = 0; j < step; j++) {
				avg += Math.abs(samples[i * step + j])
			}

			avg /= step
			avgArray[i] = avg

			if (avg > maxAvg) maxAvg = avg
		}

		const scaleMultiplier = (height * 0.9) / maxAvg
		for (let i = 0; i < numBars; i++) {
			const barHeight = Math.max(1, avgArray[i] * scaleMultiplier)

			const x = i * (barWidth + barSpacing)
			const y = height / 2 - barHeight / 2

			context.fillStyle =
				i < playbackBars
					? config.playedWaveformColor
					: config.waveformColor

			context.beginPath()
			context.rect(x, y, barWidth, barHeight)
			context.closePath()
			context.fill()
		}
	}

	return (
		<canvas
			ref={canvasRef}
			className='w-full h-16 border border-gray-200'
		></canvas>
	)
}

export default AudioVisualizer
