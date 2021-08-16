<template lang="pug">
el-image(v-bind="$attrs", v-on="$listeners")
	.d-img-error.fn-flex(slot="error")
		i.el-icon-picture-outline
</template>
<style lang="scss" scoped>
/deep/ {
	.d-img-error {
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,0.2);
	}
}
</style>
