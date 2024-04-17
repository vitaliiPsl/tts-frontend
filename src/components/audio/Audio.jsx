import React, { useState, useEffect } from 'react'
import { WaveFile } from 'wavefile'

import { IoPlayCircleOutline, IoDownloadOutline } from 'react-icons/io5'
import AudioVisualizer from './AudioVisualizer'

const Audio = ({ samples, sampleRate }) => {
	const [audioContext, setAudioContext] = useState(null)

	useEffect(() => {
		setAudioContext(new AudioContext())
	}, [])

	const playAudio = () => {
		if (audioContext && !audioContext.resume()) {
			audioContext.resume()
		}

		const audioBuffer = audioContext.createBuffer(
			1,
			samples.length,
			sampleRate
		)
		const channelData = audioBuffer.getChannelData(0)
		channelData.set(samples)

		const source = audioContext.createBufferSource()
		source.buffer = audioBuffer
		source.connect(audioContext.destination)
		source.start()
	}

	const saveAsWav = () => {
		let wav = new WaveFile()
		const data = new Int16Array(samples.map((n) => n * 32767))

		wav.fromScratch(1, 22050, '16', data)

		const blob = new Blob([wav.toBuffer()], { type: 'audio/wav' })
		const url = URL.createObjectURL(blob)

		const anchor = document.createElement('a')
		anchor.href = url
		anchor.download = 'output.wav'

		document.body.appendChild(anchor)
		anchor.click()
		document.body.removeChild(anchor)

		URL.revokeObjectURL(url)
	}

	return (
		<div className='flex content-center items-center gap-3'>
			<button
				onClick={playAudio}
				className='bg-primary p-1 rounded-md flex items-center justify-center duration-100 hover:bg-accent'
				aria-label='Play audio'
			>
				<IoPlayCircleOutline className='text-primary-text text-4xl' />
			</button>

			<AudioVisualizer samples={samples} />

			<button
				onClick={saveAsWav}
				className='bg-primary p-1 rounded-md flex items-center justify-center duration-100 hover:bg-accent'
				aria-label='Play audio'
			>
				<IoDownloadOutline className='text-primary-text text-4xl' />
			</button>
		</div>
	)
}

export default Audio
