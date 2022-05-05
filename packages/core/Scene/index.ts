import Factory from '@/core/Base/factory'
import Scene from './scene'

export default class SceneBase extends Factory<SceneBase> {
	/* 大屏场景数据序列化 */
	sceneObj = {}

	clear(): void {
		this.sceneObj = {}
	}
	/* 更新场景名称 */
	setSceneName(index: string | number, name: string): void {
		this.sceneObj[index].name = name.replace(/ /g, '')
	}
	/* 序列化场景数据 */
	initScene(res: any): void {
		this.sceneObj = res.screenScene
	}
	/* 创建场景 */
	createScene(name: number | string): void {
		const scene = new Scene(name)
		this.sceneObj = { ...this.sceneObj, [name]: scene }
	}
	/* 删除场景 */
	destroyScene(index: number | string): void {
		delete this.sceneObj[index]
		this.sceneObj = { ...this.sceneObj }
	}
	/* 初始化配置 */
	init(res: any): void {
		this.initScene(res)
	}
	/* 获取场景数据 */
	sceneData(): any {
		return { screenScene: this.sceneObj }
	}
}
