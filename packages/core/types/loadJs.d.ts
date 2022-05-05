/**
 * 加载外部js
 */
interface loadJs {
	(src: string | string[], value: string): Promise<any>
}

export const loadJs: loadJs
