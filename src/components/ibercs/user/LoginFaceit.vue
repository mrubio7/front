<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref } from 'vue';

const FACEIT_AUTH_URL = 'https://accounts.faceit.com';
const CLIENT_ID = import.meta.env.VITE_OAUTH2_FACEIT_ID;
const REDIRECT_URI = 'https://localhost:8080/api/v1/auth/callback'; // La URI a la que Faceit redirigirá después del login
const RESPONSE_TYPE = 'code';
const SCOPE = 'openid'; // El alcance que necesitas para la API de Faceit

const userAvatar = ref<string | null>(null);

const handleLogin = async () => {
  const codeVerifier = generateRandomString(128); // Genera un code_verifier
  const codeChallenge = await generateCodeChallenge(codeVerifier); // Genera un code_challenge

  // Guardar el code_verifier en sessionStorage
  sessionStorage.setItem('faceit_code_verifier', codeVerifier);

  const authUrl = `${FACEIT_AUTH_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPE}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  const width = 500;
  const height = 700;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(authUrl, 'Login with Faceit', `width=${width},height=${height},top=${top},left=${left}`);
};


// Función para generar un string aleatorio
const generateRandomString = (length: number) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += charset[array[i] % charset.length];
  }
  return result;
};

// Función para generar el challenge (SHA256 del code_verifier)
const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

</script>

<template>
  <div>
      <Button v-if="!userAvatar" variant="outline" @click="handleLogin" class="border flex gap-2 dark:bg-gradient-to-b dark:from-slate-900 bg-gradient-to-t from-slate-100">
        <Icon icon="simple-icons:faceit" class="h-[1rem] w-[1rem] scale-100 transition-all text-orange-600" />
        <span>Entrar con Faceit</span>
      </Button>

      <div v-else>
        <img :src="userAvatar" alt="Avatar del usuario" class="rounded-full w-12 h-12" />
      </div>
  </div>
</template>
