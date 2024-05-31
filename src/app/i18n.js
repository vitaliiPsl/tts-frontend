import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { initReactI18next } from 'react-i18next'

const resources = {
	en: {
		translation: {
			welcome_user: 'Hello {{username}}. Welcome to Synthesizer',
			welcome: 'Welcome to Synthesizer',
			description:
				'Website that allows you to synthesize speech from text',
			synthesize_button: 'Synthesize',
			synthesis: 'Synthesis',
			history: 'History',
			models: 'Models',
			log_out: 'Log out',
			sign_in: 'Sign In',
			sign_up: 'Sign Up',
			footer_text: '© {{year}} Synthesizer. All rights reserved.',
			available_models: 'Available models',
			loading_models: 'Loading models...',
			loading_models_error:
				'Something went wrong while loading models. Please, try again later.',
			no_models: 'No available models at the moment',
			enter_text: 'Enter Text for Synthesis',
			text_placeholder: 'Type something...',
			cooking: 'Cooking...',
			synthesis_error: 'Something went wrong. Please, try again later.',
			page_not_found: 'Page Not Found',
			go_home: 'Go Home',
			synthesis_history: 'Synthesis History',
			loading_history: 'Loading history...',
			loading_history_error:
				'Something went wrong. Please, try again later.',
			no_history_records: 'No synthesis records found',
			showing_records: 'Showing {{count}} of {{total}} records',
			load_more: 'Load More',
			delete_history_record_confirm:
				'Are you sure you want to delete this history record?',
			delete_history_record_error:
				'Something went wrong while deleting history record. Please, try again later.',
			manage_models: 'Manage Models',
			model_url_placeholder: 'Model URL',
			model_name_placeholder: 'Model name',
			model_language_placeholder:
				'Supported language. Two letter ISO code',
			create: 'Create',
			update: 'Update',
			cancel: 'Cancel',
			loading: 'Loading...',
			delete_model_confirm: 'Are you sure you want to delete this model?',
			save_model_error:
				'Something went wrong while saving the model. Please, try again later.',
			update_model_error:
				'Something went wrong while updating the model. Please, try again later.',
			delete_model_error:
				'Something went wrong while deleting the model. Please, try again later.',

			email_verification_callback_page: {
				verify_email: 'Verify email',
				verifying_email: 'Verifying your email, please wait...',
				email_verification_error:
					'Failed to verify email. Please, try again later',
			},

			email_verification_request_page: {
				confirm_email: 'Confirm email',
				email_sent:
					'We have sent an email to {{email}}. Please follow the link in the email to confirm your email address.',
				follow_link:
					'Please follow the link sent to your email address to confirm it.',
				resend_email: 'Resend Email',
			},

			password_reset_page: {
				set_new_password: 'Set new password',
				new_password: 'New Password',
				enter_new_password: 'Enter new password',
				confirm_new_password: 'Confirm New Password',
				confirm_new_password_placeholder: 'Confirm new password',
				passwords_do_not_match: 'Passwords do not match.',
				password_reset_success:
					'Your password has been reset successfully!',
				set_new_password_button: 'Set New Password',
				password_reset_failed:
					'Failed to set the new password. Please try again.',
			},

			password_reset_request_page: {
				password_reset: 'Password Reset',
				email_address: 'Email address',
				enter_your_email: 'Enter your email',
				send_reset_email: 'Send Reset Email',
				reset_email_sent:
					'If an account with that email exists, we sent an email to reset your password.',
				reset_email_failed:
					'Failed to send password reset email. Please, try again later.',
				remember_password: 'Remember your password?',
				sign_in: 'Sign in',
			},

			signin_page: {
				sign_in: 'Sign in',
				email_address: 'Email address',
				enter_your_email: 'Enter your email',
				password: 'Password',
				enter_your_password: 'Enter your password',
				sign_in_button: 'Sign In',
				forgot_password: 'Forgot your password?',
				reset_it: 'Reset it',
				sign_in_with: 'Or sign in with',
				no_account: "Don't have an account?",
				sign_up: 'Sign Up',
				provide_email: 'You need to provide your email',
				invalid_credentials: 'Invalid username or password',
				signin_failed: 'Failed to sign in. Please, try again later',
			},

			signup_page: {
				sign_up: 'Sign Up',
				username: 'Username',
				enter_your_username: 'Enter your username',
				email_address: 'Email address',
				enter_your_email: 'Enter your email',
				password: 'Password',
				enter_your_password: 'Enter your password',
				password_tooltip:
					'Your password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.',
				sign_up_button: 'Sign Up',
				sign_up_with: 'Or sign up with',
				already_have_account: 'Already have an account?',
				sign_in: 'Sign In',
				provide_username: 'You need to provide your username',
				provide_email: 'You need to provide your email',
				signup_failed: 'Failed to sign up. Please, try again later',
			},

			ssocallback_page: {
				sso_sign_in: 'SSO sign in',
				handling_callback: 'Handling SSO callback, please wait...',
				signin_failed: 'Failed to sign in. Please, try again later',
			},
		},
	},
	uk: {
		translation: {
			welcome_user: 'Привіт {{username}}. Ласкаво просимо до Synthesizer',
			welcome: 'Ласкаво просимо до Synthesizer',
			description: 'Вебсайт, який дозволяє синтезувати мовлення з тексту',
			synthesize_button: 'Синтезувати',
			synthesizer: 'Synthesizer',
			synthesis: 'Синтез',
			history: 'Історія',
			models: 'Моделі',
			log_out: 'Вийти',
			sign_in: 'Увійти',
			sign_up: 'Зареєструватись',
			footer_text: '© {{year}} Synthesizer. Всі права захищені.',
			available_models: 'Доступні моделі',
			loading_models: 'Завантажуємо моделі...',
			loading_models_error:
				'Щось пішло не так під час завантаження моделей. Будь ласка, спробуйте пізніше.',
			no_models: 'На даний момент немає доступних моделей',
			enter_text: 'Введіть текст для синтезу',
			text_placeholder: 'Введіть щось...',
			cooking: 'Готуємо...',
			synthesis_error:
				'Щось пішло не так. Будь ласка, спробуйте пізніше.',
			page_not_found: 'Сторінку не знайдено',
			go_home: 'На головну',
			synthesis_history: 'Історія синтезу',
			loading_history: 'Завантаження історії...',
			loading_history_error:
				'Щось пішло не так. Будь ласка, спробуйте пізніше.',
			no_history_records: 'Історію синтезу не знайденр',
			showing_records: 'Показано {{count}} з {{total}} записів',
			load_more: 'Завантажити більше',
			delete_history_record_confirm:
				'Ви впевнені, що хочете видалити цей запис історії?',
			delete_history_record_error:
				'Щось пішло не так під час видалення запису історії. Будь ласка, спробуйте пізніше.',
			manage_models: 'Керування моделями',
			model_url_placeholder: 'URL моделі',
			model_name_placeholder: 'Назва моделі',
			model_language_placeholder:
				'Підтримувана мова. Двохбуквений код ISO',
			create: 'Створити',
			update: 'Оновити',
			cancel: 'Скасувати',
			loading: 'Завантаження...',
			delete_model_confirm: 'Ви впевнені, що хочете видалити цю модель?',
			save_model_error:
				'Щось пішло не так під час збереження моделі. Будь ласка, спробуйте пізніше.',
			update_model_error:
				'Щось пішло не так під час оновлення моделі. Будь ласка, спробуйте пізніше.',
			delete_model_error:
				'Щось пішло не так під час видалення моделі. Будь ласка, спробуйте пізніше.',

			email_verification_callback_page: {
				verify_email: 'Підтвердьте електронну пошту',
				verifying_email:
					'Підтвердження вашої електронної пошти, будь ласка, зачекайте...',
				email_verification_error:
					'Не вдалося підтвердити електронну пошту. Будь ласка, спробуйте пізніше',
			},

			email_verification_request_page: {
				confirm_email: 'Підтвердьте електронну пошту',
				email_sent:
					'Ми надіслали листа на {{email}}. Будь ласка, перейдіть за посиланням у листі, щоб підтвердити свою електронну адресу.',
				follow_link:
					'Будь ласка, перейдіть за посиланням, надісланим на вашу електронну адресу, щоб підтвердити її.',
				resend_email: 'Повторно надіслати електронного листа',
			},

			password_reset_page: {
				set_new_password: 'Встановити новий пароль',
				new_password: 'Новий пароль',
				enter_new_password: 'Введіть новий пароль',
				confirm_new_password: 'Підтвердьте новий пароль',
				confirm_new_password_placeholder: 'Підтвердьте новий пароль',
				passwords_do_not_match: 'Паролі не збігаються.',
				password_reset_success: 'Ваш пароль було успішно змінено!',
				set_new_password_button: 'Встановити новий пароль',
				password_reset_failed:
					'Не вдалося встановити новий пароль. Будь ласка, спробуйте ще раз.',
			},

			password_reset_request_page: {
				password_reset: 'Скидання пароля',
				email_address: 'Електронна адреса',
				enter_your_email: 'Введіть вашу електронну адресу',
				send_reset_email: 'Надіслати лист для скидання',
				reset_email_sent:
					'Якщо обліковий запис з цією електронною адресою існує, ми надіслали листа для скидання пароля.',
				reset_email_failed:
					'Не вдалося надіслати лист для скидання пароля. Будь ласка, спробуйте ще раз пізніше.',
				remember_password: "Пам'ятаєте свій пароль?",
				sign_in: 'Увійти',
			},

			signin_page: {
				sign_in: 'Увійти',
				email_address: 'Електронна адреса',
				enter_your_email: 'Введіть вашу електронну адресу',
				password: 'Пароль',
				enter_your_password: 'Введіть ваш пароль',
				sign_in_button: 'Увійти',
				forgot_password: 'Забули пароль?',
				reset_it: 'Скинути його',
				sign_in_with: 'Або увійдіть за допомогою',
				no_account: 'Немає облікового запису?',
				sign_up: 'Зареєструватись',
				provide_email: 'Вам потрібно вказати вашу електронну адресу',
				invalid_credentials: "Невірне ім'я користувача або пароль",
				signin_failed:
					'Не вдалося увійти. Будь ласка, спробуйте ще раз пізніше',
			},

			signup_page: {
				sign_up: 'Зареєструватись',
				username: "Ім'я користувача",
				enter_your_username: "Введіть ваше ім'я користувача",
				email_address: 'Електронна адреса',
				enter_your_email: 'Введіть вашу електронну адресу',
				password: 'Пароль',
				enter_your_password: 'Введіть ваш пароль',
				password_tooltip:
					'Ваш пароль повинен містити не менше 8 символів, включати великі та малі літери, цифри та спеціальні символи.',
				sign_up_button: 'Зареєструватись',
				sign_up_with: 'Або зареєструйтесь за допомогою',
				already_have_account: 'Вже є обліковий запис?',
				sign_in: 'Увійти',
				provide_username: "Вам потрібно вказати своє ім'я користувача",
				provide_email: 'Вам потрібно вказати свою електронну адресу',
				signup_failed:
					'Не вдалося виконати реєстрацію. Будь ласка, спробуйте ще раз пізніше',
			},

			ssocallback_page: {
				sso_sign_in: 'Вхід через SSO',
				handling_callback:
					'Обробка зворотного виклику SSO, будь ласка, зачекайте...',
				signin_failed:
					'Не вдалося увійти. Будь ласка, спробуйте ще раз пізніше',
			},
		},
	},
}

const language = localStorage.getItem('i18nextLng')
	? localStorage.getItem('i18nextLng')
	: 'en'

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		lng: language,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			caches: ['localStorage'],
		},
	})

export default i18n
