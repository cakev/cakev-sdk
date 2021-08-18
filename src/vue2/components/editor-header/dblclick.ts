export default ({ state, context }) => {
	state.editName = true
	context.refs['input'].focus()
	setTimeout(() => {
		context.refs['input'].select()
	})
}
