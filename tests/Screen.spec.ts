import Screen from '@dorring/sdk/core/Screen'

test('screen createScreen', () => {
	const screen: Screen = Screen.Instance()
	screen.createScreen('test')
	expect(screen.screenList.length).toBeGreaterThan(0)
	expect(screen.currentScreen).not.toBeNull()
	expect(screen.currentScene).not.toBeNull()
	expect(screen.currentScreen.scenes.length).not.toBeNull()
})
