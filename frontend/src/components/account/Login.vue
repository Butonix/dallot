<template>
	<div>
		<form @submit.prevent="Login" class="auth-form">
			<div class="auth-form__title">
				Вход
			</div>
			<input type="text" v-model="username" class="auth-form__field" placeholder="Логин" required>
			<input type="password" v-model="password" class="auth-form__field" placeholder="Пароль" required>
			<button class="auth-form__submit-btn">
				<icon v-if="loginning" class="auth-form__submit-btn__icon" icon="bug" spin />
				Войти
			</button>
			<router-link :to="{name: 'Register'}" class="auth-form__extra-link">
				Создать аккаунт
			</router-link>
		</form>
	</div>
</template>

<script>
import '@/assets/css/account/auth-form.css'

export default {
	name: 'Login',
	data: () => ({
		username: '',
		password: '',
		loginning: false,	
	}),
	methods: {
		async Login() {
			this.loginning = true
			var result = await this.$store.dispatch('getAuthToken', {
				username: this.username,
				password: this.password
			})
			this.loginning = false
			this.$store.commit('showNotification', {
				message: result.message,
				type: result.success ? 'success' : 'error'
			})
			if(result.success)
				this.$router.push({name: 'Home'})
		}
	}
}
</script>