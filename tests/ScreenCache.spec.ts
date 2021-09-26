import IndexDB from '@dorring/sdk/core/IndexDB'
import ScreenCache from '@dorring/sdk/core/IndexDB/screenCache'
const db = new IndexDB()

test('screen createScreen', async () => {
	const screenCache: ScreenCache = ScreenCache.Instance(db)
	await screenCache.add('test', JSON.stringify({ a: 1 }))
	const result = await screenCache.get('test')
	expect(result.a).toEqual(1)
})
