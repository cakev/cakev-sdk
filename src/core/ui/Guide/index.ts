import './index.scss'
import { uuid } from '@/core/utils'

export default class Guide {
	guideLineClassName = { x: 'd-ruler-guide-x', y: 'd-ruler-guide-y' }
	type: string
	num: number
	id: string
	/* 标尺高度，容差 */
	rulerSize: number
	offset: number
	height: number
	width: number
	zoom: number
	father: HTMLElement | null

	constructor(obj: any) {
		this.id = uuid()
		this.num = obj.num
		this.zoom = obj.zoom
		this.type = obj.type
		this.father = obj.father
		this.rulerSize = obj.rulerSize
		this.height = obj.height
		this.width = obj.width
		this.offset = obj.offset
		this.init()
	}

	clear() {}

	initFather() {}

	init(): void {
		const dom = document.createElement('div')
		dom.id = this.id
		dom.className = this.guideLineClassName[this.type]
		if (this.type === 'x') {
			dom.style.height = `${this.height + this.rulerSize}px`
			dom.style.transform = `translateX(${
				this.offset + this.num * this.zoom
			}px)`
			dom.setAttribute('data-top', '0px')
			dom.setAttribute('data-left', `${this.num - 1}px`)
			dom.innerHTML = `<div class="d-ruler-guide-x-num">${this.num}</div>`
		} else {
			dom.style.width = `${this.width + this.rulerSize}px`
			dom.style.transform = `translateY(${
				this.offset + this.num * this.zoom
			}px)`
			dom.setAttribute('data-left', '0px')
			dom.setAttribute('data-top', `${this.num - 1}px`)
			dom.innerHTML = `<div class="d-ruler-guide-y-num">${this.num}</div>`
		}
		// dom.onmousedown = (e) => {
		// 	console.log(1)
		// }
		this.father.appendChild(dom)
	}
}
