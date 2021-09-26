import WidgetTask from '@dorring/sdk/core/Widget/task'
import WidgetBackground from '../packages/core/Widget/background'

test('widget createWidget', () => {
	const widget: WidgetTask = new WidgetTask({
		x: 0,
		y: 0,
		width: 200,
		height: 40,
		type: 'test',
		version: '1.0.0',
		background: new WidgetBackground({ color: ['rgba(40, 80, 102,1)', 'rgba(40, 80, 102,0)'] }),
		name: '渐变背景',
	})
	expect(widget).not.toBeNull()
})
