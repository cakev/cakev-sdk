<template lang="pug">
.func-group.fn-flex.flex-column
	d-right-swiper-list(
		:title="`${config.label} [${inputKey}]`",
		@add-click="handleAddClick",
		:list="obj[inputKey]",
		@remove-click="handleRemoveClick")
		template(v-slot="dataDefault")
			d-manage-item(
				v-for="(k, n) in config.children"
				:config="k",
				:key="n",
				:parentProp="inputKey",
				:parentIndex="dataDefault.index")
</template>
<script lang="ts">
import func from './func.mx'
import { Component } from 'vue-property-decorator'
import DManageItem from '@/vue2/components-right/d-right-setting/item.vue'

@Component({ components: { DManageItem } })
export default class FuncGroup extends func {
	handleAddClick(): void {
		const child = {}
		this.config.children.forEach(v => {
			child[v.prop] = ''
		})
		this.obj[this.inputKey].push(child)
	}

	handleRemoveClick(index): void {
		this.obj[this.inputKey].splice(index, 1)
	}
}
</script>
<style lang="scss" scoped>
.func-group-empty {
	span {
		padding: 5px 10px 0 10px;
		font-size: 12px;
		color: #bfbfbf;
	}
}

.func-group-tab {
	padding: 5px 10px 0 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid var(--borderGray);

	span {
		padding-bottom: 5px;
		margin-right: 10px;

		&:last-child {
			margin-bottom: 0;
		}

		&.active {
			color: var(--themeColor);
			border-bottom: 1px solid var(--themeColor);
		}
	}
}

.func-group {
	/deep/ + .d-manage-modal-control {
		margin-top: 10px;
	}
}
</style>
