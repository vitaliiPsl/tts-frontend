import './App.css'
import { Route, Routes } from 'react-router-dom'

import Index from './pages/Index'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
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
				</Route>
			</Routes>
		</div>
	)
}

export default App
