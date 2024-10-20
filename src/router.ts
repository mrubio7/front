import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import Layout from './pages/Layout.vue'
import LadderPlayersView from './pages/LadderPlayersView.vue'
import LadderTeamsView from './pages/LadderTeamsView.vue'

export const PathRoutes = {
	Home: "/",
	Ladder_Players: "/ladder/players",
	Ladder_Equipos: "/ladder/teams"
}

const routes = [
	{ path: PathRoutes.Home, component: Layout, children: [
		{ path: "", component: HomeView },
		{ path: PathRoutes.Ladder_Players, component: LadderPlayersView },
		{ path: PathRoutes.Ladder_Equipos, component: LadderTeamsView },
	]},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router