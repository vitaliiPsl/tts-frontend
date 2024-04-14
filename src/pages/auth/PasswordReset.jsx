import React, { useState, useEffect } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../../features/auth/authApi'

import { FiEye, FiEyeOff } from 'react-icons/fi'
import Layout from '../../components/Layout'

const SetNewPassword = () => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const [passwordVisible, setPasswordVisible] = useState(false)
	const [newPasswordVisible, setNewPasswordVisible] = useState(false)

	const navigate = useNavigate()

	const [params] = useSearchParams()

	const [resetPassword, { isLoading }] = useResetPasswordMutation()

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible)
	}

	const handlePasswordChange = (e) => {
		const password = e.target.value
		setPassword(password)
		setError('')
	}

	const toggleNewPasswordVisibility = () => {
		setNewPasswordVisible(!newPasswordVisible)
	}

	const handleConfirmPasswordChange = (e) => {
		const confirmPassword = e.target.value
		setConfirmPassword(confirmPassword)
		setError('')
	}

	useEffect(() => {
		let token = params.get('token')
		if (!token) {
			navigate('/auth/reset-password')
		}
	}, [params])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError('Passwords do not match.')
			return
		}

		try {
			let token = params.get('token')
			await resetPassword({ token, password }).unwrap()
			navigate('/auth/signin')
		} catch (error) {
			console.log(error)
			setError('Failed to set the new password. Please try again.')
		}
	}

	return (
		<Layout>
			<div className='flex-1 flex'>
				<div className='w-full xl:w-1/2 p-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<div>
							<h1 className='mt-6 text-center text-3xl font-extrabold text-secondary-text'>
								Set new password
							</h1>
						</div>

						<form
							className='mt-8 space-y-6'
							onSubmit={handleSubmit}
						>
							<div className='flex flex-col gap-4 rounded-md -space-y-px text-left'>
								<div>
									<label
										htmlFor='password'
										className='text-secondary-text block text-sm font-bold mb-2'
									>
										New Password
									</label>
									<div className='relative'>
										<input
											id='password'
											name='password'
											type={
												passwordVisible
													? 'text'
													: 'password'
											}
											required
											className='appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary placeholder-secondary-text text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
											placeholder='Enter new password'
											value={password}
											onChange={handlePasswordChange}
										/>
										<button
											type='button'
											className='absolute z-50 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
											onClick={(e) =>
												togglePasswordVisibility(e)
											}
										>
											{passwordVisible ? (
												<FiEyeOff className='h-5 w-5 text-secondary-text' />
											) : (
												<FiEye className='h-5 w-5 text-secondary-text' />
											)}
										</button>
									</div>
								</div>
								<div>
									<label
										htmlFor='confirm-password'
										className='text-secondary-text block text-sm font-bold mb-2 relative'
									>
										Confirm New Password
									</label>
									<div className='relative'>
										<input
											id='confirm-password'
											name='confirmPassword'
											type={
												newPasswordVisible
													? 'text'
													: 'password'
											}
											required
											className='appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
											placeholder='Confirm new password'
											value={confirmPassword}
											onChange={
												handleConfirmPasswordChange
											}
										/>
										<button
											type='button'
											className='absolute z-50 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
											onClick={(e) =>
												toggleNewPasswordVisibility(e)
											}
										>
											{newPasswordVisible ? (
												<FiEyeOff className='h-5 w-5 text-secondary-text' />
											) : (
												<FiEye className='h-5 w-5 text-secondary-text' />
											)}
										</button>
									</div>
								</div>
								<div className='p-2'>
									{error && (
										<p className='text-sm text-red-600'>
											{error}
										</p>
									)}
									{success && (
										<p className='text-sm text-green-600'>
											Your password has been reset
											successfully!
										</p>
									)}
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
								>
									Set New Password
								</button>
							</div>
						</form>
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

export default SetNewPassword
