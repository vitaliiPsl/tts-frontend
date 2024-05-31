import {
	createApi,
	fetchBaseQuery,
	fetchQuery,
} from '@reduxjs/toolkit/query/react'

import { logout } from '../features/auth/authSlice'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const baseQuery = fetchBaseQuery({
	baseUrl: SERVER_URL,
	prepareHeaders: (headers, { getState }) => {
		let token = getState().auth.token

		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}

		return headers
	},
})

const baseQueryWrapper = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		api.dispatch(logout())
	}

	return result
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWrapper,
	tagTypes: ['History', 'Model'],
	keepUnusedDataFor: 0,
	endpoints: (builder) => ({}),
})
