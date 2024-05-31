import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()

	useEffect(() => {
		let lng = localStorage.getItem('i18nextLng')
		if (lng) i18n.changeLanguage(lng)
	}, [])

	const handleLanguageChange = (lng) => {
		i18n.changeLanguage(lng)
		localStorage.setItem('i18nextLng', lng)
	}

	return (
		<div className='language-switcher'>
			<select
				value={i18n.language}
				onChange={(e) => handleLanguageChange(e.target.value)}
				className='bg-primary text-white border border-white rounded-md p-1'
			>
				<option value='en'>en</option>
				<option value='uk'>uk</option>
			</select>
		</div>
	)
}

export default LanguageSwitcher
