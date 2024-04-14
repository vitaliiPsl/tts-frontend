import { apiSlice } from '../../app/api'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signIn: builder.mutation({
			query: (credentials) => ({
				url: '/auth/sign-in',
				method: 'post',
				body: credentials,
			}),
		}),
		signUp: builder.mutation({
			query: (user) => ({
				url: '/auth/sign-up',
				method: 'post',
				body: user,
			}),
		}),
		verifyEmail: builder.mutation({
			query: (token) => ({
				url: '/auth/verify-email',
				method: 'post',
				body: { token },
			}),
		}),
		signInWithSSO: builder.mutation({
			query: ({ provider, code }) => ({
				url: `auth/sso/${provider}/sign-in`,
				method: 'POST',
				body: { code },
			}),
		}),
	}),
})

export const {
	useSignInMutation,
	useSignUpMutation,
	useVerifyEmailMutation,
	useSignInWithSSOMutation,
} = authApiSlice
