<template lang="pug">
el-image(v-bind="$attrs")
	template(#error)
		.d-img-error.fn-flex
			span Dorring
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'd-img',
})
</script>
<style lang="scss" scoped>
::v-deep(.d-img-error) {
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
}
</style>
