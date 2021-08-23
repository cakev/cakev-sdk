<template lang="pug">
el-image(v-bind="$attrs")
	.d-img-error.fn-flex(slot="error")
		span Dorring
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'dorring-img',
})
</script>
<style lang="scss" scoped>
/deep/ {
	.d-img-error {
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
</style>
