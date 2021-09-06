import { createSlice } from '@reduxjs/toolkit'

const currentAuthUserSlice = createSlice({
	name: 'currentAuthUser',
	initialState: { user: {}, token: null },
	reducers: {
		setCurrentAuthUser(state, { payload }) {
			state.user = payload
		},
		setUserToken(state, { payload }) {
			state.token = payload
		},
		logoutUser() {},
	},
})

export const { setCurrentAuthUser, setUserToken } = currentAuthUserSlice.actions
export default currentAuthUserSlice.reducer
