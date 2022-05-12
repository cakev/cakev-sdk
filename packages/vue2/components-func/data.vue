<template lang="pug">
.d-manage-modal-control-data
	c-collapse(title="数据请求", :value="true")
		c-control(label="数据类型")
			template(slot="right")
				c-select(v-model="apiType", :style="{ width: '208px' }")
					c-select-option(value="静态数据" label="静态数据")
					c-select-option(value="API接口" label="API接口")
		c-control(label="接口地址", v-if="apiType === 'API接口'")
			template(slot="right")
				c-input(v-model="editor.current.widget.widgetApi.url")
		c-control(v-if="apiType === 'API接口'")
			template(slot="right")
				c-select(v-model="editor.current.widget.widgetApi.method", :style="{ marginRight: '10px', width: '100px' }")
					c-select-option(value="GET" label="GET") 
					c-select-option(value="POST" label="POST") 
					c-select-option(value="PUT" label="PUT") 
					c-select-option(value="DELETE" label="DELETE") 
					c-select-option(value="PATCH" label="PATCH") 
				c-input(v-model="editor.current.widget.widgetApi.path", :style="{ width: '100px' }")
		c-control(label="请求参数")
			template(slot="bottom")
				c-code(lang="json", v-model="editor.current.widget.widgetApi.params")
		c-control(label="响应数据")
			template(slot="bottom")
				c-code(lang="json", v-model="editor.current.widget.widgetApi.data")
	c-collapse(
		type="eye"
		title="数据过滤器",
		:enable="editor.current.widget.widgetApi.processEnable",
		@open-click="editor.current.widget.widgetApi.processEnable = true",
		@close-click="editor.current.widget.widgetApi.processEnable = false")
		c-control(label="数据过滤器",)
			template(slot="bottom")
				c-code(v-model="editor.current.widget.widgetApi.processBody")
	c-collapse(
		type="eye"
		title="自动更新",
		:enable="editor.current.widget.widgetApi.autoFetchEnable",
		@open-click="editor.current.widget.widgetApi.autoFetchEnable = true",
		@close-click="editor.current.widget.widgetApi.autoFetchEnable = false")
		c-control
			template(slot="right")
				c-input(
					append="ms"
					v-model="editor.current.widget.widgetApi.autoFetchDuration")
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import DataEvent from '@/vue2/components-right/data-event/index.vue'

export default {
	name: 'func-data',
	mixins: [func],
	components: {
		DataEvent,
	},
	methods: {
		updateData(val: any): void {
			this.editor.current.widget.widgetApi.data = val
		},
	},
	computed: {
		apiType: {
			get() {
				if (this.editor.current.widget.widgetApi.url) {
					return 'API接口'
				} else {
					return '静态数据'
				}
			},
			set(val) {
				if (val === '静态数据') {
					this.editor.current.widget.widgetApi.url = ''
				} else {
					this.editor.current.widget.widgetApi.url = '/'
				}
			},
		},
	},
}
</script>
