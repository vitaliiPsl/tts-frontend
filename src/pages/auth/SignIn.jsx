import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../features/auth/authSlice'
import { useSignInMutation } from '../../features/auth/authApi'
import { validatePassword } from '../../utils/validator'
import { useTranslation } from 'react-i18next'

import { useNavigate, Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa'
import Layout from '../../components/Layout'

const SignIn = () => {
	const { t } = useTranslation()
	const auth = useSelector((state) => state.auth)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordVisible, setPasswordVisible] = useState(false)
	const [error, setError] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [signIn, { isSignInLoading }] = useSignInMutation()

	useEffect(() => {
		if (auth && auth.token) {
			navigate('/')
		}
	})

	const handlePasswordChange = (e) => {
		const password = e.target.value
		setPassword(password)
		setError('')
	}

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!email || email.length === 0) {
			setError(t('signin_page.provide_email'))
			return
		}

		const error = validatePassword(password)
		if (error != null) {
			setError(error)
			return
		}

		let credentials = { email, password }
		handleSignIn(credentials)
	}

	const handleSignIn = async (credentials) => {
		try {
			const data = await signIn(credentials).unwrap()

			let token = data?.token
			dispatch(setToken(token))

			navigate('/')
		} catch (err) {
			if (err.status === 401) {
				setError(t('signin_page.invalid_credentials'))
			} else {
				setError(t('signin_page.signin_failed'))
			}
		}
	}

	const handleSignInWithSSO = async (provider) => {
		window.location.href = `http://localhost:8080/v1/auth/sso/${provider}`
	}

	return (
		<Layout>
			<div className='flex-1 flex'>
				{/* Form Container */}
				<div className='w-full xl:w-1/2 p-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<div>
							<h1 className='mt-6 text-center text-3xl font-extrabold text-secondary-text'>
								{t('signin_page.sign_in')}
							</h1>
						</div>

						<form
							className='mt-8 space-y-6'
							onSubmit={handleSubmit}
						>
							<div className='flex flex-col gap-4 rounded-md -space-y-px text-left'>
								<div>
									<label
										htmlFor='email'
										className='text-secondary-text block text-sm font-bold mb-2'
									>
										{t('signin_page.email_address')}
									</label>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										spellCheck='false'
										required
										className='appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
										placeholder={t(
											'signin_page.enter_your_email'
										)}
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div>
									<label
										htmlFor='password'
										className='text-secondary-text block text-sm font-bold mb-2 relative'
									>
										{t('signin_page.password')}
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
											autoComplete='current-password'
											spellCheck='false'
											required
											className='appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
											placeholder={t(
												'signin_page.enter_your_password'
											)}
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
								<div className='p-2'>
									{error && (
										<p className='text-sm text-red-600'>
											{error}
										</p>
									)}
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
								>
									{t('signin_page.sign_in_button')}
								</button>
							</div>
						</form>

						{/* Forgot Password Link */}
						<div className='text-center mt-4'>
							<p className='text-secondary-text'>
								{t('signin_page.forgot_password')}
								<Link
									to='/auth/password-reset-request'
									className='text-accent ml-2 hover:underline'
								>
									{t('signin_page.reset_it')}
								</Link>
							</p>
						</div>

						{/* SSO Block */}
						<div className='mt-4 flex flex-col items-center gap-4'>
							<p className='text-center text-secondary-text'>
								{t('signin_page.sign_in_with')}
							</p>
							{/* SSO Options */}
							<div className='flex justify-center items-center gap-4'>
								<button
									onClick={() =>
										handleSignInWithSSO('github')
									}
									className='bg-gray-900 p-3 rounded-md flex items-center justify-center duration-100 hover:bg-accent'
									aria-label='Sign in with GitHub'
								>
									<FaGithub className='text-white text-xl' />
								</button>
							</div>
						</div>

						{/* Sign up link */}
						<div className='text-center mt-4'>
							<p className='text-secondary-text'>
								{t('signin_page.no_account')}
								<Link
									to='/auth/signup'
									className='text-accent ml-2 hover:underline'
								>
									{t('signin_page.sign_up')}
								</Link>
							</p>
						</div>
					</div>
				</div>

				{/* Image Container */}
				<div
					className='hidden xl:block w-1/2 bg-cover bg-center'
					style={{ backgroundImage: `url("/images/signin.jpg")` }}
				></div>
			</div>
		</Layout>
	)
}

export default SignIn
