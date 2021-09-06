<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '尺寸' }]")
	template(#content)
		el-form-item(label="屏幕大小")
			el-select(v-model="size")
				el-option(v-for="item in screenSize", :key="item.value", :value="item.value", :label="item.label")
		el-form-item(label-width="0px")
			d-input(v-model="manager.screen.currentScreen.width", format="number", prepend="W" title="宽度")
			d-input(
				v-model="manager.screen.currentScreen.height",
				format="number",
				prepend="H"
				title="高度")
d-colors(v-model:list="manager.screen.currentScreen.backgroundColor" v-model:direction="manager.screen.currentScreen.gradientDirection")
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '其他' }]")
	template(#content)
		el-form-item(label="适配方式", style="width: 100%")
			el-select(v-model="manager.screen.currentScreen.layoutMode")
				el-option(:value="item.value", :label="item.label", v-for="item in layoutMode")
		el-form-item(label="首场景", style="width: 100%")
			el-select(v-model="manager.screen.currentScreen.mainScene")
				el-option(
					:value="item.id",
					:label="item.name",
					v-for="item in Object.values(manager.screen.currentScreen.scenes)")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import screenSize from '@dorring/sdk/config/screenSize'
import layoutMode from '@dorring/sdk/config/layoutMode'
import size from './size'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'
import dColors from '@dorring/sdk/vue3/components-style/d-colors/index.vue'

export default defineComponent({
	name: 'setting-editor-setting',
	components: {
		dTitles,
		dColor,
		dColors,
		dInput,
		dSettingContainer,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		return {
			...toRefs(state),
			size,
			layoutMode,
			screenSize,
		}
	},
})
</script>
