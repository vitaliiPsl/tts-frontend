import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Layout from '../../components/Layout'
import { useVerifyEmailMutation } from '../../features/auth/authApi'

const EmailVerificationCallback = () => {
	const auth = useSelector((state) => state.auth)
	const [error, setError] = useState('')

	let [params] = useSearchParams()

	const navigate = useNavigate()

	const [verifyEmail, { isLoading }] = useVerifyEmailMutation()

	useEffect(() => {
		if (auth && auth.token) {
			navigate('/')
		}
	}, [auth, navigate])

	useEffect(() => {
		const token = params.get('token')
		if (token) {
			handleEmailVerification(token)
		}
	}, [params])

	const handleEmailVerification = async (token) => {
		try {
			await verifyEmail(token).unwrap()
			navigate('/auth/signin')
		} catch (err) {
			setError('Failed to verify email. Please, try again later')
		}
	}

	return (
		<Layout>
			<div className='flex min-h-screen bg-primary-white'>
				{/* Image Container */}
				<div
					className='hidden xl:block w-1/2 bg-cover bg-center'
					style={{ backgroundImage: `url("/images/sign-up.jpg")` }}
				></div>

				{/* Message Container */}
				<div className='w-full xl:w-1/2 p-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<h2 className='text-center text-3xl font-extrabold text-secondary-gray'>
							Verify email
						</h2>
						<p className='text-center'>
							Verifying your email, plese wait ...
						</p>
						<div className='text-center p-2'>
							{error && (
								<p className='text-sm text-red-600'>{error}</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default EmailVerificationCallback
