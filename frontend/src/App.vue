<template>
	<div id="app">
		<Navbar/>
		<div class="content">
			<router-view class="content__main-box" />
			<div v-if="this.$store.state.showExtraContentBox" class="content__extra-box">
				<div class="content__block">
					Extra content block
				</div>
			</div>
		</div>
		<Notifications/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		components: {
			Navbar: () => import('@/components/Navbar.vue'),
			Notifications: () => import('@/components/Notifications.vue')
		},
		async created() {
			var auth_token = localStorage.getItem('auth_token')
			if(!auth_token) return
				
			var result = await this.$store.dispatch('checkAuthToken', {
				token: auth_token
			})

			if(!result.success) {
				localStorage.removeItem('auth_token')
				this.$store.commit('showNotification', {
					message: result.message,
					type: 'error'
				})
			}
		}
	}
</script>