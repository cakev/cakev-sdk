<template lang="pug">
d-contextmenu(:style="style", :list="list")
</template>
<script lang="ts">
import style from './style'
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import copyWidget from './copyWidget'
import removeWidget from './removeWidget'
import moveWidget from './moveWidget'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const sceneList = Object.values(manager.screen.currentScreen.scenes)
		const children = sceneList.map(item => {
			const now: contextmenu = item
			now.label = item.name
			now.disabled = item.id === manager.screen.currentScene.id
			now.handler = () => moveWidget(item.id)
			return now
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
