interface localInit {
	/**
	 * 初始化本地组件集
	 */
	(obj: any): void
}

interface createWidget {
	/**
	 * 创建组件
	 */
	(x: number, y: number, data: any): void
}

interface init {
	/**
	 * 编辑器初始化
	 */
	(res: any): void
}
interface screen {
	screenWidgets: any
}
interface setLocalComponents {
	/**
	 * 注册内置组件
	 */
	(components: any): void
}
interface setLocalWidgets {
	/**
	 * 设置内置组件
	 */
	(obj: any): void
}

interface selectSceneIndex {
	/**
	 * 切换场景
	 */
	(index: string | number): void
}

interface clear {
	/**
	 * 清空大屏数据
	 */
	(): void
}
interface EditorInstance {
	/**
	 * 当前场景key值
	 */
	currentSceneIndex: string
	selectSceneIndex: selectSceneIndex
	setLocalComponents: setLocalComponents
	setLocalWidgets: setLocalWidgets
	localInit: localInit
	createWidget: createWidget
	init: init
	clear: clear
	/**
	 * 当前大屏背景色
	 */
	backgroundColor: string
	screen: screen
}

interface Instance {
	/**
	 * 单例缓存实例
	 */
	(): EditorInstance
}
/**
 * 核心实例
 */
export declare class Editor {
	static Instance: Instance
}
