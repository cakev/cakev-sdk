<template lang="pug">
d-right-control(:label="`${config.label} [${inputKey}]`")
	i-color-picker(:alpha="true", v-model="obj[inputKey]")
</template>
<script lang="ts">
import func from './func.mx'
import { Component } from 'vue-property-decorator'

@Component
export default class FuncColor extends func {}
</script>
