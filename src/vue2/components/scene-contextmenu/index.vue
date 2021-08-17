<template lang="pug">
d-contextmenu(:style="style", :list="list")
</template>
<script lang="ts">
import style from './style'
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'

export default {
	props: {
		editableScene: {
			type: Function,
		},
	},
	setup(props) {
		const manager: Manager = Manager.Instance()
		const list = [
			{
				label: '重命名场景',
				handler: () => props.editableScene(manager.screen.currentScene.id),
			},
		]
		const state = reactive({ list })
		return {
			...toRefs(state),
			style,
		}
	},
}
</script>
