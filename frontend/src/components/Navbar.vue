<template>
	<div class="navbar">
		<div class="navbar__logo">
			<router-link :to="{name: 'Home'}">
				<img src="@/assets/logo.png" alt="Dallot">
			</router-link>
		</div>
		<div class="navbar__menu">
			<ul class="navbar__main-menu">
				<li>
					<router-link :to="{name: 'Posts'}" class="navbar__main-link">
						Посты
					</router-link>
					<ul v-if="this.$store.getters.isUserAuthenticated" class="navbar__extra-menu">
						<li>
							<router-link :to="{name: 'NewPost'}" class="navbar__extra-link">
								Создать пост
							</router-link>
						</li>
					</ul>
				</li>
				<li v-if="this.$store.getters.isUserAuthenticated">
					<router-link :to="{name: 'Profile'}" class="navbar__main-link">
						{{this.$store.getters.username}}
					</router-link>
					<ul class="navbar__extra-menu">
						<li>
							<a @click="Logout" class="navbar__extra-link" style="cursor: pointer;">Выход</a>
						</li>
					</ul>
				</li>
				<li v-else>
					<router-link :to="{name: 'Login'}" class="navbar__main-link">
						Вход
					</router-link>
					<ul class="navbar__extra-menu">
						<li>
							<router-link :to="{name: 'Register'}" class="navbar__extra-link">
								Регистрация
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Navbar',
		methods: {
			Logout() {
				this.$store.commit('logout')
				this.$store.commit('showNotification', {
					message: 'Пока-пока, заходи еще',
					type: 'success'
				})
				this.$router.push({name: 'Home'})
			}
		}
	}
</script>

<style>
.navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 30px;

	/*
	position: sticky;
	top: 0;
	background: #2a2a2a;
	*/
}

.navbar__logo img {
	width: 40px;
	height: 40px;
	display: block;
}

.navbar__main-menu {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}

.navbar__main-menu > li {
	margin-left: 60px;
	font-size: 18px;
	text-transform: uppercase;
	position: relative;
}

.navbar__main-link {
	color: #fff;
	text-decoration: none;
	position: relative;
	transition: .2s;
}

.navbar__main-link:hover {
	color: #fce38a
}

.navbar__main-link.active:after {
	content: "";
	position: absolute;
	height: 2px;
	width: 100%;
	top: -7px;
	left: 0;
	background: #fce38a;
	transition: .2s;
}

.navbar__main-link:hover + .navbar__extra-menu, .navbar__extra-menu:hover {
	max-height: 100px;
	opacity: 1;
}

.navbar__extra-menu {
	position: absolute;
	top: 25px;
	right: -3px;
	padding: 0;
	opacity: 0;
	max-height: 0;
	overflow: hidden;
	list-style: none;
	border-radius: 5px;
	border: 3px solid #2a2a2a;
	background: #fff;
	text-transform: none;
	transition: .4s;
}

.navbar__extra-menu > li {
	border-bottom: 1px solid powderblue;
}

.navbar__extra-menu > li:last-child {
	border-bottom: none;
}

.navbar__extra-link {
	text-decoration: none;
	color: #3498db;
	font-size: 16px;
	text-align: right;
	white-space: nowrap;
	padding: 7px 10px;
	display: block;
	border-radius: 3px;
	transition: .2s;
}

.navbar__extra-link:hover {
	background: #eee;
}
</style>