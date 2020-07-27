<template>
	<div>
		<form @submit.prevent="Registration" class="auth-form">
			<div class="auth-form__title">
				Регистрация
			</div>
			<input type="text" v-model="username" class="auth-form__field" placeholder="Логин" required>
			<input type="email" v-model="email" class="auth-form__field" placeholder="Email" required>
			<input type="password" v-model="password" class="auth-form__field" placeholder="Пароль" required>
			<input type="submit" class="auth-form__submit-btn" value="Создать аккаунт">
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
		}),
		methods: {
			async Registration() {
				alert('Register')
			}
		}
	}
</script>