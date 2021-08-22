export default (id, data) => {
	data.editScene[id] = true
	data.editScene = { ...data.editScene }
	data.dom[id].focus()
	setTimeout(() => {
		data.dom[id].select()
	})
}
