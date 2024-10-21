<script setup lang="ts">
import { TeamsModel } from '@/entities/teams';
import { PropType } from 'vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { PathRoutes } from '@/router';
import Badge from '@/components/ui/badge/Badge.vue';

const props = defineProps({
	teams: {
		type: Array as PropType<TeamsModel[]>,
		required: true
	}
})

const getColorByTournament = (tournament:string) => {
	switch (tournament) {
		case "ESEA ADVANCED":
			return "bg-amber-400";
		case "ESEA MAIN":
			return "bg-red-600";
		case "ESEA INTERMEDIATE":
			return "bg-fuchsia-600";
		case "ESEA OPEN10":
			return "bg-indigo-700";
		case "ESEA OPEN":
			return "bg-blue-600";
	}
}
</script>

<template>
	<section class="w-full">
		<span class="p-2 text-lg font-semibold">Estadísticas de equipos</span>
		<div v-if="props.teams.length == 0">
			<div class="flex flex-col gap-4 p-4">
				<Skeleton class="w-full h-16 rounded-sm" />
				<Skeleton class="w-full h-16 rounded-sm" />
				<Skeleton class="w-full h-16 rounded-sm" />
			</div>
		</div>
		<div class="flex flex-col gap-4 p-4">
			
			<div v-for="team in props.teams">
				{{ console.log(team) }}
				<a :href="PathRoutes.Team_Profile.replace(':team_name', team.Nickname)">
					<div class="flex items-center border dark:border-slate-800 border-slate-300 rounded-sm transition py-2 px-4 hover:bg-slate-900 cursor-pointer justify-between">
						<div class="flex items-center gap-6 xl:w-2/5 w-full justify-between">
							<div class="flex items-center gap-4">
								<Avatar class="border dark:border-slate-800 border-slate-400">
									<AvatarImage :src="team.Avatar" alt="team avatar" />
								</Avatar>
								<span class="text-md font-semibold dark:text-slate-200 text-slate-700">
									{{ team.Name }}
								</span>
								<span class="text-sm font-semibold dark:text-slate-500 text-slate-400 -ml-2">
									({{ team.Nickname }})
								</span>
							</div>
							<div class="flex flex-col items-center mr-10">
								<span class="text-md font-semibold dark:text-slate-400 text-slate-700">
									{{ team.Stats.TotalMatches }} Mapas
								</span>
								<span class="text-md font-semibold dark:text-slate-300 text-slate-600 -mt-1">
									{{ team.Stats.Winrate }}% Victorias
								</span>
							</div>
						</div>
						<div class="items-center gap-4 w-3/5 justify-end hidden xl:flex">
							<div v-for="tournament in team.Tournaments" class="relative h-full">
								<Badge :class="`${getColorByTournament(tournament)} hover:${getColorByTournament(tournament)}`" class="text-slate-100">{{ tournament }}</Badge>
							</div>
							<!-- <div v-for="map in team.Stats.MapStats" class="relative h-full">
								<div class="border border-slate-700 rounded overflow-hidden transition relative">
								<img :src="`/maps/${map.MapName}.jpeg`" width="65" class="object-cover" />
								<div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
									<span class="text-md font-semibold text-slate-300">{{ map.Matches }}</span>
									<span class="text-md font-semibold text-slate-200 -mt-1">{{ map.Winrate > 0 ? map.Winrate : 0 }}%</span>
								</div>
								</div>
							</div> -->
						</div>
					</div>
				</a>
			</div>
			
		</div>
	</section>
</template>