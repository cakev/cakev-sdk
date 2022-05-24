<template lang="pug">
div(:id="id")
</template>
<script lang="ts">
export default {
	data() {
		return {
			id: `chart${Date.now()}`,
			chart: null,
		}
	},
	watch: {
		cake_data(val): void {
			this.chart.changeData(val)
		},
	},
	props: ['cake_data'],
	mounted(): void {
		this.chart = new window.G2.Chart({
			container: this.id,
			autoFit: true,
			height: 500,
			supportCSSTransform: true,
		})
		this.chart.data(this.cake_data)
		this.chart.coordinate('theta', {
			radius: 0.75,
		})
		this.chart.tooltip({
			showMarkers: false,
		})
		this.chart
			.interval()
			.adjust('stack')
			.position('value')
			.color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
			.style({ opacity: 0.4 })
			.state({
				active: {
					style: element => {
						const shape = element.shape
						return {
							matrix: window.G2.Util.zoom(shape, 1.1),
						}
					},
				},
			})
			.label('type', val => {
				const opacity = val === '四线及以下' ? 1 : 0.5
				return {
					offset: -30,
					style: {
						opacity,
						fill: 'white',
						fontSize: 12,
						shadowBlur: 2,
						shadowColor: 'rgba(0, 0, 0, .45)',
					},
					content: obj => {
						return obj.type + '\n' + obj.value + '%'
					},
				}
			})
		this.chart.interaction('element-single-selected')
		this.chart.render()
	},
}
</script>
