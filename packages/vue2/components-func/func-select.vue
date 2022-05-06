<template lang="pug">
c-control(:label="`${config.label} [${inputKey}]`")
	template(slot="right")
		i-select(clearable, v-model="obj[inputKey]")
			i-option(:value="k", v-for="(k, i) in config.options", :key="i") {{ k }}
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-select',
	mixins: [func],
}
</script>
