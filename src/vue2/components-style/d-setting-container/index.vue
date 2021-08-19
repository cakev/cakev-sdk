<template lang="pug">
.d-setting-container
	.d-setting-container-title
		slot(name="title")
	.d-setting-container-content
		el-form(label-width="80px", label-position="left")
			slot(name="content")
</template>
<style lang="scss" scoped>
.d-setting-container {
	border-top: 1px solid #e5e5e5;
}

.d-setting-container-content {
	padding: 0 16px;
}
</style>
