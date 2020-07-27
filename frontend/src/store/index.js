import Vue from 'vue'
import Vuex from 'vuex'
import account from './account'
import posts from './posts'
import notifications from './notifications'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		showExtraContentBox: false
	},
	mutations: {
		showExtraContentBox: (state) => {
			state.showExtraContentBox = true
		},
		unshowExtraContentBox: (state) => {
			state.showExtraContentBox = false
		},
	},
	modules: {
		account,
		posts,
		notifications
	}
})