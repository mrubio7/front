<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import { PropType } from 'vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/ui/button/Button.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'
import { PlayerModel } from '@/entities/players'
import { calculatePercentiles, filterPlayers, getColor } from './utils'

// Props
const props = defineProps({
	players: {
		type: Array as PropType<PlayerModel[]>,
		required: true
	}
})

interface PlayerWithRank extends PlayerModel {
  GlobalRank: number;
}

const currentPage = ref(1)
const pageSize = ref(12) // Número de jugadores por página

const searchTerm = ref('')
const sortBy = ref<keyof PlayerModel['Stats'] | 'Nickname'>('Elo')
const sortOrder = ref<'asc' | 'desc'>('desc') // orden por defecto

const filteredPlayers = ref<PlayerWithRank[]>([]);

// Usar `watchEffect` para actualizar jugadores filtrados cuando props.players o los términos cambien
watchEffect(() => {
  if (props.players.length) {
    filteredPlayers.value = filterPlayers(props.players, searchTerm, sortBy, sortOrder).value;
  }
});

const totalPages = computed(() => Math.ceil(filteredPlayers.value.length / pageSize.value) || 1)

const paginatedPlayers = computed<PlayerWithRank[]>(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredPlayers.value.slice(start, end);
});

const nextPage = () => {
	if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
	if (currentPage.value > 1) currentPage.value--
}

const changeSort = (column: keyof PlayerModel['Stats'] | 'Nickname') => {
	if (sortBy.value === column) {
		// Cambiar el orden (ascendente/descendente) si se vuelve a hacer clic en la misma columna
		sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
	} else {
		// Cambiar la columna de ordenación
		sortBy.value = column
		sortOrder.value = 'asc' // restablecer a ascendente cuando se selecciona una nueva columna
	}
}

watch(searchTerm, () => {
	currentPage.value = 1
})

const percentiles = ref<Record<string, { p10: number, p95: number }>>({
	Elo: { p10: NaN, p95: NaN },
	KrRatio: { p10: NaN, p95: NaN },
	KdRatio: { p10: NaN, p95: NaN },
	HeadshotPercentAverage: { p10: NaN, p95: NaN },
	KillsAverage: { p10: NaN, p95: NaN },
	DeathsAverage: { p10: NaN, p95: NaN },
	MVPAverage: { p10: NaN, p95: NaN },
});

watch(
	() => props.players,
	(newPlayers) => {
		if (newPlayers.length > 0) {
			const stats = ['Elo', 'KrRatio', 'KdRatio', 'HeadshotPercentAverage', 'KillsAverage', 'DeathsAverage', 'MVPAverage'] as const;
			
			percentiles.value = stats.reduce((acc, stat) => {
				const values = newPlayers
					.map(player => player.Stats ? player.Stats[stat] : undefined)
					.filter((value): value is number => typeof value === 'number' && !isNaN(value));  // Filtrar solo valores numéricos válidos

				// Solo calcular percentiles si hay suficientes datos
				if (values.length > 0) {
					acc[stat] = {
						p10: calculatePercentiles(values, 15),
						p95: calculatePercentiles(values, 90),
					};
				} else {
					acc[stat] = {
						p10: NaN,
						p95: NaN,
					};
				}

				return acc;
			}, {} as Record<string, { p10: number, p95: number }>);
		}
	},
	{ immediate: true }
);

</script>

<template>
	<section class="w-full">
		<span class="p-2 text-lg font-semibold">Estadísticas de jugadores</span>

		<!-- Campo de búsqueda -->
		<div class="flex px-2 mt-2 gap-2 items-center">
			<Icon icon="radix-icons:magnifying-glass" class="h-[1.2rem] w-[1.2rem]" />
			<div class="w-60 my-2">
				<Input type="text" v-model="searchTerm" placeholder="Buscar por nickname..." />
			</div>
		</div>

		<Table class="min-w-full rounded-md overflow-hidden">
			<!-- Cabecera de la tabla -->
			<TableHeader>
				<TableRow class="w-full">
					<TableHead class="">
						<div class="flex items-center gap-1">
							
						</div>
					</TableHead>

					<!-- Ordenar por Elo -->
					<TableHead class="cursor-pointer" @click="changeSort('Elo')">
						<div class="flex items-center gap-1">
							Elo
							<Icon :icon="sortBy === 'Elo' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[0.8rem] w-[0.8rem] mt-0.5" />
						</div>
					</TableHead>

					<!-- Header Avatar -->
					<TableHead class="w-10">
						<div class="flex items-center gap-1 justify-center">
							
						</div>
					</TableHead>

					<!-- Header Nickname -->
					<TableHead class="">
						<div class="flex items-center gap-1 justify-left">
							Nickname
						</div>
					</TableHead>

					<!-- Ordenar por KR Ratio -->
					<TableHead class="cursor-pointer" @click="changeSort('KrRatio')">
						<div class="flex items-center gap-1 justify-center">
							KR Ratio
							<Icon :icon="sortBy === 'KrRatio' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[0.8rem] w-[0.8rem] mt-0.5" />
						</div>
					</TableHead>

					<!-- Ordenar por KD Ratio -->
					<TableHead class="cursor-pointer" @click="changeSort('KdRatio')">
						<div class="flex items-center gap-1 justify-center">
							KD Ratio
							<Icon :icon="sortBy === 'KdRatio' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[0.8rem] w-[0.8rem] mt-0.5" />
						</div>
					</TableHead>

					<!-- Ordenar por Hs -->
					<TableHead class="cursor-pointer" @click="changeSort('HeadshotPercentAverage')">
						<div class="flex items-center gap-1 justify-center">
							% Headshots
							<Icon :icon="sortBy === 'HeadshotPercentAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[0.8rem] w-[0.8rem] mt-0.5" />
						</div>
					</TableHead>

					<!-- Ordenar por Kills -->
					<TableHead class="cursor-pointer" @click="changeSort('KillsAverage')">
						<div class="flex items-center gap-1 justify-center">
							Kills (Avg)
							<Icon :icon="sortBy === 'KillsAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[0.8rem] w-[0.8rem] mt-0.5" />
						</div>
					</TableHead>

					<!-- Ordenar por Deaths -->
					<TableHead class="cursor-pointer" @click="changeSort('DeathsAverage')">
						<div class="flex items-center gap-1 justify-center">
							Deaths (Avg)
							<Icon :icon="sortBy === 'DeathsAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[0.8rem] w-[0.8rem] mt-0.5" />
						</div>
					</TableHead>

					<!-- Ordenar por Deaths -->
					<TableHead class="cursor-pointer" @click="changeSort('MVPAverage')">
						<div class="flex items-center gap-1 justify-right">
							MVP (Avg)
							<Icon :icon="sortBy === 'MVPAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[0.8rem] w-[0.8rem] mt-0.5" />
						</div>
					</TableHead>
				</TableRow>
			</TableHeader>

			<!-- Cuerpo de la tabla -->
			<TableBody>
				<TableRow v-for="(player) in paginatedPlayers" :key="player.Id">
					<TableCell class="text-left w-8 font-semibold text-slate-500">
						{{ player.GlobalRank }}º
					</TableCell>
					<TableCell class="text-left"><Badge variant="secondary">{{ player.Stats.Elo }}</Badge></TableCell>
					<TableCell class="text-right">
						<a :href="`https://www.faceit.com/es/players/${player.Nickname}`" target="_blank" rel="noopener noreferrer">
							<Avatar class="w-7 h-7 flex">
								<AvatarImage :src="player.Avatar" alt="avatar" />
							</Avatar>
						</a>
					</TableCell>
					<TableCell class="text-left hover:text-orange-500 transition">
						<a :href="`https://www.faceit.com/es/players/${player.Nickname}`" target="_blank" rel="noopener noreferrer">
							{{ player.Nickname }}
						</a>
					</TableCell>
					<TableCell v-if="player.Stats.KdRatio == undefined" colspan="6" class="mt-0.5 ml-10 text-slate-500 text-center">
						No existen partidas recientes
					</TableCell>
					<TableCell v-if="player.Stats.KrRatio != undefined" :class="getColor(player.Stats.KrRatio, percentiles.KrRatio.p10, percentiles.KrRatio.p95, false)" class="text-center">
						{{ player.Stats.KrRatio }}
					</TableCell>
					<TableCell v-if="player.Stats.KdRatio != undefined"  :class="getColor(player.Stats.KdRatio, percentiles.KdRatio.p10, percentiles.KdRatio.p95, false)" class="text-center">
						{{ player.Stats.KdRatio }}
					</TableCell>
					<TableCell v-if="player.Stats.HeadshotPercentAverage != undefined" :class="getColor(player.Stats.HeadshotPercentAverage, percentiles.HeadshotPercentAverage.p10, percentiles.HeadshotPercentAverage.p95, false)" class="text-center">
						{{ player.Stats.HeadshotPercentAverage }}
					</TableCell>
					<TableCell v-if="player.Stats.KillsAverage != undefined" :class="getColor(player.Stats.KillsAverage, percentiles.KillsAverage.p10, percentiles.KillsAverage.p95, false)" class="text-center">
						{{ player.Stats.KillsAverage }}
					</TableCell>
					<TableCell v-if="player.Stats.DeathsAverage != undefined" :class="getColor(player.Stats.DeathsAverage, percentiles.DeathsAverage.p10, percentiles.DeathsAverage.p95, true)" class="text-center">
						{{ player.Stats.DeathsAverage }}
					</TableCell>
					<TableCell v-if="player.Stats.MVPAverage != undefined" :class="getColor(player.Stats.MVPAverage, percentiles.MVPAverage.p10, percentiles.MVPAverage.p95, false)" class="text-center">
						{{ player.Stats.MVPAverage }}
					</TableCell>
				</TableRow>
				
				<!-- Mostrar un mensaje si no hay jugadores -->

				<TableRow v-if="props.players.length == 0">
					<TableCell colspan="10" class="text-center text-slate-400 py-6">
						<div class="flex flex-col gap-2 justify-center items-center">
							<Spinner />
							<span class="mt-2">Cargando jugadores...</span>
						</div>
					</TableCell>
				</TableRow>

				<TableRow v-if="paginatedPlayers.length === 0 && props.players.length > 0">
					<TableCell colspan="10" class="text-center text-slate-400 py-6">
						<span class="mt-2">No se encontraron jugadores 😢</span>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>

		<div class="flex justify-between">
			<div class="flex flex-col justify-end px-2">
				<span class="text-xs text-slate-600 mb-2">(Últimas 12 partidas)</span>
				<span class="text-sm text-slate-600">{{ players.length }} jugadores encontrados</span>
			</div>
			<!-- Controles de paginación -->
			<div class="flex justify-end gap-4 items-center mt-4">
				<Button @click="prevPage" variant="outline" :disabled="currentPage === 1">
					<Icon icon="radix-icons:arrow-left" class="h-[1.2rem] w-[1.2rem]" />
				</Button>
				<span class="text-sm">{{ currentPage }} / {{ totalPages }}</span>
				<Button @click="nextPage" variant="outline" :disabled="currentPage === totalPages">
					<Icon icon="radix-icons:arrow-right" class="h-[1.2rem] w-[1.2rem]" />
				</Button>
			</div>
		</div>
	</section>
</template>
