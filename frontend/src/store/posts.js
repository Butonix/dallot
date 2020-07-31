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
			})).catch((error) => ({
				success: false,
				message: error.message
			}))
		},

		getPost: (context, { id }) => {
			return axios.get(`api/posts/${id}/`).then(response => ({
					success: true,
					post: response.data
				})).catch(error => {
					if(error.status == 404 &&
						error.detail == 'Object not found') {
						return {
							success: false,
							message: 'Кажется, такого поста не существует'
						}
					}
					return {
						success: false,
						message: error.message
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
			.catch((error) => ({
				success: false,
				message: error.message
			})) 
		},

		dropPostRating: (context, { id }) => {
			return axios.post(`api/posts/${id}/drop_rating/`)
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
			return axios.post(`api/posts/${id}/raise_rating/`)
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
			return axios.post(`api/posts/${id}/restore_rating/`)
				.then(response => ({
					success: true,
					rating: response.data.rating
				}))
				.catch(() => ({
					success: false,
				}))
		},

		addPostToBookmarks: (content, { id }) => {
			return axios.post(`api/posts/${id}/add_to_bookmarks/`)
				.then(response => ({
					success: true,
					message: 'Еще один пост в твоих закладках!',
					bookmarks: response.data.bookmarks
				}))
				.catch(() => ({
					success: false,
				}))
		},

		removePostFromBookmarks: (content, { id }) => {
			return axios.post(`api/posts/${id}/remove_from_bookmarks/`)
				.then(response => ({
					success: true,
					bookmarks: response.data.bookmarks
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