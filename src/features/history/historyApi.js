import { apiSlice } from '../../app/api'

export const historyApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		loadHistory: builder.query({
			query: (page) => `/history?page=${page}`,
			providesTags: ['History'],
		}),
		deleteHistory: builder.mutation({
			query: () => ({
				url: `/history`,
				method: 'delete',
			}),
			invalidatesTags: ['History'],
		}),
		deleteHistoryRecord: builder.mutation({
			query: (id) => ({
				url: `/history/${id}`,
				method: 'delete',
			}),
			invalidatesTags: ['History'],
		}),
	}),
})

export const {
	useLoadHistoryQuery,
	useDeleteHistoryMutation,
	useDeleteHistoryRecordMutation,
} = historyApiSlice
