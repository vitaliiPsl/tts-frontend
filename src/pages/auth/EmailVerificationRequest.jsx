import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import Layout from '../../components/Layout'

const EmailVerificationRequest = () => {
	const auth = useSelector((state) => state.auth)

	const navigate = useNavigate()
	const location = useLocation()
	const email = location.state?.email

	useEffect(() => {
		if (auth && auth.token) {
			navigate('/')
		}
	}, [auth, navigate])

	return (
		<Layout>
			<div className='flex min-h-screen bg-primary-white'>
				{/* Image Container */}
				<div
					className='hidden xl:block w-1/2 bg-cover bg-center'
					style={{ backgroundImage: `url("/images/sign-up.jpg")` }}
				></div>

				{/* Message Container */}
				<div className='w-full xl:w-1/2 p-4 flex flex-col items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<h2 className='text-center text-3xl font-extrabold text-secondary-gray'>
							Confirm email
						</h2>
						<p className='text-center'>
							{email
								? `We have sent an email to ${email}. Please follow the link in the email to confirm your email address.`
								: `Please follow the link sent to your email address to confirm it.`}
						</p>
						<button
							// Implement the onClick event handler for resending the email
							className='mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple'
						>
							Resend Email
						</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default EmailVerificationRequest
