import './App.css'
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
import HistoryPage from './pages/HistoryPage'

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Index />} />

				<Route path='/history' element={<HistoryPage />} />

				<Route path='/auth'>
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

				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
