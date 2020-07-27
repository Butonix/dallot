import axios from 'axios'

export default {
	state: {
		isAuthenticated: false,
		authToken: null,
		username: null,
		userId: null
	},
	mutations: {
		setAuthToken: (state, token) => {
			state.authToken = token
			state.isAuthenticated = true
			localStorage.setItem('auth_token', token)
			axios.defaults.headers.common['auth-token'] = token
		},
		setUserInfo: (state, payload) => {
			state.username = payload.username
			state.userId = payload.id
		},
		logout: (state) => {
			state.authToken = null
			state.isAuthenticated = false
			state.username = null
			state.userId = null
		}
	},
	actions: {
		async CheckAuthToken({ commit }, token) {
			// Check auth token validity
			// SUCCESS: return true
			// INVALID OR EXPIRED TOKEN: return false
			// OTHER ERROR: return none

			return axios
				.get('api/account/token/get_user/?auth_token=' + token)
				.then(response => {
					commit('setAuthToken', token)
					commit('setUserInfo', response.data)
					return true
				})
				.catch(error => {
					if(error.response.status == 400)
						if(error.response.data.detail == 'Token is invalid or expired' || error.response.data.detail == 'Token is invalid')
							return false
				})
		},
		async GetAuthToken({ commit }, payload) {
			// Authenticate of user
			// SUCCESS: return auth token
			// INVALID FIELDS: return false
			// OTHER ERROR: return none

			return axios
				.post('api/account/token/get_auth_token/', payload)
				.then(response => {
					commit('setAuthToken', response.data.token)
					commit('setUserInfo', response.data.user)
					return true
				})
				.catch(error => {
					if (error.response.status == 400)
						if(error.response.data.detail == 'Username or password are invalid')
							return false
				})
		}
	},
	getters: {
		authToken: (state) => (state.authToken),
		isUserAuthenticated: (state) => (state.isAuthenticated),
		username: (state) => (state.username),
		userId: (state) => (state.userId)
	}
}