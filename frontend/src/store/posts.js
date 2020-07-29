import axios from 'axios'

export default {
	state: {
		posts: null
	},
	mutations: {
		updatePosts: (state, posts) => {
			state.posts = posts
		}
	},
	actions: {
		getPosts: () => {
			return axios.get('api/posts/').then(response => ({
				success: true,
				posts: response.data
			})).catch(() => ({
				success: false,
				message: 'Ой-ой! Что-то пошло не так'
			}))
		},
		getPost: (context, { id }) => {
			return axios.get('api/posts/' + id + '/')
				.then(response => ({
					success: true,
					post: response.data
				}))
				.catch(error => {
					if(error.status == 404 && error.detail == 'Not found.')
						return {
							success: false,
							message: 'Кажется, такого поста не существует'
						}
					return {
						success: false,
						message: 'Ой-ой! Что-то пошло не так'
					}
				})
		},
		createPost: (context, { userId, title, content }) => {
			return axios.post('api/posts/', {
				user: userId,
				title: title,
				content: content
			}).then((response) => ({
				success: true,
				message: 'Готово! Посмотри теперь на свой пост',
				id: response.data.id
			}))
			.catch(() => ({
				success: false,
				message: 'Ой-ой! Что-то пошло не так'
			})) 
		},
		dropPostRating: (context, { id }) => {
			return axios.post('api/posts/' + id + '/drop_rating/')
				.then(response => ({
					success: true,
					message: 'Надеюсь, твоя оценка заслужена',
					rating: response.data.rating
				}))
				.catch(() => ({
					success: false,
				}))
		},
		raisePostRating: (context, { id }) => {
			return axios.post('api/posts/' + id + '/raise_rating/')
				.then(response => ({
					success: true,
					message: 'Очень рад, что тебе понравился этот пост',
					rating: response.data.rating
				}))
				.catch(() => ({
					success: false,
				}))
		},
		restorePostRating: (content, { id }) => {
			return axios.post('api/posts/' + id + '/restore_rating/')
				.then(response => ({
					success: true,
					rating: response.data.rating
				}))
				.catch(() => ({
					success: false,
				}))
		}
	},
	getters: {
		posts: (state) => (state.posts)
	}
}