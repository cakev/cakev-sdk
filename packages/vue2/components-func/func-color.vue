<template lang="pug">
c-control(:label="`${config.label} [${inputKey}]`")
	template(slot="right")
		c-color(v-model="obj[inputKey]")
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-color',
	mixins: [func],
}
</script>
