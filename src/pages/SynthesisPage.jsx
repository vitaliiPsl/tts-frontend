import React, { useState } from 'react'
import Layout from '../components/Layout'

const SynthesisPage = () => {
	const [text, setText] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Submitted text:', text)
		setText('')
	}

	return (
		<Layout>
			<div className='flex-1 flex flex-col items-center justify-center bg-background p-4'>
				
                <div className='max-w-2xl w-full flex flex-col text-center bg-white rounded-lg shadow-md p-4'>
					<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
						<div className=''>
							<label
								htmlFor='text'
								className='block text-lg font-medium text-gray-700'
							>
								Enter Text for Synthesis
							</label>
							<textarea
								id='text'
								name='text'
								rows='4'
								className='mt-1 p-2 w-full rounded-md border-secondary shadow-sm focus:border-accent focus:ring-accent outline-accent'
								placeholder='Type something...'
								value={text}
								onChange={(e) => setText(e.target.value)}
								required
							></textarea>
						</div>
						<div className='mt-4'>
							<button
								type='submit'
								className='w-full flex justify-center min-w-28 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
							>
								Synthesize
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default SynthesisPage
