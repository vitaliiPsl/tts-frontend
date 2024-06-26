import React, { useState, useEffect } from 'react'
import {
	useDeleteModelMutation,
	useLoadModelsQuery,
	useSaveModelMutation,
	useUpdateModelMutation,
} from '../features/models/modelsApi'

import { languageFlags } from '../utils/languages'
import { useTranslation } from 'react-i18next'

import Layout from '../components/Layout'

const ManageModelsPage = () => {
	const { t } = useTranslation()
	const [url, setUrl] = useState('')
	const [name, setName] = useState('')
	const [language, setLanguage] = useState('')

	const [selectedModelId, setSelectedModelId] = useState(null)

	const { data: models, error, isLoading, isSuccess } = useLoadModelsQuery()

	const [saveModelMutation] = useSaveModelMutation()
	const [updateModelMutation] = useUpdateModelMutation()
	const [deleteModelMutation] = useDeleteModelMutation()

	const handleSelectModel = (model) => {
		setSelectedModelId(model.id)
		setUrl(model.url)
		setName(model.name)
		setLanguage(model.language)
	}

	const handleCancel = () => {
		setSelectedModelId(null)
		setName('')
		setLanguage('')
		setUrl('')
	}

	const handleSaveModel = (e) => {
		e.preventDefault()

		if (selectedModelId) {
			updateModel(selectedModelId, url, name, language)
		} else {
			saveModel(url, name, language)
		}

		handleCancel()
	}

	const saveModel = async (url, name, language) => {
		try {
			await saveModelMutation({ url, name, language }).unwrap()
		} catch (err) {
			console.log(t('save_model_error'))
		}
	}

	const updateModel = async (id, url, name, language) => {
		try {
			await updateModelMutation({
				id,
				data: { url, name, language },
			}).unwrap()
		} catch (err) {
			console.log(t('update_model_error'))
		}
	}

	const handleDeleteModel = (id) => {
		if (id && window.confirm(t('delete_model_confirm'))) {
			deleteModel(id)
		}
	}

	const deleteModel = async (id) => {
		try {
			await deleteModelMutation(id).unwrap()
		} catch (err) {
			console.log(t('delete_model_error'))
		}
	}

	return (
		<Layout>
			<div className='flex-1 flex flex-col items-center justify-center gap-6 bg-background p-4'>
				<h2 className='text-2xl font-semibold text-primary'>
					{t('manage_models')}
				</h2>

				<div className='max-w-3xl w-full mb-4 flex flex-col text-center bg-primary-text rounded-lg shadow-md p-4'>
					<form
						onSubmit={handleSaveModel}
						className='flex flex-col gap-2'
					>
						<div className='flex items-center'>
							<input
								type='url'
								value={url}
								required
								onChange={(e) => setUrl(e.target.value)}
								placeholder={t('model_url_placeholder')}
								className='appearance-none rounded-sm relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
							/>
						</div>

						<div className='flex items-center'>
							<input
								type='text'
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
								placeholder={t('model_name_placeholder')}
								className='appearance-none rounded-sm relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
							/>
						</div>

						<div className='relative flex items-center'>
							<input
								type='text'
								value={language}
								required
								onChange={(e) => setLanguage(e.target.value)}
								placeholder={t('model_language_placeholder')}
								className='appearance-none rounded-sm relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
							/>
							<span className='absolute right-4'>
								{languageFlags[language] || ''}
							</span>
						</div>

						{selectedModelId ? (
							<div className='flex items-center gap-2'>
								<button
									type='submit'
									className='w-full flex justify-center py-2 px-4 border border-primary text-md font-medium rounded-md text-primary bg-background hover:text-background hover:border-accent hover:bg-accent focus:outline-none'
								>
									{t('update')}
								</button>
								<button
									onClick={handleCancel}
									className='w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none'
								>
									{t('cancel')}
								</button>
							</div>
						) : (
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none'
							>
								{t('create')}
							</button>
						)}
					</form>
				</div>

				<div className='max-w-3xl w-full'>
					{isLoading && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								{t('loading_models')}
							</p>
						</div>
					)}

					{error && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								{t('loading_models_error')}
							</p>
						</div>
					)}

					{isSuccess && (!models || models.length === 0) && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								{t('no_models')}
							</p>
						</div>
					)}

					{models && models.length > 0 && (
						<div className='w-full px-2 py-2 bg-white rounded-md shadow-md'>
							{models.map((model) => (
								<li
									key={model.id}
									className={`px-2 py-2 rounded-md flex justify-between items-center gap-4 ${
										selectedModelId === model.id &&
										'bg-primary text-white'
									}`}
								>
									<span>
										{model.url} - {model.name} -{' '}
										{model.language}
									</span>

									<div className='flex gap-2'>
										<button
											onClick={() =>
												handleSelectModel(model)
											}
											className='flex justify-center py-2 px-4 border border-primary text-md font-medium rounded-md text-primary bg-background hover:text-background hover:border-accent hover:bg-accent focus:outline-none'
										>
											{t('update')}
										</button>

										<button
											className={`flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none focus:ring-accent ${
												selectedModelId === model.id &&
												'border-white hover:border-accent'
											}`}
											onClick={() =>
												handleDeleteModel(model.id)
											}
										>
											{t('delete')}
										</button>
									</div>
								</li>
							))}
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default ManageModelsPage
