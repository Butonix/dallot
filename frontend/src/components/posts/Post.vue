<template>
	<div>
		<div v-if="post">
			<div class="content__block post">
				<div class="post__header">
					{{post.title}}
				</div>
				<div class="post__body">
					{{post.text}}
				</div>
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
			var result = await this.$store.dispatch('GetPost', this.id)
			this.$store.commit('showExtraContentBox')
			if(result)
				this.post = result
			else if(result == false) {
				this.$store.commit('showNotification', {
					message: 'Error 1',
					type: 'error'
				})
			} else {
				this.$store.commit('showNotification', {
					message: 'Error 2',
					type: 'error'
				})
			}
		},
		destroyed() {
			this.$store.commit('unshowExtraContentBox')
		}
	}
</script>