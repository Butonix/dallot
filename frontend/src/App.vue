<template>
	<div id="app">
		<Navbar/>
		<div class="content">
			<router-view class="content__main-box" />
			<div v-if="this.$store.state.showExtraContentBox" class="content__extra-box">
				<div class="content__block">
					Добавить toolsbar в редактор
				</div>
				<div class="content__block">
					Добавить placeholder в редактор
				</div>
				<div class="content__block">
					Добавить в модель поста новые поля, а ненунужные убрать
				</div>
				<div class="content__block">
					Разделить иконки при просмотре постов на кликабельные и обычные
				</div>
				<div class="content__block">
					Реализовать функционал для обновления рейтинга поста
				</div>
				<div class="content__block">
					Добавить закладки
				</div>
				<div class="content__block">
					Реализовать функционал добовления поста в закладки
				</div>
				<div class="content__block">
					Добавить пользователя (если это не admin) при просмотре постов
				</div>
				<div class="content__block">
					Добавить пользователя (если это не admin), функциональные и информирующие иконки (просмотры, комменты, закладки, рейтинг) на страницу поста
				</div>
				<div class="content__block">
					Добавить комментарии
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