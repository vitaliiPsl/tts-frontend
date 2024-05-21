import React, { useEffect, useState } from 'react'
import {
	useDeleteHistoryMutation,
	useDeleteHistoryRecordMutation,
	useLoadHistoryQuery,
} from '../features/history/historyApi'

import Layout from '../components/Layout'
import HistoryRecord from '../components/HistoryRecord'

const HistoryPage = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [records, setRecords] = useState([])
	const [hasMore, setHasMore] = useState(true)

	const { data, error, isLoading, isSuccess, refetch } =
		useLoadHistoryQuery(currentPage)

	const [deleteHistoryMutation] = useDeleteHistoryMutation()
	const [deleteHistoryRecordMutation] = useDeleteHistoryRecordMutation()

	useEffect(() => {
		if (data) {
			setRecords((prev) => [...prev, ...data.records])
			setHasMore(data.hasMore)
		}
	}, [data])

	const handleLoadMore = () => {
		if (hasMore) {
			setCurrentPage((prevPage) => prevPage + 1)
		}
	}

	const handleDeleteHistory = async (id) => {
		if (!window.confirm('Are you sure you want to delete history?')) {
			return
		}

		try {
			await deleteHistoryMutation().unwrap()
			refetch()
		} catch (err) {
			console.log(
				'Something went wrong while deleting history. Please, try again later'
			)
		}
	}

	const handleDeleteHistoryRecord = async (id) => {
		if (
			!window.confirm(
				'Are you sure you want to delete this history record?'
			)
		) {
			return
		}

		try {
			await deleteHistoryRecordMutation(id).unwrap()
			setRecords([])
			refetch()
		} catch (err) {
			console.log(
				'Something went wrong while deleting history record. Please, try again later'
			)
		}
	}

	return (
		<Layout>
			<div className='overflow-y-auto flex-1 flex flex-col items-center justify-center gap-6 bg-background p-4'>
				<h2 className='text-2xl font-semibold text-primary'>
					Synthesis History
				</h2>

				<div className='max-w-2xl w-full'>
					{isLoading && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								Loading history...
							</p>
						</div>
					)}

					{error && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								Something went wrong. Please, try again later.
							</p>
						</div>
					)}

					{isSuccess && (!records || records.length === 0) && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								No synthesis records found
							</p>
						</div>
					)}

					{records && records.length > 0 && (
						<>
							<div className='flex flex-col gap-4'>
								{records.map((item, idx) => (
									<HistoryRecord
										key={idx}
										record={item}
										onDeleteClick={() =>
											handleDeleteHistoryRecord(item.id)
										}
									/>
								))}
							</div>

							<div className='flex flex-col justify-between items-center gap-4 mt-4'>
								<span className='text-sm font-medium text-gray-500'>
									Showing {records.length} of{' '}
									{data.totalRecords} records
								</span>

								{hasMore && (
									<button
										onClick={handleLoadMore}
										disabled={isLoading}
										className='text-md text-white bg-primary hover:bg-accent disabled:bg-gray-300 disabled:cursor-not-allowed rounded px-4 py-2'
									>
										{isLoading ? 'Loading...' : 'Load More'}
									</button>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default HistoryPage
