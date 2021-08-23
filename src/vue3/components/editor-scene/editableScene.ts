export default (id, data) => {
	data.editScene[id] = true
	data.editScene = { ...data.editScene }
	setTimeout(() => {
		data.dom[id].focus()
		data.dom[id].select()
	})
}
