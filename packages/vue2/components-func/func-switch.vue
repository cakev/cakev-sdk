<template lang="pug">
d-right-control(:label="`${config.label} [${inputKey}]`")
	c-switch(v-model="obj[inputKey]")
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-switch',
	mixins: [func],
}
</script>
