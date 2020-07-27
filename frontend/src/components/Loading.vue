<template>
	<div class="loading">
		<icon class="loading__icon" icon="bug" spin />
	</div>
</template>

<script>
	export default {
		name: 'Loading'
	}
</script>

<style>
.loading {
	text-align: center;
}

.loading__icon {
	font-size: 50px;
	margin: 150px 0;
	color: #fff;
}
</style>