import EditorBase from '@/core/Editor/base'

export default class Agent extends EditorBase {
	constructor() {
		super()
	}
	/* ---------------------------------------------------Ruler---------------------------------------------------*/
	createGuide(num: string | number, type: string): void {
		this.ruler.createGuide(num, type)
	}
	clearGuides(): void {
		this.ruler.clearGuides()
	}
	/* ---------------------------------------------------Local---------------------------------------------------*/
	localInit(obj: any): void {
		this.local.init(obj)
	}
	setLocalWidgets(obj: any): void {
		this.local.setLocalWidgets(obj)
	}
	setLocalComponents(obj: any): void {
		this.local.setLocalComponents(obj)
	}
	/* ---------------------------------------------------Current---------------------------------------------------*/
	get currentRightSettingIndex(): number {
		return this.current.currentRightSettingIndex
	}
	selectRightSettingIndex(index: number): void {
		this.current.currentRightSettingIndex = index
	}
	get activeWidgetId(): string {
		return this.current.activeWidgetId
	}
	set activeWidgetId(val: string) {
		this.current.activeWidgetId = val
	}
	get activeSceneId(): number | string {
		return this.current.activeSceneId
	}
	set activeSceneId(val: number | string) {
		this.current.activeSceneId = val
	}
	/* 当前选中组件-多组件配置 */
	get currentWidgetListConfig(): any {
		return this.current.currentWidgetListConfig
	}
	get currentWidget() {
		return this.current.currentWidget
	}
	/* 当前选中组件-多组件 */
	get currentWidgetList(): any {
		return this.current.currentWidgetList
	}
	/* 取消选中组件 */
	unSelectWidget(): void {
		this.current.unSelectWidget()
	}
	/* 取消选中组件集合 */
	unSelectWidgetList(): void {
		this.current.unSelectWidgetList()
	}
	selectWidgetList(config: any): void {
		this.current.selectWidgetList(config)
	}
	/* 当前场景 */
	get currentSceneIndex(): string | number {
		return this.current.currentSceneIndex
	}
	/* 选中场景 */
	selectSceneIndex(sceneIndex: string | number): void {
		this.current.selectSceneIndex(sceneIndex)
	}
	/* 打开场景 */
	openScene(id: string): void {
		if (this.editorStatus === 'inPreview') this.current.openScene(id)
	}
	/* 关闭场景 */
	closeScene(id: string): void {
		if (this.editorStatus === 'inPreview') this.current.closeScene(id)
	}
	get offsetX(): number {
		return this.current.offsetX
	}
	set offsetX(val: number) {
		this.current.offsetX = val
	}
	get offsetY(): number {
		return this.current.offsetY
	}
	set offsetY(val: number) {
		this.current.offsetY = val
	}
	get contentMove(): boolean {
		return this.current.contentMove
	}
	set contentMove(val: boolean) {
		this.current.contentMove = val
	}
	get widgetMove(): boolean {
		return this.current.widgetMove
	}
	set widgetMove(val: boolean) {
		this.current.widgetMove = val
	}
	// get xRoomL1(): number {
	// 	return this.current.xRoomL1
	// }
	get xRoomL2(): number {
		return this.current.xRoomL2
	}
	get xRoomR1(): number {
		return this.current.xRoomR1
	}
	get yRoom(): number {
		return this.current.yRoom
	}
	get zoom(): number {
		return this.current.zoom
	}
	// taggerXRoomL1(): void {
	// 	this.current.taggerXRoomL1()
	// }
	taggerXRoomL2(): void {
		this.current.taggerXRoomL2()
	}
	taggerXRoomR1(): void {
		this.current.taggerXRoomR1()
	}
	/* ---------------------------------------------------Screen---------------------------------------------------*/
	get screenType(): any {
		return this.screen.screenType
	}
	/* 大屏名 */
	get name(): string {
		return this.screen.screenName
	}
	set name(screenName: string) {
		this.screen.screenName = screenName
	}
	/* 大屏缩略图 */
	get avatar(): string {
		return this.screen.screenAvatar
	}
	set avatar(screenAvatar: string) {
		this.screen.screenAvatar = screenAvatar
	}
	/* 大屏适配方式 full-size 充满页面 full-width 100%宽度 full-height 100%高度 */
	get layoutMode(): string {
		return this.screen.screenLayoutMode
	}
	set layoutMode(screenLayoutMode: string) {
		this.screen.screenLayoutMode = screenLayoutMode
	}
	/* 大屏宽度 */
	get width(): number {
		return this.screen.screenWidth
	}
	/* 大屏高度 */
	get height(): number {
		return this.screen.screenHeight
	}
	/* 大屏背景颜色 */
	get backgroundColor(): string {
		return this.screen.screenBackGroundColor
	}
	set backgroundColor(screenBackGroundColor: string) {
		this.screen.screenBackGroundColor = screenBackGroundColor
	}
	/* 大屏背景图片 */
	get backgroundImage(): string {
		return this.screen.screenBackGroundImage
	}
	set backgroundImage(screenBackGroundImage: string) {
		this.screen.screenBackGroundImage = screenBackGroundImage
	}
	/* 大屏首屏场景 */
	get mainScene(): string | number {
		return this.screen.screenMainScene
	}
	set mainScene(screenMainScene: string | number) {
		this.screen.screenMainScene = screenMainScene
	}
	/* 获取大屏数据 */
	screenData(): any {
		return this.screen.screenData()
	}
	changeLayoutMode(value: string): string {
		return this.screen.changeLayoutMode(value)
	}
	/* 更新组件 */
	updateComponentTarget(id, target, value): void {
		this.screen.updateComponentTarget(id, target, value)
	}
	/* 更新组件 */
	updateComponent(id, config): void {
		this.screen.updateComponent(id, config)
	}
	/* 复制组件 */
	copyWidget(): void {
		this.screen.copyWidget(this.current.currentWidgetList[0])
	}
	/* 更新大屏组件配置 */
	updateWidgetConfig(id: string, localConfigValue: any, customConfig: any): any {
		return this.screen.updateWidgetConfig(id, localConfigValue, customConfig)
	}

	/* ---------------------------------------------------Scene---------------------------------------------------*/
	/* 场景数据 */
	get sceneObj() {
		return this.scene.sceneObj
	}
	/* 获取场景数据 */
	sceneData(): any {
		return this.scene.sceneData()
	}
}
