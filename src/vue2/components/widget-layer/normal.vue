<template lang="pug">
.widget-layer-box.cursor-nomral.fn-flex.flex-row.pos-r(
	:key="$attrs.id",
	:class="{ active: manager.screen.currentWidgets.includes($attrs.id), hide: $attrs.hide, lock: $attrs.lock }",
	@click="selectWidgetById($event, $attrs.id)")
	d-img.widget-layer-img(:src="manager.screen.currentScreen.widgets[$attrs.id].avatar")
	span.ellipsis {{ manager.screen.currentScreen.widgets[$attrs.id].name }}
	.icon-box.pos-a.fn-flex
		d-svg.icon.icon-lock(type="lock", v-if="$attrs.lock", @click="unlock($attrs)")
		d-svg.icon(type="unlock", v-if="!$attrs.lock", @click="lock($attrs)")
		d-svg.icon(type="see-open", v-if="!$attrs.hide", @click="hide($attrs)")
		d-svg.icon.icon-see-close(type="see-close", v-if="$attrs.hide", @click="show($attrs)")
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import selectWidgetById from './selectWidgetById'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		const hide = obj => {
			manager.screen.sceneWidgetsBySortList[obj.index].hide = true
		}
		const show = obj => {
			manager.screen.sceneWidgetsBySortList[obj.index].hide = false
		}
		const unlock = obj => {
			manager.screen.sceneWidgetsBySortList[obj.index].lock = false
		}
		const lock = obj => {
			manager.screen.sceneWidgetsBySortList[obj.index].lock = true
		}
		return {
			...toRefs(state),
			selectWidgetById,
			hide,
			show,
			unlock,
			lock,
		}
	},
}
</script>
<style lang="scss" scoped>
.widget-layer-box {
	align-items: center;
	height: 44px;
	padding: 0 10px;
	color: #333;
	border: 1px solid transparent;

	&:hover {
		border-color: #409eff;
		.icon {
			visibility: visible;
		}
	}

	&.active {
		background-color: #daebf7;
		border-color: transparent;
	}
	&.hide {
		color: #99a5ad;
		.icon-see-close {
			visibility: visible;
		}
	}
	&.lock {
		.icon-lock {
			visibility: visible;
		}
	}
	span {
		flex: 1;
		margin-left: 10px;
		text-align: center;
		padding-right: 38px;
	}
}
.icon-box {
	right: 0;
	padding-right: 10px;
	.icon {
		margin-right: 4px;
		visibility: hidden;
	}
}
.widget-layer-img {
	width: 60px;
	height: 30px;
}
</style>
