import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import { MdMenu, MdClose } from 'react-icons/md'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const user = useSelector((state) => state.auth.user)
	const dispatch = useDispatch()

	const { t } = useTranslation()

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<header className='bg-primary text-white relative'>
			<nav className='container mx-auto flex flex-wrap items-center justify-between py-4 px-6'>
				{/* Home link */}
				<Link to='/' className='text-xl font-semibold'>
					{t('synthesizer')}
				</Link>

				{/* Nav links */}
				<div className='flex items-center justify-around'>
					{/* Burger menu */}
					<button
						className='lg:hidden'
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<MdClose className='text-xl' />
						) : (
							<MdMenu className='text-2xl' />
						)}
					</button>

					<div className='links hidden lg:flex items-center justify-between gap-8'>
						<>
							<Link
								to='/synthesis'
								className='text-white hover:text-accent transition duration-300'
							>
								{t('synthesis')}
							</Link>

							{user ? (
								<>
									<Link
										to='/history'
										className='text-white hover:text-accent transition duration-300'
									>
										{t('history')}
									</Link>

									{user.role === 'Admin' && (
										<Link
											to='/admin/models'
											className='text-white hover:text-accent transition duration-300'
										>
											{t('models')}
										</Link>
									)}

									<Link
										to='#'
										onClick={handleLogout}
										className='text-white hover:text-accent transition duration-300'
									>
										{t('log_out')}
									</Link>
								</>
							) : (
								<>
									<Link
										to='/auth/signin'
										className='text-white hover:text-accent transition duration-300'
									>
										{t('sign_in')}
									</Link>
									<Link
										to='/auth/signup'
										className='text-white hover:text-accent transition duration-300'
									>
										{t('sign_up')}
									</Link>
								</>
							)}

							<LanguageSwitcher />
						</>
					</div>
				</div>
			</nav>

			{isMobileMenuOpen && (
				<div className='burger-menu absolute top-full left-0 w-full z-50 bg-primary text-white lg:hidden flex flex-col justify-center gap-4 py-4 text-center'>
					<>
						<Link
							to='/synthesis'
							className='text-white hover:text-accent transition duration-300'
						>
							{t('synthesis')}
						</Link>

						{user ? (
							<>
								<Link
									to='/history'
									className='text-white hover:text-accent transition duration-300'
								>
									{t('history')}
								</Link>
								<Link
									to='#'
									onClick={handleLogout}
									className='text-white hover:text-accent transition duration-300'
								>
									{t('log_out')}
								</Link>
							</>
						) : (
							<>
								<Link
									to='/auth/signin'
									className='text-white hover:text-accent transition duration-300'
								>
									{t('sign_in')}
								</Link>
								<Link
									to='/auth/signup'
									className='text-white hover:text-accent transition duration-300'
								>
									{t('sign_up')}
								</Link>
							</>
						)}
						<LanguageSwitcher />
					</>
				</div>
			)}
		</header>
	)
}

export default Header
