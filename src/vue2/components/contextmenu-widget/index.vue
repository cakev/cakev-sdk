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
import cancelGroup from './cancelGroup'
import lockWidget from './lockWidget'

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
		const group = []
		if (manager.screen.currentScreen.widgets[manager.screen.currentWidgets[0]].group) {
			group.push({
				label: '取消拼合',
				handler: cancelGroup,
			})
		}
		const list = [
			{
				label: '移动组件',
				children,
			},
			{
				label: '复制组件',
				handler: copyWidget,
			},
			...group,
			{
				label: '锁定/解锁',
				handler: lockWidget,
			},
			{
				label: '删除组件',
				handler: removeWidget,
			},
		]
		const state = reactive({ manager, list })
		return {
			...toRefs(state),
			style,
		}
	},
}
</script>
