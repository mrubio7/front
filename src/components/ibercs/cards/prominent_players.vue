<script setup lang="ts">
    import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
    import { Avatar, AvatarImage } from '@/components/ui/avatar'
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
    import { Icon } from '@iconify/vue'
    import { ProminentPlayer } from '@/entities/players'
    import { PropType } from 'vue'
    import Spinner from '@/components/ui/spinner/Spinner.vue'

    const props = defineProps({
    players: {
        type: Array as PropType<ProminentPlayer[]>,
        required: true
    }
    })

    const getColorBorder = (n:number) => {
        switch (n+1) {
            case 1:
                return "border-2 border-yellow-500 shadow-md shadow-yellow-800";
            case 2:
                return "border-2 border-neutral-400 shadow-md shadow-neutral-600";
            case 3:
                return "border-2 border-yellow-800 shadow-md shadow-yellow-900";
            case 4:
                return "border-2 border-slate-700";
            case 5:
                return "border-2 border-slate-700";
        }
    }
</script>

<template>
    <section class="flex flex-col gap-2 border rounded-md p-4">
        
        <div class="flex gap-2 align-center -mt-1">
            <span class="text-md font-semibold">Jugadores de la semana</span>
            <TooltipProvider >
                <Tooltip >
                    <TooltipTrigger >
                        <Icon icon="radix-icons:info-circled" class="h-[1rem] w-[1rem] stroke-slate-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Jugadores con un rendimiento destacado durante esta semana.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    
        <div>
            <Table class="rounded-md overflow-hidden">
                <TableBody>
                    <TableRow v-for="(player, n) in props.players" :key="player.Id">
                        <TableCell class="w-[15%]">
                            <Avatar class="h-[25px] w-[25px] flex" :class="getColorBorder(n)">
                                <AvatarImage :src="player.Avatar ? player.Avatar : '/user_unknown.jpg'" alt="Avatar" />
                            </Avatar>
                        </TableCell>
                        <TableCell class="text-left">
                            <a :href="`https://www.faceit.com/es/players/${player.Nickname}`" target="_blank" rel="noopener noreferrer">
                                {{ player.Nickname }}
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="props.players.length == 0">
                        <TableCell colspan="2" class="text-center text-slate-400 py-2">
                            <div class="flex flex-col gap-2 justify-center items-center">
                                <Spinner />
                                <span class="mt-1">Cargando jugadores ...</span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
            
        <div class="flex justify-end -my-2">
            <span class="text-slate-700 font-semibold text-lg">Beta</span>
        </div>
    </section>
</template>
