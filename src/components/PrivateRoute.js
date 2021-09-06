import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, redirectTo, ...routeProps }) => {
	const token = useSelector(state => state.user.token) // current user

	return (
		<Route
			{...routeProps}
			render={props =>
				token ? <Component {...props} /> : <Redirect to={redirectTo} />
			}
		/>
	)
}

export default PrivateRoute
