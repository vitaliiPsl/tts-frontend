import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useSignUpMutation } from '../../features/auth/authApi'
import { validatePassword } from '../../utils/validator'
import { useTranslation } from 'react-i18next'

import { useNavigate, Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FaGoogle, FaApple, FaGithub } from 'react-icons/fa'
import Tooltip from '../../components/Tooltip'
import Layout from '../../components/Layout'

const SignUp = () => {
	const { t } = useTranslation()
	const auth = useSelector((state) => state.auth)

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordVisible, setPasswordVisible] = useState(false)
	const [error, setError] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [signUp, { isLoading }] = useSignUpMutation()

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

		if (!username || username.length === 0) {
			setError(t('signup_page.provide_username'))
			return
		}

		if (!email || email.length === 0) {
			setError(t('signup_page.provide_email'))
			return
		}

		const error = validatePassword(password)
		if (error != null) {
			setError(error)
			return
		}

		handleSignUp({ username, email, password })
	}

	const handleSignUp = async (user) => {
		try {
			await signUp(user).unwrap()
			navigate('/auth/email-verification-request', {
				state: { email: user.email },
			})
		} catch (err) {
			setError(t('signup_page.signup_failed'))
		}
	}

	const handleSignInWithSSO = async (provider) => {
		window.location.href = `http://localhost:8080/v1/auth/sso/${provider}`
	}

	return (
		<Layout>
			<div className='flex-1 flex'>
				{/* Image Container */}
				<div
					className='hidden xl:block w-1/2 bg-cover bg-center'
					style={{ backgroundImage: `url("/images/signup.jpg")` }}
				></div>

				{/* Form Container */}
				<div className='w-full xl:w-1/2 p-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<div>
							<h1 className='mt-6 text-center text-3xl font-extrabold text-secondary-text'>
								{t('signup_page.sign_up')}
							</h1>
						</div>

						<form
							className='mt-4 space-y-6'
							onSubmit={handleSubmit}
						>
							<div className='flex flex-col gap-4 rounded-md -space-y-px text-left'>
								<div>
									<label
										htmlFor='username'
										className='text-secondary-text block text-sm font-bold mb-2'
									>
										{t('signup_page.username')}
									</label>
									<input
										id='username'
										name='username'
										type='text'
										autoComplete='username'
										spellCheck='false'
										required
										className='appearance-none rounded-md relative block w-full px-3 py-2 border border-secondary-text placeholder-secondary-text text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
										placeholder={t(
											'signup_page.enter_your_username'
										)}
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</div>
								<div>
									<label
										htmlFor='email'
										className='text-secondary-text block text-sm font-bold mb-2'
									>
										{t('signup_page.email_address')}
									</label>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										spellCheck='false'
										required
										className='appearance-none rounded-md relative block w-full px-3 py-2 border border-secondary-text placeholder-secondary-text text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
										placeholder={t(
											'signup_page.enter_your_email'
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
										{t('signup_page.password')}
										<Tooltip
											message={t(
												'signup_page.password_tooltip'
											)}
										/>
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
											className='appearance-none rounded-md relative block w-full px-3 py-2 border border-secondary-text placeholder-secondary-text text-secondary-text focus:outline-none focus:ring-accent focus:border-accent sm:text-sm'
											placeholder={t(
												'signup_page.enter_your_password'
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
									{t('signup_page.sign_up_button')}
								</button>
							</div>
						</form>

						{/* SSO Block */}
						<div className='mt-4 flex flex-col items-center gap-4'>
							<p className='text-center text-secondary-text'>
								{t('signup_page.sign_up_with')}
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

						{/* Sign in link */}
						<div className='text-center mt-4'>
							<p className='text-secondary-text'>
								{t('signup_page.already_have_account')}
								<Link
									to='/auth/signin'
									className='text-accent ml-2 hover:underline'
								>
									{t('signup_page.sign_in')}
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default SignUp
