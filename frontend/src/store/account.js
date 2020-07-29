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
			localStorage.removeItem('auth_token')
			delete axios.defaults.headers.common['auth-token']
		}
	},
	actions: {
		async checkAuthToken({ commit }, { token }) {
			return axios
				.post('api/account/token/get_user/', {
					token: token
				}).then(response => {
					commit('setAuthToken', token)
					commit('setUserInfo', response.data)
					return {
						success: true,
					}
				}).catch(error => {
					if(error.status == 400)
						if(error.detail == 'Token is invalid or expired' || error.detail == 'Token is invalid')
							return {
								success: false,
								message: 'Твой токен доступа истек. Перезайди в аккаунт'
							}
					return {
						success: false,
						message: 'Ой-ой! Что-то пошло не так'
					}
				})
		},
		async getAuthToken({ commit }, { username, password}) {
			return axios
				.post('api/account/token/get_auth_token/', {
					username: username,
					password: password
				}).then(response => {
					commit('setAuthToken', response.data.token)
					commit('setUserInfo', response.data.user)
					return {
						success: true,
						message: 'Рад тебя видеть, ' + response.data.user.username
					}
				}).catch(error => {
					if (error.status == 400)
						if(error.detail == 'Username or password are invalid')
							return {
								success: false,
								message: 'Кажется, ошибка в введенный данных'
							}
					return {
						success: false,
						message: 'Ой-ой! Что-то пошло не так'
					}
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