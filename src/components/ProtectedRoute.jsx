import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({
	isAllowed,
	redirectPath = '/auth/signin',
}) => {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />
	}
	return <Outlet />
}

export default ProtectedRoute
