import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const NotFound = () => {
	return (
		<Layout>
			<div className='p-4 flex-1 flex flex-col items-center justify-center gap-4'>
				<h1 className='mt-6 text-center text-6xl font-extrabold text-secondary-text'>
					404
				</h1>
				<p className='text-center text-xl font-extrabold text-secondary-text'>
					Page Not Found
				</p>
				<Link
					to='/'
					className='group relative flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-primary-text bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
				>
					Go Home
				</Link>
			</div>
		</Layout>
	)
}

export default NotFound
