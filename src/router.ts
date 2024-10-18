import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import Layout from './pages/Layout.vue'

export const PathRoutes = {
	Home: "/"
}

const routes = [
	{ path: PathRoutes.Home, component: Layout, children: [
		{ path: "", component: HomeView },
	]},
]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

export default router