export default class WidgetAnimation {
	enable = false
	enter: 'fadeIn'
	duration = 300
	delay = 0

	constructor(obj?: { duration?: number; delay?: number }) {
		if (obj) {
			if (obj.duration) this.duration = obj.duration
			if (obj.delay) this.delay = obj.delay
		}
	}
}
