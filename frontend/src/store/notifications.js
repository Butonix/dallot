export default {
	state: {
		show: false,
		type: null,
		message: null
	},
	mutations: {
		showNotification: (state, payload) => {
			if(state.show) {
				state.show = false
				setTimeout(() => {
					state.type = payload.type
					state.message = payload.message
					state.show = true
				}, 500)
			} else {
				state.type = payload.type
				state.message = payload.message
				state.show = true
			}
		},
		
		closeNotification: (state) => {
			state.type = null
			state.message = null
			state.show = false
		}
	},
	getters: {
		showNotification: (state) => (state.show),
		notificationType: (state) => (state.type),
		notificationMessage: (state) => (state.message)
	}
}