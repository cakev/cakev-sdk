<template lang="pug">
widget-base.dorring-decorate-1(v-bind="$attrs")
</template>
<script lang="ts">
import widgetBase from '@dorring/sdk/vue3/widget/base'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-decorate-1',
	components: {
		widgetBase,
	},
})
</script>
