<template lang="pug">
dorring-widget-group(v-if="$attrs.group", v-bind="$attrs")
dorring-widget-normal(v-else, v-bind="$attrs")
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-widget',
})
</script>
