<template lang="pug">
widget-normal
	span.hello-world {{ cake_data }}
</template>
<script lang="ts">
import widgetNormal from '@/vue2/components-open/Widget/normal.vue'
import widgetMixin from '@/vue2/mixins'

export default {
	mixins: [widgetMixin],
	components: { widgetNormal },
}
</script>
<style lang="scss" scoped>
.hello-world {
	color: #fff;
	line-height: 32px;
}
</style>
