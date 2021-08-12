<template lang="pug">
component.pos-a(
	:id="$attrs.id",
	:is="$attrs.type",
	v-bind="{ ...$attrs }",
	:style="style($attrs)",
	@click.native="selectWidgetById($attrs.id)")
</template>
<script lang="ts">
import style from './style'
import selectWidgetById from './selectWidgetById'

export default {
	setup() {
		return { style, selectWidgetById }
	},
}
</script>
<style lang="scss" scoped></style>
