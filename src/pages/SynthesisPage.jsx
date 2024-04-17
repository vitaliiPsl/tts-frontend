import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import Audio from '../components/audio/Audio'
import { useSynthesizeMutation } from '../features/synthesis/synthesisApi'
import { useLocation } from 'react-router-dom'

const SynthesisPage = () => {
	const location = useLocation()
	const [text, setText] = useState('')

	const [audioControlVisible, setAudioControlVisible] = useState(false)
	const [samples, setSamples] = useState(null)
	const [samplingRate, setSamplingRate] = useState(null)

	const [synthesizeSpeech, { data, isLoading, error }] =
		useSynthesizeMutation()

	useEffect(() => {
		if (location.state?.text) {
			setText(location.state.text)
		}
	}, [location])

	useEffect(() => {
		if (data) {
			const { samples, sampling_rate } = data
			setSamples(samples)
			setSamplingRate(sampling_rate)
			setAudioControlVisible(true)
		}
	}, [data])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setAudioControlVisible(false)
		synthesizeSpeech(text)
	}

	return (
		<Layout>
			<div className='flex-1 flex flex-col items-center justify-center gap-6 bg-background p-4'>
				<div className='max-w-2xl w-full flex flex-col text-center bg-primary-text rounded-lg shadow-md p-4'>
					<form
						className='flex flex-col gap-4'
						onSubmit={handleSubmit}
					>
						<label
							htmlFor='text'
							className='block text-lg font-medium text-gray-700'
						>
							Enter Text for Synthesis
						</label>

						{/* text input */}
						<textarea
							name='text'
							value={text}
							rows='6'
							required
							placeholder='Type something...'
							onChange={(e) => setText(e.target.value)}
							className='mt-1 p-2 w-full border border-secondary rounded-md focus:border-accent focus:ring-accent outline-accent'
						></textarea>

						<div className='mt-4'>
							<button
								type='submit'
								disabled={isLoading}
								className='w-full flex justify-center min-w-28 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
							>
								{isLoading ? 'Cooking...' : 'Synthesize'}
							</button>
						</div>
					</form>
				</div>

				{error && (
					<div className='text-center py-10'>
						<p className='text-lg text-gray-500'>
							Something went wrong. Please, try again later.
						</p>
					</div>
				)}

				{/* play, waveform, download button */}
				{audioControlVisible && (
					<div className='max-w-2xl w-full flex flex-col text-center bg-white rounded-lg shadow-md p-4'>
						<Audio samples={samples} sampleRate={samplingRate} />
					</div>
				)}
			</div>
		</Layout>
	)
}

export default SynthesisPage
