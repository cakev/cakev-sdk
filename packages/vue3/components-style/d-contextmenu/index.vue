<template lang="pug">
.d-contextmenu.pos-f.cursor-nomral.z-index-999
	slot(name="header")
	ul.d-contextmenu-list
		li.d-contextmenu-item.pos-r.fn-flex(
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
	slot(name="bottom")
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { defineComponent, reactive } from 'vue'
import dSvg from '@dorring/sdk/vue3/components-style/d-svg/index.vue'

export default defineComponent({
	name: 'd-contextmenu',
	components: {
		dSvg,
	},
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
		const state = reactive({ manager })
		const click = item => {
			if (!item.disabled) {
				state.manager.temporary.sceneRightMenu = false
				state.manager.temporary.widgetRightMenu = false
				state.manager.temporary.widgetsRightMenu = false
				typeof item.handler === 'function' && item.handler()
			}
		}
		return {
			click,
		}
	},
})
</script>
<style lang="scss" scoped>
.d-contextmenu-list {
	width: 200px;
	padding: 8px 0;
	color: #fff;
	background-color: #222;
	border-radius: 2px;
	box-shadow: 0 5px 17px rgba(0, 0, 0, 0.2), 0 2px 7px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #000,
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
	box-shadow: 0 5px 17px rgba(0, 0, 0, 0.2), 0 2px 7px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #000,
		0 0 0 0.5px rgba(0, 0, 0, 0.1);
}

.d-contextmenu-item,
.d-contextmenu-child-list {
	align-items: center;
	padding: 0 16px;
	line-height: 24px;

	&:hover {
		background-color: var(--el-color-primary);

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
