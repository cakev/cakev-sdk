<template lang="pug">
widget-base.pie1 pie1
</template>
<script lang="ts">
import widgetBase from '@/vue3/widget/base'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-pie-1',
	components: {
		widgetBase,
	},
})
</script>
<style lang="scss" scoped>
.pie1 {
	color: #333;
}
</style>
