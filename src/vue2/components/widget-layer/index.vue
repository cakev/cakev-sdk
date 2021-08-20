<template lang="pug" functional>
dorring-widget-layer-group(v-if="props.group" v-bind="props")
dorring-widget-layer-normal(v-else v-bind="props")
</template>
