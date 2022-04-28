<template lang="pug">
.e-form-item.fn-flex(:class="`flex-${direction}`", :style="{ alignItems: align }")
	slot
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class EFormItem extends Vue {
	@Prop({ default: 'row' }) direction
	@Prop({ default: 'center' }) align
}
</script>
<style lang="scss" scoped>
.e-form-item {
	align-items: center;
	margin: 4px 0;
}
</style>
