<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button';
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'


const mode = useColorMode()
</script>

<template>
    <section class="flex flex-col min-h-screen w-full">
        <!-- Barra de navegación -->
        <div>
            <NavigationMenu class="w-full max-w-none px-6 pt-2 pb-1 border-b">
                <NavigationMenuList>
                    <div class="flex justify-between">
                        <NavigationMenuItem :class="navigationMenuTriggerStyle()" class="cursor-pointer">
                            IBERCS
                        </NavigationMenuItem>
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
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

        <!-- Contenido principal con 3 columnas -->
        <div class="flex-grow flex">
            <!-- Sección izquierda -->
            <div class="w-1/6 p-4">
                
            </div>

            <!-- Sección central -->
            <div class="w-4/6 p-4">
                <div class="border rounded-md p-2">
                    <RouterView />
                </div>
            </div>

            <!-- Sección derecha -->
            <div class="w-1/6 p-4">
                
            </div>
        </div>

        <!-- Footer siempre abajo -->
        <footer class="border-t">
            <div class="p-1 flex justify-between px-4">
                <span class="text-sm"></span>
                <span class="text-sm">Made with ❤︎</span>
            </div>
        </footer>
    </section>
</template>
