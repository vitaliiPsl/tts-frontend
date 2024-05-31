import React from 'react'

import { useTranslation } from 'react-i18next'

const Footer = () => {
	const { t } = useTranslation()

	return (
		<footer className='bg-primary'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center text-primary-text py-4'>
					<p>
						{t('footer_text', { year: new Date().getFullYear() })}
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
