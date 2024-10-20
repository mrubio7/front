import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import Layout from './pages/Layout.vue'
import LadderPlayersView from './pages/LadderPlayersView.vue'
import LadderTeamsView from './pages/LadderTeamsView.vue'
import TeamProfileView from './pages/TeamProfileView.vue'

export const PathRoutes = {
	Home: "/",
	Ladder_Players: "/ladder/players",
	Ladder_Equipos: "/ladder/teams",
	Team_Profile: "/team/:team_name"
}

const routes = [
	{ path: PathRoutes.Home, component: Layout, children: [
		{ path: "", component: HomeView },
		{ path: PathRoutes.Ladder_Players, component: LadderPlayersView },
		{ path: PathRoutes.Ladder_Equipos, component: LadderTeamsView },
		{ path: PathRoutes.Team_Profile, component: TeamProfileView }
	]},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router