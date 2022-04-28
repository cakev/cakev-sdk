<template lang="pug">
d-right-control(:label="`${config.label} [${inputKey}]`")
	i-select(clearable, v-model="obj[inputKey]")
		i-option(:value="k", v-for="(k, i) in config.options", :key="i") {{ k }}
</template>
<script lang="ts">
import func from './func.mx'
import { Component } from 'vue-property-decorator'

@Component
export default class FuncSelect extends func {}
</script>
