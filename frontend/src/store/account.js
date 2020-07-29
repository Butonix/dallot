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
		},
		async userRegistration(context, { username, email, password }) {
			return axios.post('api/account/create_user/', {
				username: username,
				email: email,
				password: password
			}).then(() => ({
				success: true,
				message: 'Поздравляю со вступлением в нашу команду. Теперь ты может войти в аккаунт'
			})).catch(error => {
				console.log(error.data)
				switch(error.data[Object.keys(error.data)[0]][0]) {
					case 'Enter a valid email address.':
						var message = 'Лучше ввести корректный email'
						break
					case 'The password is too similar to the username.':
						message = 'Твой пароль уж очень напоминает введенный логин'
						break
					case 'The password is too similar to the email.':
						message = 'Твой пароль уж очень напоминает введеный email'
						break
					case 'This password is too short. It must contain at least 8 characters.':
						message = 'Посчитай, в пароле должно быть минимум 8 символов'
						break
					case 'This password is too common.':
						message = 'Даже я догодался бы до такого простого пароля'
						break
					case 'This password is entirely numeric.':
						message = 'Пароль только из цифр - плохой пароль'
						break
					case 'user with this username already exists.':
						message = 'Я уже знаю пользователя с таким логином. Не ты ли это?'
						break
					case 'user with this email already exists.':
						message = 'Это точно твой email? У нас уже есть один с такой почтой'
						break
					default:
						message = error.data[Object.keys(error.data)[0]][0]
				}
				return {
					success: false,
					message: message
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