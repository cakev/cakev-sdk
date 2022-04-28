<template lang="pug">
.d-manage-modal-control-base
	d-right-control(label="组件市场")
		i-select(
			v-model="editor.currentWidget.config.widget.componentVersion",
			:style="{ marginRight: '10px', width: '156px' }")
			i-option(:value="item.componentVersion", v-for="(item, i) in versionList", :key="i") {{ item.componentVersion }}
		i-switch(v-model="editor.currentWidget.market")
</template>
<script lang="ts">
import func from './func.mx'
import { Component } from 'vue-property-decorator'
import { getVersionList } from '@/vue2/api/marketComponent.api'

@Component
export default class FuncCustom extends func {
	versionList = []

	async getVersionList() {
		const res = await getVersionList({
			componentEnTitle: this.editor.currentWidget.type,
		})
		this.versionList = res
	}

	mounted() {
		if (this.editor.currentWidget.market) {
			this.getVersionList()
		}
	}
}
</script>
