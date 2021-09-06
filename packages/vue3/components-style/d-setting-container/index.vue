<template lang="pug">
.d-setting-container
	.d-setting-container-title
		slot(name="title")
	.d-setting-container-content
		el-form(label-width="100px", label-position="left")
			slot(name="content")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'd-setting-container',
})
</script>
<style lang="scss" scoped>
.d-setting-container {
	border-top: 1px solid #e5e5e5;
}

.d-setting-container-content {
	padding: 0 16px;
}
</style>
