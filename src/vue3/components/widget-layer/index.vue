<template lang="pug">
dorring-widget-layer-group(v-if="$attrs.group", v-bind="$attrs")
dorring-widget-layer-normal(v-else, v-bind="$attrs")
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-widget-layer',
})
</script>
