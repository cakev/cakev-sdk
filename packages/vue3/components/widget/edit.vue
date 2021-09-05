<template lang="pug">
vdr(
	:id="$attrs.id",
	:x="$attrs.x",
	:y="$attrs.y",
	:w="$attrs.width",
	:h="$attrs.height",
	:draggable="!$attrs.lock && manager.screen.currentWidgets.includes($attrs.id) && !manager.temporary.editorContentDrag",
	:active="manager.screen.currentWidgets.includes($attrs.id)",
	:z="style({ ...$attrs, ...$props }).zIndex",
	:scale-ratio="manager.temporary.zoom",)
	dorring-widget(v-bind="{ ...manager.screen.currentScreen.widgets[$attrs.id], ...$attrs, ...$props }")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import vdr from '@dorring/sdk/vue3/components-style/d-vdr/index.vue'
import style from './style'

export default defineComponent({
	name: 'dorring-widget-edit',
	components: { vdr },
	props: {
		readonly: {
			default: true,
			type: Boolean,
		},
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			style,
		}
	},
})
</script>
