/**
 * 加载外部css
 */
interface loadCss {
	(src: string | string[], value: string): Promise<any>
}

export const loadCss: loadCss
