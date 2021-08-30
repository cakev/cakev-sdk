<template lang="pug">
d-contextmenu.contextmenu-screen(:list="list")
	template(#header)
		d-svg.top-icon.pos-r(type="el-icon-caret-top" :size="16")
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'contextmenu-screen',
	props: {
		list: {
			type: Array,
			default() {
				return []
			},
		},
	},
})
</script>
<style lang="scss" scoped>
.contextmenu-screen {
	top: 48px;
}
.top-icon {
	color: #222;
	top: 7px;
	left: 50%;
	margin-left: -8px;
}
</style>
