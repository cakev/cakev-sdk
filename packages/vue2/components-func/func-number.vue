<template lang="pug">
c-control(:label="`${config.label} [${inputKey}]`")
	template(slot="right")
		i-input-number(v-model="obj[inputKey]",)
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-number',
	mixins: [func],
}
</script>
