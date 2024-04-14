import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import Layout from '../../components/Layout'
import { useSendPasswordResetEmailMutation } from '../../features/auth/authApi'

const PasswordResetRequest = () => {
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')

	const [sendEmail, { isLoading }] = useSendPasswordResetEmailMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()
        setError(null)
        
		try {
			await sendEmail(email).unwrap()
			setMessage(
				'If an account with that email exists, we sent an email to reset your password.'
			)
		} catch (err) {
			setError(
				'Failed to send password reset email. Please, try again later.'
			)
		}
	}

	return (
		<Layout>
			<div className='flex-1 flex'>
				<div className='w-full xl:w-1/2 p-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<div>
							<h1 className='mt-6 text-center text-3xl font-extrabold text-secondary-text'>
								Password Reset
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
										Email address
									</label>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										required
										className='appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
										placeholder='Enter your email'
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
									Send Reset Email
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
								Remember your password?
								<Link
									to='/auth/signin'
									className='text-accent ml-2 hover:underline'
								>
									Sign in
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
