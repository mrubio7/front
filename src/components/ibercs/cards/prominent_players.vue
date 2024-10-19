<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Icon } from '@iconify/vue'

const players = [
  {
    Id: 1,
    Avatar: "https://distribution.faceit-cdn.net/images/c0f00f04-d65e-444a-b447-815b539b781e.jpeg",
    Nickname: 'vanityy1',
    Stats: {
      KrRatio: 1.2,
      KdRatio: 1.5,
      Elo: 1500,
    },
  },
  {
    Id: 2,
    Avatar: "https://assets.faceit-cdn.net/avatars/e326eb2d-4e3e-4ebe-a34d-4a07def33893_1607003196272.jpg",
    Nickname: 'BrodAsS',
    Stats: {
      KrRatio: 0.9,
      KdRatio: 1.0,
      Elo: 1400,
    },
  },
  {
    Id: 3,
    Avatar: "https://assets.faceit-cdn.net/avatars/6edb1ba0-7c0d-4480-a68f-45f476a21626_1550488534287.png",
    Nickname: 'chakaL',
    Stats: {
      KrRatio: 1.8,
      KdRatio: 1.7,
      Elo: 1600,
    },
  },
  {
    Id: 4,
    Avatar: "https://distribution.faceit-cdn.net/images/b9c993e0-b148-43d9-a98e-6d29b76fc9b7.jpeg",
    Nickname: 'MOOGU',
    Stats: {
      KrRatio: 1.8,
      KdRatio: 1.7,
      Elo: 1600,
    },
  },
  {
    Id: 5,
    Avatar: "https://distribution.faceit-cdn.net/images/a262055f-792b-44c1-b5fa-f9c810045df9.jpeg",
    Nickname: 'Melgot',
    Stats: {
      KrRatio: 1.8,
      KdRatio: 1.7,
      Elo: 1600,
    },
  }
]

const getColorPosition = (n:number) => {
    switch (n) {
        case 1:
            return "bg-yellow-600";
        case 2:
            return "bg-slate-600";
        case 3:
            return "bg-yellow-900";
        case 4:
            return "";
        case 5:
            return "";
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
                <TableRow v-for="(player, n) in players" :key="player.Id">
                    <TableCell class="w-[10%]">
                        <Badge variant="secondary" :class="getColorPosition(n+1)">{{ n+1 }}</Badge>
                    </TableCell>
                    <TableCell class="w-[15%]">
                        <Avatar class="h-[25px] w-[25px] flex">
                            <AvatarImage :src="player.Avatar" alt="Avatar" />
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
