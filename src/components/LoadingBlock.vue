<template>
    <div class="loading-block space-y-3 my-auto">
		<div class="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
		<p class="">{{ text ?? 'Loading...'}}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text?: string;
}>();
</script>

<style scoped>
.loading-block {
		display: flex;
		flex-direction: column;	
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #555;
}
</style>