import { h, onMounted, watch } from 'vue'
import props from './props'
import request from './request'

export default {
	props,
	setup(props, context) {
		// const state = reactive({
		// 	count: 0,
		// })

		onMounted(() => {
			context.emit('mounted')
		})

		watch(
			() => props.api,
			() => {
				if (props.api) request({ ...props.api, id: props.id })
			},
			{ deep: true },
		)

		return () =>
			h(
				'div',
				{
					id: props.id,
					class: 'widget-base',
					style: props.style,
				},
				context.slots,
			)
	},
}
