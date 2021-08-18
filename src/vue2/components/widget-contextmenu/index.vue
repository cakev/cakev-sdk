<template lang="pug">
d-contextmenu(:style="style", :list="list")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import style from './style'
import copyWidget from './copyWidget'
import removeWidget from './removeWidget'
import moveWidget from './moveWidget'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const sceneList = Object.values(manager.screen.currentScreen.scenes)
		const children = sceneList.map(item => {
			return {
				label: item.name,
				disabled: item.id === manager.screen.currentScene.id,
				handler: () => moveWidget(item.id),
			}
		})
		const list = [
			{
				label: '移动组件',
				children,
			},
			{
				label: '复制组件',
				handler: copyWidget,
			},
			{
				label: '删除组件',
				handler: removeWidget,
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
