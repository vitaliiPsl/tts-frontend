import React from 'react'
import { Link } from 'react-router-dom'

const HistoryRecord = ({ record }) => {
	return (
		<div
			key={record.id}
			className='bg-background rounded-lg shadow-md mb-4 p-4 hover:shadow-lg transition-shadow'
		>
			<div className='flex justify-between items-center gap-3'>
				<div>
					<p className='text-md font-normal text-secondary'>
						{record.text}
					</p>
					<p className='text-gray-500'>
						{new Date(record.created_at).toLocaleString()}
					</p>
				</div>
				<Link
					to={`/synthesis`}
					state={{ text: record.text }}
					className='text-md text-primary hover:text-accent transition-colors duration-300'
				>
					View
				</Link>
			</div>
		</div>
	)
}

export default HistoryRecord
