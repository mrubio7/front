<script setup lang="ts">
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button';
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { PathRoutes } from '@/router';
import Prominent_players from '@/components/ibercs/cards/prominent_players.vue';
import { ApiBackend } from '@/api/api_backend';
import { onMounted, ref } from 'vue';
import { ProminentPlayer } from '@/entities/players';
import LoginFaceit from '@/components/ibercs/user/LoginFaceit.vue';

const mode = useColorMode()

const prominentPlayers = ref([] as ProminentPlayer[]);

onMounted(async () => {
    prominentPlayers.value = await ApiBackend.Players.GetProminentPlayers();
});
</script>

<template>
    <section class="flex flex-col min-h-screen w-full">
        <!-- Barra de navegación -->
        <div>
            <NavigationMenu class="w-full max-w-none px-6 pt-2 pb-1 border-b">
                <NavigationMenuList>
                    <div class="flex justify-between">
                        <div class="flex items-center gap-4">
                            <RouterLink :to="PathRoutes.Home">
                                <NavigationMenuItem :class="navigationMenuTriggerStyle()" class="cursor-pointer">
                                    <div>
                                        <img src="/logo.png" width="30"/>
                                    </div>
                                </NavigationMenuItem>
                            </RouterLink>
                            <RouterLink :to="PathRoutes.Ladder_Players">
                                <NavigationMenuItem :class="navigationMenuTriggerStyle()" class="cursor-pointer">
                                    Jugadores
                                </NavigationMenuItem>
                            </RouterLink>
                            <RouterLink :to="PathRoutes.Ladder_Equipos">
                                <NavigationMenuItem :class="navigationMenuTriggerStyle()" class="cursor-pointer">
                                    Equipos
                                </NavigationMenuItem>
                            </RouterLink>
                        </div>
                        <NavigationMenuItem>
                            <div v-if="mode == 'light'">
                                <Button variant="outline" size="icon" @click="mode = 'dark'">
                                    <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                </Button>
                            </div>
                            <div v-else>
                                <Button variant="outline" size="icon" @click="mode = 'light'">
                                    <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                </Button>
                            </div>
                        </NavigationMenuItem>
                        <NavigationMenuItem class="ml-4">
                            <LoginFaceit />
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

        <!-- Contenido principal con 3 columnas -->
        <div class="flex-grow flex px-2">
            <!-- Sección izquierda -->
            <div class="w-1/6 py-4 px-6 lg:block hidden">
                <Prominent_players :players="prominentPlayers" />
            </div>

            <!-- Sección central -->
            <div class="lg:w-4/6 py-4 px-2 w-full">
                <div class="border rounded-md p-2">
                    <RouterView />
                </div>
            </div>

            <!-- Sección derecha -->
            <div class="w-1/6 p-4 lg:block hidden">
                
            </div>
        </div>

        <!-- Footer siempre abajo -->
        <footer class="border-t">
            <div class="p-1 flex justify-between px-4 py-2 h-full">
                <div class="text-sm">
                    <img src="/logo.png" width="80" class=""/>
                </div>
                <div>
                    <div class="flex flex-col justify-between items-end p-1">
                        <a href="https://www.x.com/ibercs_com" target=”_blank” class="rounded p-1.5 hover:bg-slate-300 dark:hover:bg-slate-900 cursor-pointer transition">
                            <span>
                                <Icon icon="ri:twitter-x-line" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                            </span>
                        </a>
                    </div>
                    <div class="flex mb-1">
                        <span class="text-sm text-slate-500">info@ibercs.com</span>
                    </div>
                    <div class="flex gap-1 justify-end items-center text-slate-500">
                        <span class="text-sm">Made with </span>
                        <Icon icon="radix-icons:heart-filled" class="h-[0.8rem] w-[0.8rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </div>
                </div>
            </div>
        </footer>
    </section>
</template>
