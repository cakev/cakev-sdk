<template lang="pug">
ul.d-contextmenu.pos-f.cursor-nomral.z-index-999
	li.d-contextmenu-list.pos-r.fn-flex(
		v-for="item in list",
		:class="{ disabled: item.disabled }",
		@click.stop="click(item)")
		span.ellipsis {{ item.label }}
		d-svg(type="el-icon-caret-right", v-if="item.children")
		ul.d-contextmenu-child.pos-a(v-if="item.children")
			li.d-contextmenu-child-list(
				v-for="child in item.children",
				:class="{ disabled: child.disabled }",
				@click.stop="click(child)")
				span.ellipsis {{ child.label }}
</template>
<script lang="ts">
import Manager from '@/core/Manager'

export default {
	props: {
		list: {
			type: Array,
			default() {
				return []
			},
		},
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const click = item => {
			if (!item.disabled) {
				manager.temporary.sceneRightMenu = false
				manager.temporary.widgetRightMenu = false
				manager.temporary.widgetsRightMenu = false
				typeof item.handler === 'function' && item.handler()
			}
		}
		return {
			click,
		}
	},
}
</script>
<style lang="scss" scoped>
.d-contextmenu {
	width: 200px;
	padding: 8px 0;
	color: #fff;
	background-color: #222;
	border-radius: 2px;
	box-shadow:
		0 5px 17px rgba(0, 0, 0, 0.2),
		0 2px 7px rgba(0, 0, 0, 0.15),
		inset 0 0 0 0.5px #000,
		0 0 0 0.5px rgba(0, 0, 0, 0.1);
}

.d-contextmenu-child {
	top: 2px;
	left: 100%;
	display: none;
	min-width: 100px;
	padding: 8px 0;
	background-color: #222;
	border-radius: 2px;
	box-shadow:
		0 5px 17px rgba(0, 0, 0, 0.2),
		0 2px 7px rgba(0, 0, 0, 0.15),
		inset 0 0 0 0.5px #000,
		0 0 0 0.5px rgba(0, 0, 0, 0.1);
}

.d-contextmenu-list,
.d-contextmenu-child-list {
	align-items: center;
	padding: 0 16px;
	line-height: 24px;

	&:hover {
		background-color: #409eff;

		.d-contextmenu-child {
			display: block;
		}
	}

	&.disabled {
		color: #8f8f8f;
		background-color: transparent;
	}

	span {
		margin-right: auto;
	}
}
</style>
