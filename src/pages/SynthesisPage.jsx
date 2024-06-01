import React, { useState, useEffect } from 'react'

import { languageFlags } from '../utils/languages'

import { useSynthesizeMutation } from '../features/synthesis/synthesisApi'
import { useLocation } from 'react-router-dom'
import { useLoadModelsQuery } from '../features/models/modelsApi'

import { useTranslation } from 'react-i18next'

import Layout from '../components/Layout'
import Audio from '../components/audio/Audio'

const SynthesisPage = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const [text, setText] = useState('')
	const [modelId, setModelId] = useState(null)

	const [audioControlVisible, setAudioControlVisible] = useState(false)
	const [samples, setSamples] = useState(null)
	const [samplingRate, setSamplingRate] = useState(null)

	const {
		data: models,
		error: modelsError,
		isLoading: modelsLoading,
		isSuccess: modelsLoaded,
	} = useLoadModelsQuery()

	const [
		synthesizeSpeech,
		{
			data: synthesisData,
			isLoading: synthesisLoading,
			error: synthesisError,
		},
	] = useSynthesizeMutation()

	useEffect(() => {
		if (location.state?.text) {
			setText(location.state.text)
		}
	}, [location])

	useEffect(() => {
		if (synthesisData) {
			const { samples, sampling_rate } = synthesisData
			setSamples(samples)
			setSamplingRate(sampling_rate)
			setAudioControlVisible(true)
		}
	}, [synthesisData])

	useEffect(() => {
		if (models && models.length > 0) {
			setModelId(models[0].id)
		}
	}, [models])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setAudioControlVisible(false)
		synthesizeSpeech({ modelId: modelId, text })
	}

	const handleModelSelect = (modelId) => {
		setModelId(modelId)
	}

	return (
		<Layout>
			<div className='flex-1 flex flex-col items-center justify-center gap-6 p-4'>
				{/* Model selection list */}
				<div className='max-w-3xl w-full text-center flex flex-col gap-3'>
					<h2 className='text-2xl font-semibold text-primary'>
						{t('available_models')}
					</h2>

					<div className='flex items-center gap-4 flex-wrap'>
						{modelsLoading && (
							<div className='w-full text-center py-4'>
								<p className='text-lg text-gray-500'>
									{t('loading_models')}
								</p>
							</div>
						)}

						{modelsError && (
							<div className='w-full text-center py-4'>
								<p className='text-lg text-gray-500'>
									{t('loading_models_error')}
								</p>
							</div>
						)}

						{modelsLoaded && (!models || models.length === 0) && (
							<div className='w-full text-center py-4'>
								<p className='text-lg text-gray-500'>
									{t('no_models')}
								</p>
							</div>
						)}

						{models &&
							models.length > 0 &&
							models.map((model) => (
								<button
									key={model.id}
									onClick={() => handleModelSelect(model.id)}
									className={`px-3 py-3 rounded-md border text-primary border-primary hover:bg-accent hover:text-background hover:border-accent ${
										modelId === model.id &&
										'bg-primary text-white'
									}`}
								>
									{model.name} |{' '}
									{languageFlags[model.language] || ''}
								</button>
							))}
					</div>
				</div>

				{modelsLoaded && models && models.length > 0 && (
					<div className='max-w-3xl w-full flex flex-col text-center bg-primary-text rounded-lg shadow-md p-4'>
						<form
							className='flex flex-col gap-4'
							onSubmit={handleSubmit}
						>
							<label
								htmlFor='text-field'
								className='block text-lg font-medium text-gray-700'
							>
								{t('enter_text')}
							</label>

							{/* text input */}
							<textarea
								id='text-field'
								name='text-field'
								value={text}
								rows='6'
								required
								placeholder={t('text_placeholder')}
								onChange={(e) => setText(e.target.value)}
								className='mt-1 p-2 w-full border border-secondary rounded-md focus:border-accent focus:ring-accent outline-accent'
							></textarea>

							<div className='mt-4'>
								<button
									type='submit'
									disabled={synthesisLoading}
									className='w-full flex justify-center min-w-28 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
								>
									{synthesisLoading
										? t('cooking')
										: t('synthesize_button')}
								</button>
							</div>
						</form>
					</div>
				)}

				{synthesisError && (
					<div className='text-center py-10'>
						<p className='text-lg text-gray-500'>
							{t('synthesis_error')}
						</p>
					</div>
				)}

				{audioControlVisible && (
					<div className='max-w-3xl w-full flex flex-col text-center bg-white rounded-lg shadow-md p-4'>
						<Audio samples={samples} sampleRate={samplingRate} />
					</div>
				)}
			</div>
		</Layout>
	)
}

export default SynthesisPage
