<template lang="pug">
widget-base.dorring-decorate-2(v-bind="$attrs")
</template>
<script lang="ts">
import widgetBase from '@dorring/sdk/vue3/widget/base'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-decorate-2',
	components: {
		widgetBase,
	},
})
</script>
