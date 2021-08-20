<template lang="pug">
.widget-layer-box.cursor-nomral.fn-flex.flex-row.pos-r(
	:key="$attrs.id",
	:class="{ active: manager.screen.currentWidgets.includes($attrs.id), hide: $attrs.hide, lock: $attrs.lock }",
	@click="selectWidgetById($event, $attrs.id)")
	slot
	d-img.widget-layer-img(:src="manager.screen.currentScreen.widgets[$attrs.id].avatar")
	span.ellipsis {{ manager.screen.currentScreen.widgets[$attrs.id].name }}
	.icon-box.pos-a.fn-flex
		d-svg.icon.icon-lock(type="lock", v-if="lockable && $attrs.lock", @click="unlock($attrs.id)")
		d-svg.icon(type="unlock", v-if="lockable && !$attrs.lock", @click="lock($attrs.id)")
		d-svg.icon(type="see-open", v-if="!$attrs.hide", @click="hide($attrs.id)")
		d-svg.icon.icon-see-close(type="see-close", v-if="$attrs.hide", @click="show($attrs.id)")
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import selectWidgetById from './selectWidgetById'

export default {
	props: {
		lockable: {
			type: Boolean,
			default: true,
		},
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		const hide = id => {
			manager.screen.currentScreen.widgets[id].hide = true
			manager.screen.currentScreen.widgets = { ...manager.screen.currentScreen.widgets }
		}
		const show = id => {
			manager.screen.currentScreen.widgets[id].hide = false
			manager.screen.currentScreen.widgets = { ...manager.screen.currentScreen.widgets }
		}
		const unlock = id => {
			manager.screen.currentScreen.widgets[id].lock = false
			manager.screen.currentScreen.widgets = { ...manager.screen.currentScreen.widgets }
		}
		const lock = id => {
			manager.screen.currentScreen.widgets[id].lock = true
			manager.screen.currentScreen.widgets = { ...manager.screen.currentScreen.widgets }
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
	flex: 1;
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
		padding-right: 38px;
		margin-left: 10px;
		text-align: center;
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
