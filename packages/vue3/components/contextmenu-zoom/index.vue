<template lang="pug">
d-contextmenu.contextmenu-zoom(:list="list")
	template(#header)
		d-svg.top-icon.pos-r(type="el-icon-caret-top" :size="16")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import dContextmenu from '@dorring/sdk/vue3/components-style/d-contextmenu/index.vue'
import dSvg from '@dorring/sdk/vue3/components-style/d-svg/index.vue'

export default defineComponent({
	name: 'contextmenu-zoom',
	components: {
		dContextmenu,
		dSvg,
	},
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
.contextmenu-zoom {
	top: 48px;
	right: 10px;
}
.top-icon {
	color: #222;
	top: 7px;
	left: 80%;
}
</style>
