<script setup lang="ts">
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
    import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
    import { Avatar, AvatarImage } from '@/components/ui/avatar'
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
    import { Icon } from '@iconify/vue'
    import { ProminentPlayer } from '@/entities/players'
    import { PropType } from 'vue'

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
    <Card class="rounded-md">
        <CardHeader>
            <CardTitle class="-mt-2 flex gap-2 align-center">
                Jugadores de la semana
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
            </CardTitle>
        </CardHeader>
        <CardContent class="-mt-2">
            <Table class="rounded-md overflow-hidden">
                <TableBody>
                    <TableRow v-for="(player, n) in props.players" :key="player.Id">
                        <TableCell class="w-[15%]">
                            <Avatar class="h-[25px] w-[25px] flex" :class="getColorBorder(n)">
                                <AvatarImage :src="player.Avatar ? player.Avatar : './user_unknown.jpg'" alt="Avatar" />
                            </Avatar>
                        </TableCell>
                        <TableCell class="text-left">
                            <a :href="`https://www.faceit.com/es/players/${player.Nickname}`" target="_blank" rel="noopener noreferrer">
                                {{ player.Nickname }}
                            </a>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter class="flex justify-end -my-4 -mt-8">
            <span class="text-slate-700 font-semibold">Beta</span>
        </CardFooter>
    </Card>
</template>
