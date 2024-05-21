import React, { useEffect, useState } from 'react'

import { setToken } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useParams, useSearchParams } from 'react-router-dom'
import { useSignInWithSSOMutation } from '../../features/auth/authApi'

import Layout from '../../components/Layout'

const SSOCallback = () => {
	const auth = useSelector((state) => state.auth)

	let { provider } = useParams()
	let [params] = useSearchParams()

	const [error, setError] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [signInWithSSO, { isLoading }] = useSignInWithSSOMutation()

	useEffect(() => {
		if (auth && auth.token) {
			navigate('/')
		}
	}, [])

	useEffect(() => {
		const code = params.get('code')
		if (provider && code) {
			handleSignInWithSSO(provider, code)
		}
	}, [provider, params])

	const handleSignInWithSSO = async (provider, code) => {
		try {
			let data = await signInWithSSO({ provider, code }).unwrap()

            let token = data?.token
			dispatch(setToken(token))

			navigate('/')
		} catch (err) {
			setError('Failed to sign in. Please, try again later')
		}
	}

	return (
		<Layout>
			<div className='flex-1 flex'>
				{/* Form Container */}
				<div className='w-full xl:w-1/2 p-4 flex items-center justify-center'>
					<div className='max-w-md w-full space-y-8'>
						<h2 className='text-center text-3xl font-extrabold text-secondary-gray'>
							SSO sign in
						</h2>
						<p className='text-center'>
							Handling SSO callback, please wait...
						</p>
						<div className='text-center p-2'>
							{error && (
								<p className='text-sm text-red-600'>{error}</p>
							)}
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

export default SSOCallback
