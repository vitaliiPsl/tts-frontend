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
		signInWithSSO: builder.mutation({
			query: ({ provider, code }) => ({
				url: `auth/sso/${provider}/sign-in`,
				method: 'POST',
				body: { code },
			}),
		}),
		verifyEmail: builder.mutation({
			query: (token) => ({
				url: '/auth/verify-email',
				method: 'post',
				body: { token },
			}),
		}),
		resetPassword: builder.mutation({
			query: (payload) => ({
				url: '/auth/reset-password',
				method: 'post',
				body: payload,
			}),
		}),
		sendPasswordResetEmail: builder.mutation({
			query: (email) => ({
				url: '/auth/send-password-reset-email',
				method: 'post',
				body: { email },
			}),
		}),
	}),
})

export const {
	useSignInMutation,
	useSignUpMutation,
	useVerifyEmailMutation,
	useSignInWithSSOMutation,
	useResetPasswordMutation,
	useSendPasswordResetEmailMutation,
} = authApiSlice
