export const value = {
	layout: {
		size: {
			width: 992,
			height: 214,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
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
	config: {
		title: '%',
		isShowMaxMarker: true,
		icon:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgBjVPRUYNAEH2XcfxOB9KByViASQWxBNNBOhArSDqADtAKknw5oxPBCkIHYAGyvuUOORhksjMvYZe3u+9uF4O+yccCuF4B1QO9wEUzh2eYee7TJ21iOiW2wFXC5G9GliSbGsCaOBL7mqNcZ+YvWV8CX8SGSSWGrOZVIfveuwZl80Kr7nCpSRpbtdYJiLMvS0QCYk8UYi3RWO+4BbEwkCwCfo4wd3GTzL+UmPb6qty5MSa3RU6hcniJMuOZMo+4HUiGi0WtO4mJlcqRzvHGrUD3LmQy0Gl4Aq2KjmmBHPJ548WykQKvXveZclmgYlDWHmn9jwqNbTy/LqCVFm4k/TEmzbndSAOv+9SN3sXktKMT4VLzFq+/ygfYD2Zklesxq/x6le0UbMKS96EFUyp6hLzP2sQ33dYnPp2J5kMrWwXdLgF/Q+LWdVLLYSfwwsSDT/8FGjPas7LeaZQAAAAASUVORK5CYII=',
	},
}

export const customConfig = [
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	},
	{
		prop: 'icon',
		label: '折线上的图标',
		type: 'func-image',
		options: [
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgBjVPRUYNAEH2XcfxOB9KByViASQWxBNNBOhArSDqADtAKknw5oxPBCkIHYAGyvuUOORhksjMvYZe3u+9uF4O+yccCuF4B1QO9wEUzh2eYee7TJ21iOiW2wFXC5G9GliSbGsCaOBL7mqNcZ+YvWV8CX8SGSSWGrOZVIfveuwZl80Kr7nCpSRpbtdYJiLMvS0QCYk8UYi3RWO+4BbEwkCwCfo4wd3GTzL+UmPb6qty5MSa3RU6hcniJMuOZMo+4HUiGi0WtO4mJlcqRzvHGrUD3LmQy0Gl4Aq2KjmmBHPJ548WykQKvXveZclmgYlDWHmn9jwqNbTy/LqCVFm4k/TEmzbndSAOv+9SN3sXktKMT4VLzFq+/ygfYD2Zklesxq/x6le0UbMKS96EFUyp6hLzP2sQ33dYnPp2J5kMrWwXdLgF/Q+LWdVLLYSfwwsSDT/8FGjPas7LeaZQAAAAASUVORK5CYII=',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFKSURBVHgBjVPbUcNADNwz/wwlOMPwTUogFUAHkA7ogFABdBA6MKnAUIH9TTB2BzYFgLKSnfj8ymRndL7T6bEnyQ59bOUGDneUW55C0wlSnlMEeMbMFb55cNjlckF5oSaiQ8XvApfOmZxhSd0n/hEjo01C2w7U+VsSypvtp1DbvZptJ4hm1otToYmUSeMc8pD7mUUkpMSUUmpEquswyaS0ejW073vOe0cfZSfIVlY1a33Pl8y9AJFMI/ZY1My5iP88OY6yUwv6BiMlqjCNQYc0QGF0WqRHAmzQPmGuAxZw2XBAHjyj5QQL1T0eTn+Y23RaK7QlyaCNkVf9eKSNectc25HJGqdiMHga8YftHJ1zoJd5ba1vBq/uwsxVfM+C9XA4R2KD5c2GUc3libXKafPLn2thPoQbyRKyQCvurnm7D1JYsQXvuHIfvvkO+Uc0txLiEPoAAAAASUVORK5CYII=',
		],
	},
	{
		prop: 'isShowMaxMarker',
		label: '显示最大值标记',
		type: 'func-switch',
	},
]

export const setting = [
	{
		label: 'x轴',
		key: 'x',
	},
	{
		label: 'y轴',
		key: 'y',
	},
]

export const settingData = {
	x: ['name'],
	y: ['value'],
}
