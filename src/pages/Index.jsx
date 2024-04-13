import React from 'react'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const Index = () => {
	const auth = useSelector((state) => state.auth)

	return (
		<Layout>
			<div className='p-4 flex-1 flex flex-col items-center justify-center bg-white text-secondary'>
				<h1 className='text-5xl font-bold mb-6 text-center'>
					Welcome to SpeakFlow
				</h1>
				<p className='text-lg mb-6 text-center'>
					Website that allows you to synthesize text from speech
				</p>

				<div>
					<Link
						to='/synthesize'
						className='flex justify-center min-w-28 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
					>
						Synthesize
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export default Index
