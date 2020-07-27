import axios from 'axios'

export default {
	actions: {
		GetPosts: () => {
			return axios.get('api/posts/').then(response => (
				response.data
			))
		},
		GetPost: (context, id) => {
			return axios.get('api/posts/' + id + '/')
				.then(response => (
					response.data
				))
				.catch(error => {
					if(error.response.status == 404 && error.response.data.detail == 'Not found.')
						return false
				})
		}
	}
}