<script setup lang="ts">
import { ref, computed } from 'vue';
import { TeamsModel } from '@/entities/teams';
import { PropType } from 'vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { PathRoutes } from '@/router';
import Badge from '@/components/ui/badge/Badge.vue';
import { GetTournamentColor } from '@/libs/utils';
import { TOURNAMENT_PRIORITY } from '@/libs/consts';
import Button from '@/components/ui/button/Button.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';
import { Select, SelectContent, SelectGroup,SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Props para los equipos
const props = defineProps({
	teams: {
		type: Array as PropType<TeamsModel[]>,
		required: true
	}
});

// Estado para el filtro del torneo seleccionado
const selectedTournament = ref<string | undefined>(undefined);

// Estado para controlar la página actual
const currentPage = ref(1);
const itemsPerPage = 8; // Máximo de equipos por página

// Obtener la lista de torneos únicos desde los equipos
const availableTournaments = computed(() => {
	const tournamentsSet = new Set<string>();
	props.teams.forEach(team => {
		team.Tournaments.forEach(tournament => tournamentsSet.add(tournament));
	});
	return Array.from(tournamentsSet);
});

// Filtrar y ordenar los equipos según el torneo seleccionado
const filteredTeams = computed(() => {
	let teams = props.teams;

	// Si el torneo seleccionado no es "all" o undefined, aplicamos el filtro
	if (selectedTournament.value && selectedTournament.value !== "all") {
		teams = teams.filter(team =>
			team.Tournaments.includes(selectedTournament.value as string)
		);
	}

	// Ordenar los equipos por el torneo de mayor prioridad
	return teams.sort((a, b) => {
		// Obtenemos la prioridad más alta de los torneos de cada equipo
		const aPriority = Math.min(...a.Tournaments.map(t => TOURNAMENT_PRIORITY[t] || 999));
		const bPriority = Math.min(...b.Tournaments.map(t => TOURNAMENT_PRIORITY[t] || 999));
		return aPriority - bPriority;
	});
});

// Calcular el número total de páginas
const totalPages = computed(() => {
	return Math.ceil(filteredTeams.value.length / itemsPerPage);
});

// Obtener los equipos de la página actual
const paginatedTeams = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return filteredTeams.value.slice(start, end);
});

// Cambiar de página
const goToPage = (page: number) => {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
	}
};
</script>


<template>
	<section class="w-full">
		<span class="p-2 text-lg font-semibold">Tabla de equipos</span>

		<!-- Selector para filtrar por torneo -->
		<div class="p-4 pb-2">
			<Select v-model="selectedTournament" id="tournament-selector" class="block w-full p-2 border border-slate-300 rounded-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
				<SelectTrigger>
					<SelectValue placeholder="Selecciona una liga" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="all">Todos los torneos</SelectItem>
						<SelectItem v-for="tournament in availableTournaments" :key="tournament" :value="tournament">
							{{ tournament }}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>

		<div v-if="paginatedTeams.length === 0">
			<div class="flex flex-col gap-4 p-4">
				<Skeleton class="w-full h-14 rounded-sm" v-for="_ in 8" />
			</div>
		</div>

		<div v-else class="flex flex-col gap-4 p-4">
			<div v-for="team in paginatedTeams" :key="team.Id">
				<a :href="PathRoutes.Team_Profile.replace(':team_name', team.Nickname)">
					<div class="flex items-center border dark:border-slate-800 border-slate-300 rounded-sm transition py-2 px-4 hover:bg-slate-900 cursor-pointer justify-between">
						<div class="flex items-center gap-6 xl:w-3/5 w-full justify-between">
							<div class="flex items-center gap-4">
								<Avatar class="border dark:border-slate-800 border-slate-400">
									<AvatarImage :src="team.Avatar" alt="team avatar" />
								</Avatar>
								<span class="text-md font-semibold dark:text-slate-200 text-slate-700">
									{{ team.Name }}
								</span>
								<span class="text-sm font-semibold dark:text-slate-500 text-slate-400 -ml-2 lg:flex hidden">
									({{ team.Nickname }})
								</span>
							</div>
							<div class="flex items-center gap-6">
								<span class="font-semibold dark:text-slate-400 text-slate-700 lg:text-md text-sm ">
									{{ team.Stats.TotalMatches }} Mapas
								</span>
								<span class="font-semibold dark:text-slate-300 text-slate-600 lg:text-md text-sm">
									{{ team.Stats.Winrate }}% Victorias
								</span>
							</div>
						</div>
						<div class="items-center gap-4 w-3/5 justify-end hidden xl:flex">
							<div v-for="tournament in team.Tournaments" :key="tournament" class="relative h-full">
								<Badge :class="`${GetTournamentColor(tournament)} hover:${GetTournamentColor(tournament)}`" class="text-slate-100">{{ tournament }}</Badge>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>

		<div class="flex justify-between">
			<div class="flex flex-col justify-end px-2">
				<span class="text-sm text-slate-600">{{ teams.length }} equipos encontrados</span>
			</div>
			<!-- Controles de paginación -->
			<div class="flex justify-end gap-4 items-center mr-4">
				<div class="flex justify-end gap-4 items-center mt-4">
					<Button @click="goToPage(currentPage - 1)" variant="outline" :disabled="currentPage === 1">
						<Icon icon="radix-icons:arrow-left" class="h-[1.2rem] w-[1.2rem]" />
					</Button>
					<span class="text-sm">{{ currentPage }} / {{ totalPages }}</span>
					<Button @click="goToPage(currentPage + 1)" variant="outline" :disabled="currentPage === totalPages">
						<Icon icon="radix-icons:arrow-right" class="h-[1.2rem] w-[1.2rem]" />
					</Button>
				</div>
			</div>
		</div>
	</section>
</template>
