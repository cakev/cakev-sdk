<template lang="pug">
d-contextmenu(:style="style", :list="list")
</template>
<script lang="ts">
import style from './style'
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import removeScene from './removeScene'
import clearScene from './clearScene'

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
				disabled: manager.screen.currentScene.id === '-1' || manager.screen.currentScene.id === '0',
				handler: () => props.editableScene(manager.screen.currentScene.id),
			},
			{
				label: '删除场景',
				disabled: manager.screen.currentScene.id === '-1' || manager.screen.currentScene.id === '0',
				handler: removeScene,
			},
			{
				label: '清空场景',
				handler: clearScene,
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
