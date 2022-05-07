import widgetConf from '@/core/Widget/conf'

export default new widgetConf({
	widgetLayout: {
		width: 992,
		height: 214,
	},
	widgetApi: {
		data: JSON.stringify([
			{
				name: '1月',
				value: 10,
			},
			{
				name: '2月',
				value: 40,
			},
			{
				name: '3',
				value: 30,
			},
			{
				name: '4月',
				value: 20,
			},
			{
				name: '5月',
				value: 10,
			},
			{
				name: '6月',
				value: 50,
			},
		]),
	},
	widgetTypeId: '示例一',
	widgetIs: 'hello-line',
	widgetAvatar: require('./snapshot.png'),
	widgetConfig: {
		title: '%',
		isShowMaxMarker: true,
		icon:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgBjVPRUYNAEH2XcfxOB9KByViASQWxBNNBOhArSDqADtAKknw5oxPBCkIHYAGyvuUOORhksjMvYZe3u+9uF4O+yccCuF4B1QO9wEUzh2eYee7TJ21iOiW2wFXC5G9GliSbGsCaOBL7mqNcZ+YvWV8CX8SGSSWGrOZVIfveuwZl80Kr7nCpSRpbtdYJiLMvS0QCYk8UYi3RWO+4BbEwkCwCfo4wd3GTzL+UmPb6qty5MSa3RU6hcniJMuOZMo+4HUiGi0WtO4mJlcqRzvHGrUD3LmQy0Gl4Aq2KjmmBHPJ548WykQKvXveZclmgYlDWHmn9jwqNbTy/LqCVFm4k/TEmzbndSAOv+9SN3sXktKMT4VLzFq+/ygfYD2Zklesxq/x6le0UbMKS96EFUyp6hLzP2sQ33dYnPp2J5kMrWwXdLgF/Q+LWdVLLYSfwwsSDT/8FGjPas7LeaZQAAAAASUVORK5CYII=',
	},
})
