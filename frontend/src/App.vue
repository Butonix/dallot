<template>
	<div id="app">
		<Navbar/>
		<div class="content">
			<router-view class="content__main-box" />
			<div v-if="this.$store.state.showExtraContentBox" class="content__extra-box">
				<div class="content__block">
					Сайт находится в разработке
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
			if(auth_token) {
				var result = await this.$store.dispatch('CheckAuthToken', auth_token)
				if(result == false) {
					localStorage.removeItem('auth_token')
					alert('Ой-ой! Твой токен доступа истек. Перезайди в аккаунт')
				} else if(!result) {
					localStorage.removeItem('auth_token')
					alert('Ой-ой! Произошла ошибка при входе в аккаунт')
				}
			}
		}
	}
</script>