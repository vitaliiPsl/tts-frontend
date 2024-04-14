import './App.css'
import { Route, Routes } from 'react-router-dom'

import Index from './pages/Index'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import SSOCallback from './pages/auth/SSOCallback'
import EmailVerificationRequest from './pages/auth/EmailVerificationRequest'
import EmailVerificationCallback from './pages/auth/EmailVerificationCallback'
import SynthesisPage from './pages/SynthesisPage'

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path='/synthesize' element={<SynthesisPage />} />
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
				</Route>
			</Routes>
		</div>
	)
}

export default App
