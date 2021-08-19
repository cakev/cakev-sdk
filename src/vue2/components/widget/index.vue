<template lang="pug" functional>
dorring-widget-group(v-if="props.group", v-bind="{ ...props }")
dorring-widget-normal(v-else, v-bind="{ ...props }")
</template>
