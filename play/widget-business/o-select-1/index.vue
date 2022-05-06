<template lang="pug">
widget-normal(:eventTypes="eventTypes")
	ul.list
		li.pointer(v-for="(k, i) in data", :key="i", @click="change(k)", :class="{ active: k.value === selectValue }") {{ k.label }}
</template>
<script lang="ts">
// import { value, customConfig } from './index.component'
import widgetNormal from '@/vue2/components-open/Widget/normal.vue'
import widgetMixin from '@/vue2/mixins'

export default {
	name: 'o-select1',
	mixins: [widgetMixin],
	components: { widgetNormal },
	data() {
		return {
			// value: value,
			// customConfig: customConfig,
			eventTypes: [{ key: 'click1', label: '点击事件' }],
			selectValue: '',
			selectLabel: '',
		}
	},
	methods: {
		change(row) {
			this.selectValue = row.value
			this.__handleEvent__('click1', row)
		},
	},
	watch: {
		data: {
			handler(val) {
				if (val) {
					val.forEach(item => {
						if (item.value === this.selectValue) this.selectLabel = item.label
					})
				}
			},
			deep: true,
			immediate: true,
		},
		'config.config.defaultValue': {
			handler(val) {
				if (val) {
					this.selectValue = this.config.config.defaultValue
					this.data.forEach(item => {
						if (item.value === this.selectValue) {
							this.selectLabel = item.label
							this.__handleEvent__('click1', item)
						}
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.list {
	display: flex;
	li {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: none;
		padding: 4px 16px;
		font-size: 18px;
		color: rgba(255, 255, 255, 0.75);
		background: #023066;
		border: 1px solid #205a9e;
		border-right-width: 0;

		&:last-child {
			border-right-width: 1px;
		}

		&.active {
			font-weight: 600;
			color: #feffff;
			background: #205a9e;
			border-color: #00ddff;
		}

		&:not(:last-child).active:after {
			content: '';
			display: block;
			background: #00ddff;
			width: 1px;
			position: absolute;
			right: -1px;
			top: -1px;
			bottom: -1px;
			z-index: 2;
		}
	}
}
</style>
