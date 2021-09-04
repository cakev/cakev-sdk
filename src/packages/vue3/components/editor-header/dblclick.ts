export default data => {
	data.editName = true
	setTimeout(() => {
		data.dom['input'].focus()
		data.dom['input'].select()
	})
}
