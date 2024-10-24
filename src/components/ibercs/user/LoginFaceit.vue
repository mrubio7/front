<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { generateCodeChallenge, generateCodeVerifier } from '@/libs/utils';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref } from 'vue';
import { UserState } from './state';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const clientId = import.meta.env.VITE_OAUTH2_FACEIT_ID;
const redirectUri = 'https://pre.ibercs.com/auth/callback';
const codeVerifier = ref('');
    
const loginWithFaceit = async () => {
  codeVerifier.value = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier.value);

  // Guarda el code_verifier en localStorage o en una cookie segura
  localStorage.setItem('faceit_code_verifier', codeVerifier.value);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    scope: 'openid',
  });
  // Abrir la URL en una ventana emergente
  const width = 500;
  const height = 600;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  window.open(`https://accounts.faceit.com?${params.toString()}&redirect_popup=true`, "_blank", `width=${width},height=${height},left=${left},top=${top}`);
};
</script>

<template>
  <div v-if="!UserState.Name">
    <div class="lg:flex hidden">
      <Button variant="outline" @click="loginWithFaceit" class="border flex gap-2 dark:bg-gradient-to-b dark:from-slate-900 bg-gradient-to-t from-slate-100">
        <Icon icon="simple-icons:faceit" class="h-[1rem] w-[1rem] scale-100 transition-all text-orange-600" />
        <span>Entrar con Faceit</span>
      </Button>
    </div>
    <div class="lg:hidden flex">
      <Button variant="outline" @click="loginWithFaceit" class="border flex gap-2 dark:bg-gradient-to-b dark:from-slate-900 bg-gradient-to-t from-slate-100">
        <Icon icon="simple-icons:faceit" class="h-[1rem] w-[1rem] scale-100 transition-all text-orange-600" />
      </Button>
    </div>
  </div>
  <div v-else class="-mt-0.5">
    <div class="flex items-center gap-4 p-1">
      <span class="text-sm font-semibold text-slate-500 text-right">
        {{ UserState.Name }} --xt
      </span>
      <Avatar class="w-7 h-7 border border-slate-500">
        <AvatarImage v-if="UserState.Player.Avatar !== ''" :src="UserState.Player.Avatar" alt="Avatar"  />
        <AvatarImage v-else src="https://github.com/radix-vue.png" alt="Avatar"  />
      </Avatar>
    </div>
  </div>
</template>
