import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useSendPasswordResetEmailMutation } from '../../features/auth/authApi'

const PasswordResetRequest = () => {
	const { t } = useTranslation()
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')

	const [sendEmail, { isLoading }] = useSendPasswordResetEmailMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		try {
			await sendEmail(email).unwrap()
			setMessage(t('password_reset_request_page.reset_email_sent'))
		} catch (err) {
			setError(t('password_reset_request_page.reset_email_failed'))
		}
	}

	return (
		<Layout>
			<div className='flex-1 flex'>
				<div className='w-full xl:w-1/2 p-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<div>
							<h1 className='mt-6 text-center text-3xl font-extrabold text-secondary-text'>
								{t(
									'password_reset_request_page.password_reset'
								)}
							</h1>
						</div>

						<form
							className='mt-8 space-y-6'
							onSubmit={handleSubmit}
						>
							<div className='rounded-md -space-y-px text-left'>
								<div>
									<label
										htmlFor='email'
										className='text-secondary-text block text-sm font-bold mb-2'
									>
										{t(
											'password_reset_request_page.email_address'
										)}
									</label>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										required
										className='appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
										placeholder={t(
											'password_reset_request_page.enter_your_email'
										)}
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
								>
									{t(
										'password_reset_request_page.send_reset_email'
									)}
								</button>
							</div>

							{error && (
								<p className='text-sm text-red-600'>{error}</p>
							)}
							{message && (
								<p className='text-sm text-primary-black'>
									{message}
								</p>
							)}
						</form>

						<div className='text-center mt-4'>
							<p className='text-secondary-text'>
								{t(
									'password_reset_request_page.remember_password'
								)}
								<Link
									to='/auth/signin'
									className='text-accent ml-2 hover:underline'
								>
									{t('password_reset_request_page.sign_in')}
								</Link>
							</p>
						</div>
					</div>
				</div>

				<div
					className='hidden xl:block w-1/2 bg-cover bg-center'
					style={{ backgroundImage: `url("/images/signin.jpg")` }}
				></div>
			</div>
		</Layout>
	)
}

export default PasswordResetRequest
