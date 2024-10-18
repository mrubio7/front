<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { PropType } from 'vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Button from '@/components/ui/button/Button.vue'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'
import { PlayerModel } from '@/entities/players'

// Props
const props = defineProps({
  players: {
    type: Array as PropType<PlayerModel[]>,
    required: true
  }
})

// Estado para controlar la página actual y el tamaño de la página
const currentPage = ref(1)
const pageSize = ref(15) // Número de jugadores por página

// Estado para el término de búsqueda
const searchTerm = ref('')

// Estado para controlar la ordenación
const sortBy = ref<keyof PlayerModel['Stats'] | 'Nickname'>('Elo') // columna por defecto
const sortOrder = ref<'asc' | 'desc'>('desc') // orden por defecto

// Computed property para filtrar y ordenar los jugadores
const filteredPlayers = computed(() => {
  let sortedPlayers = [...props.players]

  // Filtrar por nombre de usuario
  if (searchTerm.value) {
    sortedPlayers = sortedPlayers.filter(player =>
      player.Nickname.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  // Ordenar por la columna seleccionada
  sortedPlayers.sort((a, b) => {
    let valA, valB
    if (sortBy.value === 'Nickname') {
      valA = a.Nickname.toLowerCase()
      valB = b.Nickname.toLowerCase()
    } else {
      valA = a.Stats[sortBy.value]
      valB = b.Stats[sortBy.value]
    }

    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })

  return sortedPlayers
})

// Cálculo del número total de páginas basado en los jugadores filtrados
const totalPages = computed(() => Math.ceil(filteredPlayers.value.length / pageSize.value) || 1)

// Filtrar los jugadores que deben mostrarse en la página actual
const paginatedPlayers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPlayers.value.slice(start, end)
})

// Funciones para cambiar de página
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Función para cambiar la columna de ordenación
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

// Watcher para resetear la página actual cuando cambia el término de búsqueda
watch(searchTerm, () => {
  currentPage.value = 1
})
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
          <!-- Ordenar por Elo -->
          <TableHead class="cursor-pointer" @click="changeSort('Elo')">
            <div class="flex items-center gap-1">
              Elo
              <Icon :icon="sortBy === 'Elo' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[1.2rem] w-[1.2rem]" />
            </div>
          </TableHead>

          <!-- Header Nickname -->
          <TableHead class="cursor-pointer">
            <div class="flex items-center gap-1 justify-center">
              Nickname
            </div>
          </TableHead>

          <!-- Ordenar por KR Ratio -->
          <TableHead class="cursor-pointer" @click="changeSort('KrRatio')">
            <div class="flex items-center gap-1 justify-center">
              KR Ratio
              <Icon :icon="sortBy === 'KrRatio' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[1.2rem] w-[1.2rem]" />
            </div>
          </TableHead>

          <!-- Ordenar por KD Ratio -->
          <TableHead class="cursor-pointer" @click="changeSort('KdRatio')">
            <div class="flex items-center gap-1 justify-center">
              KD Ratio
              <Icon :icon="sortBy === 'KdRatio' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[1.2rem] w-[1.2rem]" />
            </div>
          </TableHead>

          <!-- Ordenar por Hs -->
          <TableHead class="cursor-pointer" @click="changeSort('HeadshotPercentAverage')">
            <div class="flex items-center gap-1 justify-center">
              % Headshots
              <Icon :icon="sortBy === 'HeadshotPercentAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[1.2rem] w-[1.2rem]" />
            </div>
          </TableHead>

          <!-- Ordenar por Kills -->
          <TableHead class="cursor-pointer" @click="changeSort('KillsAverage')">
            <div class="flex items-center gap-1 justify-center">
              Kills (Avg)
              <Icon :icon="sortBy === 'KillsAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[1.2rem] w-[1.2rem]" />
            </div>
          </TableHead>

          <!-- Ordenar por Deaths -->
          <TableHead class="cursor-pointer" @click="changeSort('DeathsAverage')">
            <div class="flex items-center gap-1 justify-center">
              Deaths (Avg)
              <Icon :icon="sortBy === 'DeathsAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[1.2rem] w-[1.2rem]" />
            </div>
          </TableHead>

          <!-- Ordenar por Deaths -->
          <TableHead class="cursor-pointer" @click="changeSort('MVPAverage')">
            <div class="flex items-center gap-1 justify-right">
              MVP (Avg)
              <Icon :icon="sortBy === 'MVPAverage' && sortOrder === 'asc' ? 'radix-icons:arrow-up' : 'radix-icons:arrow-down'" class="h-[1.2rem] w-[1.2rem]" />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <!-- Cuerpo de la tabla -->
      <TableBody>
      
          <TableRow v-for="player in paginatedPlayers" :key="player.Id">
            <TableCell class="text-left"><Badge variant="secondary">{{ player.Stats.Elo }}</Badge></TableCell>
            <TableCell class="text-center hover:text-orange-500 transition">
              <a :href="`https://www.faceit.com/es/players/${player.Nickname}`" target="_blank" rel="noopener noreferrer">
                {{ player.Nickname }}
              </a>
            </TableCell>
            <TableCell class="text-center">{{ player.Stats.KrRatio }}</TableCell>
            <TableCell class="text-center">{{ player.Stats.KdRatio }}</TableCell>
            <TableCell class="text-center">{{ player.Stats.HeadshotPercentAverage }}</TableCell>
            <TableCell class="text-center">{{ player.Stats.KillsAverage }}</TableCell>
            <TableCell class="text-center">{{ player.Stats.DeathsAverage }}</TableCell>
            <TableCell class="text-center">{{ player.Stats.MVPAverage }}</TableCell>
          </TableRow>
        
        <!-- Mostrar un mensaje si no hay jugadores -->
        <TableRow v-if="paginatedPlayers.length === 0">
          <TableCell colspan="8" class="text-center text-slate-400 py-6">
            No se encontraron jugadores
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
