import { apiSlice } from '../../app/api'

export const synthesisApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		synthesize: builder.mutation({
			query: (text) => ({
				url: '/synthesis',
				method: 'post',
				body: { text },
			}),
		}),
	}),
})

export const { useSynthesizeMutation } = synthesisApiSlice
