import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/Home.vue')
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('@/views/About.vue')
		},
		{
			path: '/account/profile',
			name: 'Profile',
			component: () => import('@/components/account/Profile.vue')
		},
		{
			path: '/account/login',
			name: 'Login',
			component: () => import('@/components/account/Login.vue')
		},
		{
			path: '/account/register',
			name: 'Register',
			component: () => import('@/components/account/Register.vue')
		},
		{
			path: '/posts',
			name: 'Posts',
			component: () => import('@/components/posts/Posts.vue')
		},
		{
			path: '/posts/new',
			name: 'NewPost',
			component: () => import('@/components/posts/New.vue')
		},
		{
			path: '/posts/:id',
			name: 'Post',
			props: true,
			component: () => import('@/components/posts/Post.vue')
		}
	]
})