<template lang="pug">
.d-manage-modal-control-base
	c-right-control(label="组件市场")
		template(slot="right")
			i-select(
				v-model="editor.current.widget.config.widget.widgetVersion",
				:style="{ marginRight: '10px', width: '156px' }")
				i-option(:value="item.widgetVersion", v-for="(item, i) in versionList", :key="i") {{ item.widgetVersion }}
			c-switch(v-model="editor.current.widget.widgetMarket")
</template>
<script lang="ts">
import func from './func.mx'
import { getVersionList } from '@/vue2/api/marketComponent.api'

export default {
	name: 'func-custom',
	data() {
		return {
			versionList: [],
		}
	},
	mixins: [func],
	methods: {
		async getVersionList() {
			const res = await getVersionList({
				widgetType: this.editor.current.widget.type,
			})
			this.versionList = res
		},
	},
	mounted() {
		if (this.editor.current.widget.widgetMarket) {
			this.getVersionList()
		}
	},
}
</script>
