const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
const alt = isMac ? '⌥' : 'Alt'
const ctrl = isMac ? '⌃' : 'Ctrl'
const shift = 'Shift'
const space = '空格'
const del = isMac ? '⌫' : 'Delete'
// const command = '⌘'
const mouseWheelImg =
	'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNfbW91c2U8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0i55S75p2/IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMi4wMDAwMDAsIC0zNi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMi4wMDAwMDAsIDM2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImljL21vdXNlL2dyZXk2MDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNTAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJpY19tb3VzZV8yNHB4Ij4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjAgMCAxNSAwIDE1IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTguMTI1LDAuNzEzMzMzMzMzIEw4LjEyNSw2IEwxMi41LDYgQzEyLjUsMy4yOCAxMC41OTM3NSwxLjA0IDguMTI1LDAuNzEzMzMzMzMzIFogTTIuNSwxMCBDMi41LDEyLjk0NjY2NjcgNC43Mzc1LDE1LjMzMzMzMzMgNy41LDE1LjMzMzMzMzMgQzEwLjI2MjUsMTUuMzMzMzMzMyAxMi41LDEyLjk0NjY2NjcgMTIuNSwxMCBMMTIuNSw3LjMzMzMzMzMzIEwyLjUsNy4zMzMzMzMzMyBMMi41LDEwIFogTTYuODc1LDAuNzEzMzMzMzMzIEM0LjQwNjI1LDEuMDQgMi41LDMuMjggMi41LDYgTDYuODc1LDYgTDYuODc1LDAuNzEzMzMzMzMzIFoiIGlkPSJTaGFwZSIgZmlsbD0iIzhDOTA5NyIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkE5MDAiIHg9IjYuNSIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iNyIgcng9IjEuNSI+PC9yZWN0PgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='
const mouseLeftImg =
	'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTUgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNfbW91c2VfbGVmdDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSLnlLvmnb8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTYuMDAwMDAwLCAtNDIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJpY19tb3VzZV9sZWZ0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1Ni4wMDAwMDAsIDQyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjAgMCAxNSAwIDE1IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjEyNSwwLjcxMzMzMzMzMyBMOC4xMjUsNiBMMTIuNSw2IEMxMi41LDMuMjggMTAuNTkzNzUsMS4wNCA4LjEyNSwwLjcxMzMzMzMzMyBaIE0yLjUsMTAgQzIuNSwxMi45NDY2NjY3IDQuNzM3NSwxNS4zMzMzMzMzIDcuNSwxNS4zMzMzMzMzIEMxMC4yNjI1LDE1LjMzMzMzMzMgMTIuNSwxMi45NDY2NjY3IDEyLjUsMTAgTDEyLjUsNy4zMzMzMzMzMyBMMi41LDcuMzMzMzMzMzMgTDIuNSwxMCBaIiBpZD0iU2hhcGUiIGZpbGw9IiM5RkEyQTgiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuODc1LDAuNzEzMzMzMzMzIEM0LjQwNjI1LDEuMDQgMi41LDMuMjggMi41LDYgTDYuODc1LDYgTDYuODc1LDAuNzEzMzMzMzMzIFoiIGlkPSJQYXRoIiBmaWxsPSIjRkZBOTAwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='
// const mouseRightImg =
//	'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTUgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNfbW91c2VfbGVmdDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSLnlLvmnb8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTYuMDAwMDAwLCAtNDIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJpY19tb3VzZV9sZWZ0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1Ni4wMDAwMDAsIDQyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjAgMCAxNSAwIDE1IDE2IDAgMTYiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjEyNSwwLjcxMzMzMzMzMyBMOC4xMjUsNiBMMTIuNSw2IEMxMi41LDMuMjggMTAuNTkzNzUsMS4wNCA4LjEyNSwwLjcxMzMzMzMzMyBaIE0yLjUsMTAgQzIuNSwxMi45NDY2NjY3IDQuNzM3NSwxNS4zMzMzMzMzIDcuNSwxNS4zMzMzMzMzIEMxMC4yNjI1LDE1LjMzMzMzMzMgMTIuNSwxMi45NDY2NjY3IDEyLjUsMTAgTDEyLjUsNy4zMzMzMzMzMyBMMi41LDcuMzMzMzMzMzMgTDIuNSwxMCBaIiBpZD0iU2hhcGUiIGZpbGw9IiM5RkEyQTgiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuODc1LDAuNzEzMzMzMzMzIEM0LjQwNjI1LDEuMDQgMi41LDMuMjggMi41LDYgTDYuODc1LDYgTDYuODc1LDAuNzEzMzMzMzMzIFoiIGlkPSJQYXRoIiBmaWxsPSIjRkZBOTAwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='
const hotKeys = [
	{
		name: '清除全部参考线',
		key: [{ value: alt, type: 'text' }, { type: '+' }, { value: 'C', type: 'text' }],
	},
	{
		name: '放大画布',
		key: [{ value: ctrl, type: 'text' }, { type: '+' }, { value: '+', type: 'text' }],
	},
	{
		name: '缩小画布',
		key: [{ value: ctrl, type: 'text' }, { type: '+' }, { value: '-', type: 'text' }],
	},
	{
		name: '缩放画布',
		key: [{ value: ctrl, type: 'text' }, { type: '+' }, { value: mouseWheelImg, type: 'img' }],
	},
	{
		name: '拖动画布',
		key: [{ value: space, type: 'text' }, { type: '+' }, { value: mouseLeftImg, type: 'img' }],
	},
	{ name: '抓手', key: [{ value: space, type: 'text' }] },
	{ name: '删除组件', key: [{ value: del, type: 'text' }] },
	{
		name: '水平移动画布',
		key: [{ value: shift, type: 'text' }, { type: '+' }, { value: mouseWheelImg, type: 'img' }],
	},
	{
		name: '垂直移动画布',
		key: [{ value: mouseWheelImg, type: 'img' }],
	},
]
export { hotKeys }
