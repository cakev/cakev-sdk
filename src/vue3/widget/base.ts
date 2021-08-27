import { h, onMounted } from 'vue'
import props from './props'

export default {
	props,
	// @ts-ignore
	setup(props, context) {
		// const state = reactive({
		// 	count: 0,
		// })

		onMounted(() => {
			context.emit('mounted')
		})

		return () =>
			h(
				'div',
				{
					id: props.id,
					class: 'widget-base',
				},
				context.slots,
			)
	},
}
