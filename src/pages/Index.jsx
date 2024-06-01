import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layout from '../components/Layout'

const Index = () => {
	const { t, i18n } = useTranslation()

	const user = useSelector((state) => state.auth.user)

	return (
		<Layout>
			<div className='p-4 flex-1 flex flex-col items-center justify-center text-secondary'>
				<h1 className='text-5xl font-bold mb-6 text-center'>
					{user && user.username
						? t('welcome_user', { username: user.username })
						: t('welcome')}
				</h1>

				<p className='text-lg mb-6 text-center'>{t('description')}</p>

				<div>
					<Link
						to='/synthesis'
						className='flex justify-center min-w-28 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
					>
						{t('synthesize_button')}
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export default Index
