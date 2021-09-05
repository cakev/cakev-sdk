export default class WidgetAnimation {
	enable = false
	enter = 'FADE_IN'
	duration = 300
	delay = 0

	constructor(obj?: { duration?: number; delay?: number; enter?: string }) {
		if (obj) {
			if (obj.duration) this.duration = obj.duration
			if (obj.delay) this.delay = obj.delay
			if (obj.enter) this.enter = obj.enter
		}
	}
}
