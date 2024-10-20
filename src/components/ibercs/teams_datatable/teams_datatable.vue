<script setup lang="ts">
import { TeamsModel } from '@/entities/teams';
import { PropType } from 'vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps({
	teams: {
		type: Array as PropType<TeamsModel[]>,
		required: true
	}
})
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
				<div class="flex items-center border border-slate-800 rounded-sm transition py-2 px-4 hover:bg-slate-900 cursor-pointer justify-between">
					<div class="flex items-center gap-6 w-2/5 justify-between">
						<div class="flex items-center gap-4">
							<Avatar class="border-2 border-slate-800">
								<AvatarImage :src="team.Avatar" alt="team avatar" />
							</Avatar>
							<span class="text-md font-semibold text-slate-200">
								{{ team.Name }}
							</span>
							<span class="text-sm font-semibold text-slate-500">
								({{ team.Nickname }})
							</span>
						</div>
						<div class="flex flex-col items-center mr-10">
							<span class="text-md font-semibold text-slate-400">
								{{ team.Stats.TotalMatches }} Mapas
							</span>
							<span class="text-md font-semibold text-slate-300 -mt-1">
								{{ team.Stats.Winrate }}% Victorias
							</span>
						</div>
					</div>
					<div class="flex items-center gap-4 w-3/5 justify-end">
						<div v-for="map in team.Stats.MapStats" class="relative h-full">
							<div class="border border-slate-700 rounded overflow-hidden transition relative">
							<img :src="`/maps/${map.MapName}.jpeg`" width="70" class="object-cover" />
							<div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
								<span class="text-md font-semibold text-slate-300">{{ map.Matches }}</span>
								<span class="text-md font-semibold text-slate-200 -mt-1">{{ map.Winrate > 0 ? map.Winrate : 0 }}%</span>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>