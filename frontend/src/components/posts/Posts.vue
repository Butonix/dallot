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
					{{post.text.slice(0, 200)}}...
				</div>
				<div class="posts-list__post-footer">
					<div class="posts-list__post-footer__half">
						<div class="posts-list__post-info">
							<icon :icon="['far', 'eye']" class="posts-list__post-info__icon" />{{post.views}}
						</div>
						<div class="posts-list__post-info">
							<icon :icon="['far', 'comment-alt']" class="posts-list__post-info__icon" />{{post.views}}
						</div>
						<div class="posts-list__post-info">
							<icon :icon="['far', 'bookmark']" class="posts-list__post-info__icon" />{{post.views}}
						</div>
					</div>
					<div class="posts-list__post-footer__half">
						<div class="posts-list__post-info" style="margin-right: 0;">
							<icon icon="chevron-up" class="posts-list__post-info__icon" />
							{{post.views}}
							<icon icon="chevron-down" class="posts-list__post-info__icon" style="margin: 0 0 0 8px;" />
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
			this.posts = await this.$store.dispatch('GetPosts')
			this.$store.commit('showExtraContentBox')
		},
		destroyed() {
			this.$store.commit('unshowExtraContentBox')
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
	font-size: 17px;
	transition: .2s;
}

.posts-list__post-info__icon:hover {
	color: #999;
	cursor: pointer;
}
</style>