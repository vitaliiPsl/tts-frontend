import { apiSlice } from '../../app/api'

export const modelsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		loadModels: builder.query({
			query: () => `/models`,
			providesTags: ['Model'],
		}),
		saveModel: builder.mutation({
			query: (data) => ({
				url: '/models',
				method: 'post',
				body: data,
			}),
			invalidatesTags: ['Model'],
		}),
		updateModel: builder.mutation({
			query: ({ id, data }) => ({
				url: `/models/${id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Model'],
		}),
		deleteModel: builder.mutation({
			query: (id) => ({
				url: `/models/${id}`,
				method: 'delete',
			}),
			invalidatesTags: ['Model'],
		}),
	}),
})

export const {
	useLoadModelsQuery,
	useSaveModelMutation,
	useUpdateModelMutation,
	useDeleteModelMutation,
} = modelsApiSlice
