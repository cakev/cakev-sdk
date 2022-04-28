import './index.scss'
import Factory from '@/core/Base/factory'

export default class Guide extends Factory<Guide> {
	guideTipClassName = { x: 'd-guide-tip-x', y: 'd-guide-tip-y' }
	guideTipNumClassName = { x: 'd-guide-tip-x-num', y: 'd-guide-tip-y-num' }
	guideTipDom: { x: HTMLElement | null; y: HTMLElement | null } = {
		x: null,
		y: null,
	}
	hide({ type, rulerVisible }): void {
		if (rulerVisible) {
			this.guideTipDom[type].style.display = 'none'
		}
	}
	show({ type, rulerVisible, num, offset }): void {
		if (rulerVisible) {
			this.guideTipDom[type].style.display = 'block'
			this.guideTipDom[type].style.transform =
				type === 'x'
					? `translateX(${offset}px)`
					: `translateY(${offset}px)`
			this.guideTipDom[
				type
			].innerHTML = `<div class="${this.guideTipNumClassName[type]}">${num}</div>`
		}
	}
	init({ type, father }: any = {}): HTMLElement {
		const dom = document.createElement('div')
		const body: HTMLElement = document.body
		dom.className = this.guideTipClassName[type]
		dom.style.display = 'none'
		if (type === 'x') {
			dom.style.height = `${body.offsetHeight}px`
		} else {
			dom.style.width = `${body.offsetWidth}px`
		}
		this.guideTipDom[type] = dom
		father.appendChild(dom)
		return dom
	}
}
