<template>
	<div>
		<div v-if="post">
			<div class="content__block post">
				<div class="post__header">
					{{post.title}}
				</div>
				<div class="post__body" v-html="post.content"></div>
			</div>
		</div>
		<Loading v-else />
	</div>
</template>

<script>
	import '@/assets/css/posts/post.css'

	export default {
		name: 'Post',
		props: ['id'],
		data: () => ({
			post: null
		}),
		async created() {
			var result = await this.$store.dispatch('getPost', {
				id: this.id
			})

			if(result.success) this.post = result.post
			else {
				this.$store.commit('showNotification', {
					message: result.message,
					type: 'error'
				})
			}
			
			this.$store.commit('showExtraContentBox')
		},
		beforeDestroy() {
			this.$store.commit('unshowExtraContentBox')
		}
	}
</script>