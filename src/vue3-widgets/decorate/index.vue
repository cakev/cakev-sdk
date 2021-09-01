<template lang="pug">
widget-base.line1(v-bind="$attrs") {{$attrs.data[0]}}
</template>
<script lang="ts">
import widgetBase from '@/vue3/widget/base'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-decorate-1',
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
