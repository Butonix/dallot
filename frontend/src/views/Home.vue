<template>
	<div>
		<Loading />
	</div>
</template>

<script>
	export default {
		name: 'Home',
		components: {
			Loading: () => import('@/components/Loading.vue')
		}
	}
</script>