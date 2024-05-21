import React from 'react'

import { FaEye, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HistoryRecord = ({ record, onDeleteClick }) => {
	return (
		<div key={record.id} className='flex items-stretch gap-3'>
			<div className='flex-1 bg-background rounded-lg shadow-md p-4 transition-shadow '>
				<p className='text-md font-normal text-secondary text-wrap text-ellipsis'>
					{record.text}
				</p>
				<p className='text-gray-500'>
					{new Date(record.created_at).toLocaleString()}
				</p>
			</div>

			<div className='flex flex-col justify-start gap-3'>
				<Link
					to={`/synthesis`}
					state={{ text: record.text }}
					className='text-md text-primary hover:text-accent transition-colors duration-300'
				>
					<FaEye className='text-2xl text-gray-500 hover:drop-shadow-lg' />
				</Link>
				<Link
					onClick={onDeleteClick}
					className='text-md text-primary hover:text-accent transition-colors duration-300'
				>
					<FaTrash className='text-2xl text-gray-500 hover:drop-shadow-lg' />
				</Link>
			</div>
		</div>
	)
}

export default HistoryRecord
