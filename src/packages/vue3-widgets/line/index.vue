<template lang="pug">
widget-base.line1(v-bind="$attrs") line1
</template>
<script lang="ts">
import widgetBase from '@dorring-sdk/vue3/widget/base'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-line-1',
	components: {
		widgetBase,
	},
})
</script>
<style lang="scss" scoped>
.line1 {
	color: #333;
}
</style>
