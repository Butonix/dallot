<template>
	<transition name="notification">
		<div v-if="this.$store.getters.showNotification" :class="'notification ' + this.$store.getters.notificationType + '-notification'">
			<div class="notification__message">
				{{this.$store.getters.notificationMessage}}
			</div>
			<icon @click="closeNotification" class="notification__close-btn" icon="times" />
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'Notifications',
		methods: {
			closeNotification() {
				this.$store.commit('closeNotification')
			}
		}
	}
</script>

<style>
.notification {
	position: fixed;
	top: 30px;
	right: 30px;
	width: 350px;
	padding: 15px;
	font-size: 17px;
	line-height: 25px;
	border-radius: 3px;
	display: flex;
	justify-content: space-between;
}

.success-notification {
	background: #d4edda;
	border-bottom: 5px solid #99CC99;
	color: #155724;
}

.error-notification {
	background: #f8d7da;
	border-bottom: 5px solid #F8aaaa;
	color: #721c24;
}

.notification__close-btn {
	align-self: center;
	cursor: pointer;
	margin-left: 15px;
}

.notification-enter-active, .notification-leave-active {
	transition: .4s;
}

.notification-leave-to, .notification-enter {
	right: -380px;
}
</style>