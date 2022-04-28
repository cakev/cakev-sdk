<template lang="pug">
d-right-control(:label="`${config.label} [${inputKey}]`")
	i-input-number(
		v-model="obj[inputKey]",)
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-number',
	mixins: [func],
}
</script>
