<template lang="pug">
el-input.d-input(v-bind="$attrs", v-on="$listeners")
	template(slot="append") {{ $slots.append[0].text }}
</template>
<style lang="scss" scoped>
.d-input {
	&::v-deep {
		.el-input-group__append {
			padding: 0 10px;
		}
	}
}
</style>
