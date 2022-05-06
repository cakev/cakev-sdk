<template lang="pug">
.d-manage-modal-control-data
	c-collapse(title="数据请求", :show="true")
		c-control(label="数据类型")
			template(slot="right")
				i-select(v-model="apiType", :style="{ width: '208px' }")
					i-option(value="静态数据") 静态数据
					i-option(value="API接口") API接口
		c-control(label="接口地址", v-if="apiType === 'API接口'")
			template(slot="right")
				i-input(v-model="editor.current.widget.widgetApi.url")
		c-control(v-if="apiType === 'API接口'")
			template(slot="right")
				i-select(v-model="editor.current.widget.widgetApi.method", :style="{ marginRight: '10px', width: '100px' }")
					i-option(value="GET") GET
					i-option(value="POST") POST
					i-option(value="PUT") PUT
					i-option(value="DELETE") DELETE
					i-option(value="PATCH") PATCH
				i-input(v-model="editor.current.widget.widgetApi.path", :style="{ width: '100px' }")
		c-control(label="请求参数")
			template(slot="bottom")
				c-code(
				lang="json",
				:code="typeof editor.current.widget.widgetApi.params === 'string' ? editor.current.widget.widgetApi.params : JSON.stringify(editor.current.widget.widgetApi.params)",
				@update:code="value => (editor.current.widget.widgetApi.params = JSON.parse(value))")
		c-control(label="响应数据")
			template(slot="bottom")
				c-code( lang="json", :code="editor.current.widget.widgetApi.data", @update:code="updateData")
	c-collapse(
		type="eye"
		title="数据过滤器",
		:enable="editor.current.widget.widgetApi.processEnable",
		@open-click="editor.current.widget.widgetApi.processEnable = true",
		@close-click="editor.current.widget.widgetApi.processEnable = false")
		c-control(label="数据过滤器",)
			template(slot="bottom")
				c-code(
					:code="editor.current.widget.widgetApi.processBody",
					@update:code="value => (editor.current.widget.widgetApi.processBody = value)")
	c-collapse(
		type="eye"
		title="自动更新",
		:enable="editor.current.widget.widgetApi.autoFetchEnable",
		@open-click="editor.current.widget.widgetApi.autoFetchEnable = true",
		@close-click="editor.current.widget.widgetApi.autoFetchEnable = false")
		c-control
			template(slot="right")
				i-input-number(
					:min="1",
					:step="1",
					:formatter="value => `${value} ms`",
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
		apiData: {
			get() {
				const req = this.getItemValue('widgetApi.data')
				if (typeof req === 'object') {
					try {
						return JSON.stringify(req, null, '\t')
					} catch (e) {
						// @ts-ignore
					}
				} else {
					if (req) {
						try {
							return JSON.stringify(JSON.parse(req), null, '\t')
						} catch (e) {
							// @ts-ignore
						}
					}
					return ''
				}
			},
			set(v) {
				const data = this.getItemObj('widgetApi.data')
				const prop = 'widgetApi.data'.split('.').reverse()[0]
				if (v) {
					try {
						data[prop] = JSON.stringify(JSON.parse(v))
					} catch (err) {
						console.log(
							`${this.editor.current.widget.widgetBase.name} ${this.editor.current.widget.widgetBase.version} JSON 格式化 响应数据有错误信息！！！`,
						)
						console.log(err.stack)
					}
				} else {
					data[prop] = ''
				}
			},
		},
	},
}
</script>
