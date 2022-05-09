<template lang="pug">
c-control(:label="`${config.label} [${inputKey}]`")
	template(slot="right")
		c-select(clearable, v-model="obj[inputKey]")
			c-select-option(:value="k", v-for="(k, i) in config.options", :key="i" :label="k")
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-select',
	mixins: [func],
}
</script>
