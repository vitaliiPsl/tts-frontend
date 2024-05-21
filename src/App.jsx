import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Index from './pages/Index'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import SSOCallback from './pages/auth/SSOCallback'
import EmailVerificationRequest from './pages/auth/EmailVerificationRequest'
import EmailVerificationCallback from './pages/auth/EmailVerificationCallback'
import PasswordReset from './pages/auth/PasswordReset'
import PasswordResetRequest from './pages/auth/PasswordResetRequest'

import NotFound from './pages/NotFound'
import SynthesisPage from './pages/SynthesisPage'
import HistoryPage from './pages/HistoryPage'
import ManageModelsPage from './pages/ManageModelsPage'

import { useDispatch, useSelector } from 'react-redux'
import { setUser, setToken } from './features/auth/authSlice'
import { useLoadUserQuery } from './features/auth/authApi'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
	const dispatch = useDispatch()

	const token = useSelector((state) => state.auth.token)
	const user = useSelector((state) => state.auth.user)

	const { data, error, isLoading } = useLoadUserQuery(null, {
		skip: !token || user,
	})

	useEffect(() => {
		if (data) {
			dispatch(setUser(data))
		}
	}, [data])

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Index />} />

				<Route path='synthesis' element={<SynthesisPage />} />

				<Route
					path='history'
					element={<ProtectedRoute isAllowed={user || token} />}
				>
					<Route path='' element={<HistoryPage />} />
				</Route>

				<Route path='auth'>
					<Route path='signin' element={<SignIn />} />
					<Route path='signup' element={<SignUp />} />
					<Route
						path='sso-callback/:provider'
						element={<SSOCallback />}
					/>
					<Route
						path='email-verification-request'
						element={<EmailVerificationRequest />}
					/>
					<Route
						path='email-verification-callback'
						element={<EmailVerificationCallback />}
					/>
					<Route path='password-reset' element={<PasswordReset />} />
					<Route
						path='password-reset-request'
						element={<PasswordResetRequest />}
					/>
				</Route>

				<Route
					path='admin'
					element={
						<ProtectedRoute
							isAllowed={user && user.role === 'Admin'}
						/>
					}
				>
					<Route path='models' element={<ManageModelsPage />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
