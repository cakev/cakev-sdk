import ScreenTask from '@/core/Screen/task'
export default (screen: ScreenTask) => {
	return {
		backgroundColor: screen.backgroundColor,
		width: screen.width + 'px',
		height: screen.height + 'px',
	}
}
