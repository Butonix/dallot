<template>
	<div>
		<form @submit.prevent="Registration" class="auth-form">
			<div class="auth-form__title">
				Регистрация
			</div>
			<input type="text" v-model="username" class="auth-form__field" placeholder="Логин" required>
			<input type="email" v-model="email" class="auth-form__field" placeholder="Email" required>
			<input type="password" v-model="password" class="auth-form__field" placeholder="Пароль" required>
			<button class="auth-form__submit-btn">
				<icon v-if="loading" class="auth-form__submit-btn__icon" icon="bug" spin />
				Создать аккаунт
			</button>
			<router-link :to="{name: 'Login'}" class="auth-form__extra-link">
				Войти в аккаунт
			</router-link>
		</form>
	</div>
</template>

<script>
	import '@/assets/css/account/auth-form.css'

	export default {
		name: 'Register',
		data: () => ({
			username: '',
			email: '',
			password: '',
			loading: false
		}),
		methods: {
			async Registration() {
				this.loading = true
				var result = await this.$store.dispatch('userRegistration', {
					username: this.username,
					email: this.email,
					password: this.password
				})
				this.loading = false

				this.$store.commit('showNotification', {
					message: result.message,
					type: result.success ? 'success' : 'error'
				})
				
				if(result.success) this.$router.push({name: 'Login'})
			}
		}
	}
</script>