<template lang="pug">
d-right-control(:label="`${config.label} [${inputKey}]`")
	i-color-picker(:alpha="true", v-model="obj[inputKey]")
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-color',
	mixins: [func],
}
</script>
