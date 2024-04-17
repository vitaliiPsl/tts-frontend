import { apiSlice } from '../../app/api'

export const synthesisApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		loadHistory: builder.query({
			query: (page) => `/history?page=${page}`,
		}),
	}),
})

export const { useLoadHistoryQuery } = synthesisApiSlice
