<template lang="pug">
.widget-layer-box.cursor-nomral.fn-flex.flex-row.pos-r(
	:key="$attrs.id",
	:class="{ active: manager.screen.currentWidgets.includes($attrs.id) }",
	@click="selectWidgetById($event, $attrs.id)")
	d-img.widget-layer-img(:src="manager.screen.currentScreen.widgets[$attrs.id].avatar")
	span.ellipsis {{ manager.screen.currentScreen.widgets[$attrs.id].name }}
	d-svg(type="eye")
	d-svg(type="el-icon-lock")
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import selectWidgetById from './selectWidgetById'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		return {
			...toRefs(state),
			selectWidgetById,
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
	}

	&.active {
		background-color: #daebf7;
		border-color: transparent;
	}

	span {
		flex: 1;
		margin-left: 10px;
		text-align: center;
	}
}

.widget-layer-img {
	width: 60px;
	height: 30px;
}
</style>
