<template lang="pug">
dorring-widget-group(v-if="$attrs.group", v-bind="$attrs")
dorring-widget-normal(v-else, v-bind="$attrs")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import dorringWidgetGroup from '@/vue3/components/widget/group.vue'
import dorringWidgetNormal from '@/vue3/components/widget/normal.vue'

export default defineComponent({
	name: 'dorring-widget',
	components: {
		dorringWidgetGroup,
		dorringWidgetNormal,
	},
})
</script>
