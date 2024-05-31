import React, { useEffect, useState } from 'react'
import {
	useDeleteHistoryMutation,
	useDeleteHistoryRecordMutation,
	useLoadHistoryQuery,
} from '../features/history/historyApi'

import Layout from '../components/Layout'
import HistoryRecord from '../components/HistoryRecord'
import { useTranslation } from 'react-i18next'

const HistoryPage = () => {
	const { t } = useTranslation()
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

	const handleDeleteHistoryRecord = async (id) => {
		if (!window.confirm(t('delete_history_record_confirm'))) {
			return
		}

		try {
			await deleteHistoryRecordMutation(id).unwrap()
			setRecords([])
			refetch()
		} catch (err) {
			console.log(t('delete_history_record_error'))
		}
	}

	return (
		<Layout>
			<div className='overflow-y-auto flex-1 flex flex-col items-center justify-center gap-6 bg-background p-4'>
				<h2 className='text-2xl font-semibold text-primary'>
					{t('synthesis_history')}
				</h2>

				<div className='max-w-2xl w-full'>
					{isLoading && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								{t('loading_history')}
							</p>
						</div>
					)}

					{error && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								{t('loading_history_error')}
							</p>
						</div>
					)}

					{isSuccess && (!records || records.length === 0) && (
						<div className='text-center py-4'>
							<p className='text-lg text-gray-500'>
								{t('no_history_records')}
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
									{t('showing_records', {
										count: records.length,
										total: data.totalRecords,
									})}
								</span>

								{hasMore && (
									<button
										onClick={handleLoadMore}
										disabled={isLoading}
										className='text-md text-white bg-primary hover:bg-accent disabled:bg-gray-300 disabled:cursor-not-allowed rounded px-4 py-2'
									>
										{isLoading
											? t('loading_history')
											: t('load_more')}
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
