import axios from 'axios'

export default {
	actions: {
		GetPosts: () => {
			// Return all posts

			return axios.get('api/posts/').then(response => (
				response.data
			))
		},
		GetPost: (context, id) => {
			// SUCCESS: return post by id
			// NOT FOUND: return false
			// OTHER ERROR: return none

			return axios.get('api/posts/' + id + '/')
				.then(response => (
					response.data
				))
				.catch(error => {
					if(error.response.status == 404 && error.response.data.detail == 'Not found.')
						return false
				})
		},
		createPost: (context, { userId, title, text }) => {
			// Create post
			// SUCCESS: return id
			// ERROR: return null

			return axios.post('api/posts/', {
				user: userId,
				title: title,
				text: text
			}).then((response) => (
				response.data.id
			)).catch(() => (
				null
			)) 
		}
	}
}