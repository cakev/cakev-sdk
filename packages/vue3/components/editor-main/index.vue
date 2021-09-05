<template lang="pug">
el-main.pos-r.editor-container(
	:class="manager.temporary.editorContentDrag?manager.temporary.editorContentDragging?'cursor-dragging':'cursor-wait':'cursor-normal'"
	@wheel.stop.prevent="wheel",
	@mousedown="mousedown",
	@mouseup="mouseup",
	@mousemove="mousemove",
	data-editor-content="true"
	@drop.prevent="drop",
	@dragover.prevent,)
	editor-content(v-if="manager.screen.currentScreen" data-editor-content="true")
	editor-tip(v-if="manager.screen.currentScreen")
	contextmenu-widget(v-if="manager.temporary.widgetRightMenu")
	contextmenu-widgets(v-if="manager.temporary.widgetsRightMenu")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import editorContent from '@dorring/sdk/vue3/components/editor-content/index.vue'
import editorTip from '@dorring/sdk/vue3/components/editor-tip/index.vue'
import contextmenuWidget from '@dorring/sdk/vue3/components/contextmenu-widget/index.vue'
import contextmenuWidgets from '@dorring/sdk/vue3/components/contextmenu-widgets/index.vue'
import { on, off } from '@dorring/sdk/vue3/utils/dom'
import drop from './drop'
import wheel from './wheel'
import mousedown from './mousedown'
import mousemove from './mousemove'

export default defineComponent({
	name: 'editor',
	components: {
		editorContent,
		editorTip,
		contextmenuWidget,
		contextmenuWidgets,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, dom: {} })

		const keydown = e => {
			if (e.keyCode === 32) {
				state.manager.temporary.editorContentDrag = true
			}
		}

		const keyup = () => {
			state.manager.temporary.editorContentDragging = false
			state.manager.temporary.editorContentDrag = false
		}

		const mouseup = e => {
			state.manager.temporary.editorContentDragging = false
			const x1 = state.manager.temporary.editorContentClientX
			const x2 = e.clientX
			const y1 = state.manager.temporary.editorContentClientY
			const y2 = e.clientY
			const d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
			if (d <= 7 && d >= 0 && e.target.dataset['editorContent']) {
				state.manager.screen.cancelSelectWidget()
			}
		}

		onMounted(() => {
			on(document.documentElement, 'keyup', keyup)
			on(document.documentElement, 'keydown', keydown)
		})

		onBeforeUnmount(() => {
			off(document.documentElement, 'keyup', keyup)
			off(document.documentElement, 'keydown', keydown)
		})

		return {
			...toRefs(state),
			drop,
			wheel,
			keyup,
			mousedown,
			mouseup,
			mousemove,
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-container {
	overflow: hidden;
	background-color: #ddd;
	outline: none;
	&.cursor-dragging {
		cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAICSURBVHgB7ZUxTyJBGIa/XVmWu4O75OLd5XLJddAYLpccyVX8AGs6QiGVrSbaGAv8FxZI43/AAhoaSqAUGjXRxEJBFzEq6vq+2cFYGHcEYuO+yZOd3Z2deb+Z75sVCRQoUKD3LkPGE78z1fVe8SaaATb4BqrgCCyAjyAk4wekpTBYAg44yGQyTqfTYbun2FHGbGV0quKAXzk5J8Xk/UKh4FJ45rbb7T4Nob0HzsGyMuwrU/REA99BLB6Px5LJZPTpy0QiEcWzGEzMwiC3YQNERWMlQqInRvPj8SYcvhk1I5FIn8Zs275OpVIWDNrqHQ1cgDuZUBxwDewCV0fsBxIg4jd4SOP9HKJbLZVKZqPR6IqXCzoyZApVwej/WpbVbTabVzrRDwaDIb4hXIEPfhPoJOHZcDjcTqfTd61Wa+DXuVarMScOxTucXJlQzGLWdgpsYiWcarXaf2kFcrncCfqWwW/RLEU/MZF+gf9g3TTN00ql8qyJYrHIrKeBefHKdioHkqFM/AT/wKphGCf5fP68Xq87vV7vulwud7PZLA8gGlgRb/8/iUYS6mYp+3E5vygjf8AimBPvP3AM9sEWaIn3j6ChW52BXyMLfAaz4uUGDxuWKrN+tPzEUc98NU6dckKWFyPn1rCSeNpdgUt19Y18EgOj7zjxjGq7ysRUSi9QoDfVA8TKA/mGrmqiAAAAAElFTkSuQmCC')
				4 4,
			auto;
	}
	&.cursor-wait {
		cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI1SURBVHgB7ZZPaxpBGMbfjdFuo5ZQ2lJK6Um3vRgolFL6BXoteNNLaQ+9CYVKzrn20nPAYz6AIhI/gacQ8BLQxEMwOSVRo8mSaP49T3YWcgjurIaEwL7wY2dnZ+d95nF2XkWCCCKIBw5DJgu+N6OuF4p7iRB4Al6CVbALfoA5MCuTL0grIuAPOATb6XS632w2+2h3Vd8aeCOOM9qhO5grj4ElJDWQ/HkqlYonk8k4+uYbjcYM+iy0f6txIc15fQu4TorksZsPLcuKURCai2AH5MRx7M4EcJzpNQgunMEN7oMl0XRiVvTC3fVjAy5E4YZ7SwFH4FymEOAmpp1htzMSiQzdpmmaA1zjN/vU1RSfG/K25JzkP2CSdXCpExwHPoCnXknGKaQ7C+Fw+Fe73R7l8/m3uB/KPQbVf6PFnU7nhCsrlUqHd+2Al4AEKCUSiX6r1bJ1ktu2PRLHKUumFMBN9xp8ASvRaNQuFosDLwHVanUf47eUeM9Pd1wYagXvwFfwzzCMUblcHo4TkMlkeuLUCb6ndRjpiOAG/AzywK7Vaqe3JS8UCvzu+cV8B6/Ex5HsJYJW8uf4BBbhRC+Xy/Xq9fqg2+0OK5VKL5vNHuAZ+Qvei3MQeVZHP+WTds6LU/E+gp9gQYnbA5tgGWyIU6ZZIc+8JvVbvyniGXihYAHiecFdT+u5AekCy/RIZ8JJ/kAwIffFnLryMONKT8AxOBWNlU8jwH2PiUOqzYOHRedCtYMI4vHEFX9SSF4iGArbAAAAAElFTkSuQmCC')
				4 4,
			auto;
	}
	&.cursor-normal {
		cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK6SURBVHgB7ZVPSNNhGMefUrfmpNGiP3MrtZEQuUGFVsQGedphIAleOrmLjALR26ibl8Fuhdgh9RYGXgQPMkUjZXhUwbxYOKZjA4cyt7X/e/s++3NY5SDdb4fYFz7w+73v9nuf9/m+z/MS1VVXuRpjsdirxcXFVjw3UI11ATQfHh66stlsMBAIvMa7AlwkCfX7x2Wbm5u7fr//Ri6XG4/H4182Njae8HgxQEnFC6j6+/vNJycnQq1WC5fLJdLpdPL4+Hh8enr6FuYbSWIpwf1oNBowGo0Cz6Kzs1MsLy+LTCYT2N/fHyKJbZEDvdfrXbHZbPkASgwMDIiDgwMBWzzr6+uPSSJbOMU6j8fzfnJysiwARqlUCqfTKZLJZAK2vJuamqp6tXBqr01MTAzh8P0RQAm9Xi8WFhYEqsXv8/lsGLtEVbIlfxANBsNT7DLT0tJyahBMX1+fgF1sy9e1tbVHGGuiKtjSDO4hxT/MZnPFAGQymejt7c0HgbL9GYlEPrjd7uv/sNZfyyoDEmhIOz09PXdWV1fLJrVaLVksFrJarWQymUgul4eDweA3LLyytbXldjgcMSpkQdAZxYeqdWlpyTk7O1u245GREZFKpRJ7e3s78/Pzn+12+xuFQvECc8+BEWioUKbnsoH/fHVsbOwlp7a0eHt7uwiFQpnBwUEH3q3ABB6Au0AL1FSwrypVcVmlUj1E84lrNJp8ANyMwAyenwE9YK9VVNgxH74zVcFprTUdDodjR0dHu93d3QadTkfojN6urq6PmPOBEEiBHJ3D60riHbVtb2/PoCdw6lPDw8N2KqSb27XkFxP7eHNubu6tgFDjn6jgN/ss6fVcEu/wyujoqAVWfO/o6DDjndtuE9VQfKJvIwvcattIotRX+iDvlns833pJEAdZqmEArIbib3JF6qqrrv9PvwAOdz4Mw4rLJQAAAABJRU5ErkJggg==')
				0 0,
			auto;
	}
}
</style>
