<script setup lang="ts">
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button';
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { PathRoutes } from '@/router';
import Prominent_players from '@/components/ibercs/cards/prominent_players.vue';
import { ApiBackend } from '@/api/api_backend';
import { onMounted, ref, watch } from 'vue';
import { ProminentPlayer } from '@/entities/players';
import LoginFaceit from '@/components/ibercs/user/LoginFaceit.vue';
import { IsAlreadyLogged, UserState } from '@/components/ibercs/user/state';
import { Logout } from '@/libs/utils';

const mode = useColorMode()

const prominentPlayers = ref([] as ProminentPlayer[]);

onMounted(async () => {
    IsAlreadyLogged()
    prominentPlayers.value = await ApiBackend.Players.GetProminentPlayers();
});

watch(() => UserState.ID, () => {
  console.log("Layout Userloaded", UserState)
})
</script>

<template>
    <section class="flex flex-col min-h-screen w-full">
        <!-- Barra de navegación -->
        <div class="flex w-full justify-between border-b">
            <div class="flex w-full">
                <NavigationMenu class="min-w-full px-6 pt-2 pb-1">
                    <NavigationMenuList class="flex min-w-full justify-between items-center space-x-4">
                        <div class="flex items-center">
                            <NavigationMenuItem>
                                <NavigationMenuLink :href="PathRoutes.Home" :class="navigationMenuTriggerStyle()">
                                    <div>
                                        <img src="/logo.png" width="30"/>
                                    </div>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink :href="PathRoutes.Ladder_Players" :class="navigationMenuTriggerStyle()">
                                    Jugadores
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink :href="PathRoutes.Ladder_Equipos" :class="navigationMenuTriggerStyle()">
                                    Equipos
                                </NavigationMenuLink>
                            </NavigationMenuItem>
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
                        
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <NavigationMenu class="w-2/12 px-6 pt-2 pb-2">
                <NavigationMenuList class="flex justify-end items-center space-x-4">
                    <div v-if="UserState.Name !== ''">
                        <NavigationMenuItem class="">
                            <NavigationMenuTrigger>
                                <LoginFaceit />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent class="">
                                <div class="p-1 pr-2 pb-2">
                                    <NavigationMenuLink href="/my-profile" class="block p-2 text-sm dark:text-slate-400 hover:dark:bg-slate-800 rounded transition">Mi perfil</NavigationMenuLink>
                                    <NavigationMenuLink @click="Logout" class="block p-2 text-sm dark:text-slate-400 hover:dark:bg-slate-800 rounded transition">Desconectar</NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </div>
                    <div v-else>
                        <NavigationMenuItem>
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
