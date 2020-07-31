import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye as fasEye } from '@fortawesome/free-solid-svg-icons'
import { faEye as farEye } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'
import { faCommentAlt as fasCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt as farCommentAlt } from '@fortawesome/free-regular-svg-icons'
import { faTimes, faChevronUp, faChevronDown, faBug, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import '@/assets/css/index.css'

library.add(fasEye, farEye)
library.add(fasBookmark, farBookmark)
library.add(fasCommentAlt, farCommentAlt)
library.add(faTimes, faChevronUp, faChevronDown, faBug, faCheck, faPlus)

Vue.component('icon', FontAwesomeIcon)

Vue.component('Loading', Loading)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/'

axios.interceptors.response.use((response) => ({
	data: response.data,
	status: response.status
}), function(error) {
	console.log('ERROR: ', error)

	try {
		var data = {
			message: 'Ой-ой! Что-то пошло не так',
			detail: error.response.data.detail,
			status: error.response.status,
			data: error.response.data
		}
	} catch(e) {
		data = {
			message: `Ой-ой! Что-то пошло вообще не так`,
			detail: `Ой-ой! Что-то пошло вообще не так`,
			status: 500
		}
	}

	return Promise.reject(data)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
