import React from 'react'

const Footer = () => {
	return (
		<footer className='bg-primary'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center text-primary-text py-4'>
					<p>
						&copy; {new Date().getFullYear()} Synthesizer. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
