<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { TeamsModel } from '@/entities/teams';
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import Team_players from '@/components/ibercs/team_players/team_players.vue';
import { PlayerModel } from '@/entities/players';

const route = useRoute();
const teamNickname = route.params.team_name;

const team = ref({} as TeamsModel)
const players = ref([] as PlayerModel[])

onMounted(async () => {
    team.value = await ApiBackend.Teams.GetByNickname(teamNickname as string)
    players.value = await ApiBackend.Players.Get(team.value.PlayersId)
})
</script>

<template>
    <section class="p-4">
        <div v-if="team == undefined">
            <Spinner />
        </div>
        <div v-else class="flex gap-6 mb-2">
            <img :src="team.Avatar" width="200" class="border-2 rounded-md"/>
            <div class="w-full flex flex-col justify-between">
                <div class="flex justify-between">
                    <div class="flex flex-col gap-4 items-start">
                        <span class="text-4xl font-bold dark:text-slate-400 text-slate-700">{{ team.Name }}</span>
                        <span class="text-xl font-bold dark:text-slate-400  text-slate-700">{{ team.Nickname }}</span>
                    </div>
                    <div class="flex gap-4 items-start">
                        <a v-if="team.Website != undefined" :href="team.Website" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                            <Icon icon="mdi:web" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                        </a>
                        <a v-if="team.Instagram !== undefined" :href="team.Instagram" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                            <Icon icon="radix-icons:instagram-logo" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                        </a>
                        <a v-if="team.Twitter != undefined" :href="team.Twitter" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                            <Icon icon="ri:twitter-x-line" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                        </a>
                    </div>
                </div>
                <div class="flex gap-6 justify-start">
                    <div class="flex flex-col items-center border rounded-sm p-4 bg-slate-100 dark:bg-slate-800">
                        <span class="text-2xl font-bold">{{ team.Stats?.TotalMatches }}</span>
                        <span class="font-semibold">Partidos</span>
                    </div>
                    <div class="flex flex-col items-center border rounded-sm p-4 bg-slate-100 dark:bg-slate-800">
                        <span class="text-2xl font-bold">{{ team.Stats?.Wins }}</span>
                        <span class="font-semibold">Victorias</span>
                    </div>
                    <div class="flex flex-col items-center justify-center border rounded-sm p-6 bg-slate-100 dark:bg-slate-800">
                        <span class="text-2xl font-bold -mt-1">{{ team.Stats?.Winrate }}%</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <Accordion type="single" collapsible>
            <AccordionItem value="item-1" class="border-0">
            <AccordionTrigger class="no-underline text-slate-500 hover:text-slate-400">
                <span class="text-lg font-bold">Historial de partidos</span>
            </AccordionTrigger>
            <AccordionContent>
                <Team_match_history />
            </AccordionContent>
            </AccordionItem>
        </Accordion> -->
        <div>
            <span class="text-lg font-bold">Jugadores</span>
            <div>
                <Team_players :players="players" />
            </div>
        </div>
    </section>
</template>

<style>
.no-underline {
  text-decoration: none;
}

.no-underline:hover {
  text-decoration: none;
}
</style>