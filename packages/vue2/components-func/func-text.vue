<template lang="pug">
c-control(:label="`${config.label} [${inputKey}]`")
	template(slot="right")
		span.d-manage-modal-control-text {{ obj[inputKey] }}
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'func-text',
	mixins: [func],
}
</script>
