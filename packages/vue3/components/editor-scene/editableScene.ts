export default (id, data) => {
	if (id !== '-1' && id !== '0') {
		data.editScene[id] = true
		data.editScene = { ...data.editScene }
		setTimeout(() => {
			data.dom[id].focus()
			data.dom[id].select()
		})
	}
}
