<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '数据类型' }]")
	template(#content)
		el-form-item(label="常用类型")
			d-select(v-model="apiType" :list="api")
template(v-if="currentWidget.api")
	d-setting-container(v-if="currentWidget.api.url")
		template(#title)
			d-titles(:list="[{ label: 'API配置' }]")
		template(#content)
			el-form-item(label="地址")
				d-input(v-model="currentWidget.api.url")
			el-form-item(label="方式")
				el-select(v-model="currentWidget.api.method")
					el-option(value="GET", label="GET")
					el-option(value="POST", label="POST")
					el-option(value="DELETE", label="DELETE")
					el-option(value="HEAD", label="HEAD")
					el-option(value="OPTIONS", label="OPTIONS")
					el-option(value="PUT", label="PUT")
					el-option(value="PATCH", label="PATCH")
					el-option(value="PURGE", label="PURGE")
					el-option(value="LINK", label="LINK")
					el-option(value="UNLINK", label="UNLINK")
			el-form-item(label="路径")
				d-input(v-model="currentWidget.api.path")
			el-form-item
				el-button(@click="test") 测试接口
	d-setting-container(v-if="currentWidget.api.url")
		template(#title)
			d-titles(:list="[{ label: '请求参数' }]")
		template(#content)
			el-form-item(labelWidth="0px")
				d-code(v-model="currentWidget.api.params")
	d-setting-container(v-if="currentWidget.api.url")
		template(#title)
			d-titles(:list="[{ label: '自动更新' }]")
		template(#content)
			el-form-item(label="开启")
				el-checkbox(v-model="currentWidget.api.loop")
			el-form-item(label="时长" v-if="currentWidget.api.loop")
				d-input(v-model="currentWidget.api.loopTime", format="number", prepend="ms")
d-setting-container(v-if="currentWidget.data.length")
	template(#title)
		d-titles(:list="[{ label: '数据内容' }]")
	template(#content)
		el-form-item(labelWidth="0px")
			d-code(v-model="currentWidget.data")
		el-form-item(label="数据过滤器" v-if="currentWidget.api&&currentWidget.api.url")
			d-input
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import currentWidget from './currentWidget'
import request from '@dorring/sdk/vue3/widget/request'
import apiType from './apiType'
import api from '@dorring/sdk/config/api'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSelect from '@dorring/sdk/vue3/components-style/d-select/index.vue'
import dCode from '@dorring/sdk/vue3/components-style/d-code/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'

export default defineComponent({
	name: 'setting-widget-data',
	components: {
		dTitles,
		dColor,
		dInput,
		dSelect,
		dCode,
		dSettingContainer,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		const test = () => {
			request({
				id: state.manager.screen.currentWidgets[0],
				...state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api,
			})
		}

		return {
			...toRefs(state),
			currentWidget,
			apiType,
			api,
			test,
		}
	},
})
</script>
