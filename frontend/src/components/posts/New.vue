<template>
	<div class="update-post">
		<div class="post content__block">
			<div class="post__header">
				<input ref="postTitleInput" class="update-post__title-input" type="text" placeholder="Заголовок поста">
			</div>
			<TextEditor ref="textEditor" class="post__body"/>
		</div>
		<div class="update-post__buttons content__block">
			<button @click="createPost" class="update-post__btn update-post__success-btn" title="Создать пост">
				<icon v-if="loading" icon="bug" class="update-post__loading-icon" spin />
				<icon icon="check" />
			</button>
			<button @click="clearAll" class="update-post__btn update-post__clear-btn" title="Убрать все">
				<icon icon="times" />
			</button>
		</div>
	</div>
</template>

<script>
	import '@/assets/css/posts/post.css'

	export default {
		name: 'NewPost',
		data: () => ({
			loading: false
		}),
		components: {
			TextEditor: () => import('@/components/TextEditor.vue')
		},
		mounted() {
			this.$store.commit('showExtraContentBox')
		},
		beforeDestroy() {
			this.$store.commit('unshowExtraContentBox')
		},
		methods: {
			clearAll() {
				if(confirm('Вы уверены, что хотите удалить все изменения?')) {
					this.$refs.postTitleInput.value = ''
					this.$refs.textEditor.clearAll()
				}
			},
			async createPost() {
				this.loading = true
				var result = await this.$store.dispatch('createPost', {
					userId: this.$store.getters.userId,
					title: this.$refs.postTitleInput.value,
					content: this.$refs.textEditor.getContent()
				})
				this.loading = false
				this.$store.commit('showNotification', {
					message: result.message,
					type: result.success ? 'success' : 'error'
				})
				if(result.success)
					this.$router.push({name: 'Post', params: {id: result.id}})
			}
		}
	}
</script>

<style>
.update-post__title-input {
	border: none;
	outline: none;
	background: none;
	padding: 0;
	width: 100%;
	font-size: 25px;
	font-weight: 500;
	font-family: 'Montserrat', sans-serif;
}

.post__body .text-editor__edit-block {
	margin-bottom: 10px;
}

.post__body .text-editor__edit-block:last-child {
	margin-bottom: 0;
}

.update-post__buttons {
	display: flex;
	padding: 0;
}

.update-post__btn {
	border: none;
	width: 100%;
	font-size: 25px;
	padding: 10px;
	cursor: pointer;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: .2s;
}

.update-post__btn:first-child {
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

.update-post__btn:last-child {
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}

.update-post__success-btn {
	background: #2ecc71;
}

.update-post__success-btn:hover {
	background: #27ae60;
}

.update-post__clear-btn {
	background: #e74c3c;
}

.update-post__clear-btn:hover {
	background: #c0392b;
}

.update-post__loading-icon {
	margin-right: 10px;
	font-size: 20px;
}
</style>