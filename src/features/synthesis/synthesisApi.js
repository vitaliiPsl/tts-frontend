import { apiSlice } from '../../app/api'

export const synthesisApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		synthesize: builder.mutation({
			query: ({text, modelId}) => ({
				url: '/synthesis',
				method: 'post',
				body: { text, modelId },
			}),
		}),
	}),
})

export const { useSynthesizeMutation } = synthesisApiSlice
