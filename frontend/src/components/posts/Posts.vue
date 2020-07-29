<template>
	<div>
		<div class="posts-list" v-if="posts">
			<div v-for="post in posts" :key="post.id" class="content__block posts-list__post">
				<div class="posts-list__post-header">
					<router-link :to="{name: 'Post', params: {id: post.id}}">
						{{post.title}}
					</router-link>
				</div>
				<div class="posts-list__post-body">
					{{post.content.slice(0, 200)}}...
				</div>
				<div class="posts-list__post-footer">
					<div class="posts-list__post-footer__half">
						<div class="posts-list__post-info">
							<icon :icon="['far', 'eye']" class="posts-list__post-info__icon" />{{post.views}}
						</div>
						<div class="posts-list__post-info">
							<icon :icon="['far', 'comment-alt']" class="posts-list__post-info__icon" />0
						</div>
						<div class="posts-list__post-info">
							<icon :icon="[getIconPrefix(post.bookmark_users), 'bookmark']" class="posts-list__post-info__icon clickable" :class="getIconClass(post.bookmark_users)" />{{post.bookmark_users.length}}
						</div>
					</div>
					<div class="posts-list__post-footer__half">
						<div class="posts-list__post-info" style="margin-right: 0;">
							<icon @click="updatePostRating($event.target, post.id, 'raise')" icon="chevron-up" class="posts-list__post-info__icon clickable" :class="getIconClass(post.raised_rating_users)" />
							<div class="posts-list__post-info__value">
								{{post.rating}}
							</div>
							<icon @click="updatePostRating($event.target, post.id, 'drop')" icon="chevron-down" class="posts-list__post-info__icon clickable" :class="getIconClass(post.dropped_rating_users)" style="margin: 0 0 0 8px;" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<Loading v-else />
	</div>
</template>

<script>
	export default {
		name: 'Posts',
		data: () => ({
			posts: null
		}),
		async created() {
			var result = await this.$store.dispatch('getPosts')
			if(result.success)
				this.posts = result.posts
			else 
				this.$store.commit('showNotification', {
					message: result.message,
					type: 'error'
				})
			this.$store.commit('showExtraContentBox')
		},
		beforeDestroy() {
			this.$store.commit('unshowExtraContentBox')
		},
		methods: {
			getIconClass(users) {
				if(users.indexOf(this.$store.getters.userId) >= 0)
					return 'active'
				return ''
			},
			getIconPrefix(users) {
				if(users.indexOf(this.$store.getters.userId) >= 0)
					return 'fas'
				return 'far'
			},
			async updatePostRating(obj, id, action) {
				if(!this.$store.getters.isUserAuthenticated) {
					this.$store.commit('showNotification', {
						message: 'Нет, попробуй сначала авторизоваться',
						type: 'error'
					})
					return
				}

				if(obj.tagName == 'path')
					obj = obj.parentElement
		
				if(obj.classList.contains('active')) {
					var result = await this.$store.dispatch('restorePostRating', {
						id: id
					})
					if(result.success) {
						obj.classList.remove('active')
						obj.parentElement.querySelector('.posts-list__post-info__value').innerText = result.rating
					}
				} else {
					result = await this.$store.dispatch(action + 'PostRating', {
						id: id
					})
					if(result.success) {
						this.$store.commit('showNotification', {
							message: result.message,
							type: 'success'
						})
						for(var i = 0; i < obj.parentElement.childElementCount; i++)
							obj.parentElement.children[i].classList.remove('active')
						obj.classList.add('active')
						obj.parentElement.querySelector('.posts-list__post-info__value').innerText = result.rating
					}
				}
			}
		}
	}
</script>

<style>
/* posts */

.posts-list {
	
}

.posts-list__post {
	padding: 30px;
}

.posts-list__post-header {
	margin-bottom: 18px;
}

.posts-list__post-header > a {
	font-weight: 500;
	font-size: 23px;
	text-decoration: none;
	color: #000;
}

.posts-list__post-body {
	font-size: 16px;
	line-height: 24px;
}

.posts-list__post-footer {
	margin-top: 18px;
	display: flex;
	justify-content: space-between;
	font-size: 15px;
	font-weight: 500;
	color: #666;
}

.posts-list__post-footer__half {
	display: flex;
}

.posts-list__post-info {
	display: flex;
	align-items: center;
	margin-right: 20px;
}

.posts-list__post-info__icon {
	margin-right: 8px;
	font-size: 18px;
	transition: .1s;
}

.posts-list__post-info__icon.clickable:hover {
	color: #999;
	cursor: pointer;
}

.posts-list__post-info__icon.active {
	color: #2980b9;
}

.posts-list__post-info__icon.active.clickable:hover {
	color: #3498db;
}
</style>