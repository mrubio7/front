<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    try {
      // Recupera el code_verifier del localStorage
      const codeVerifier = localStorage.getItem('faceit_code_verifier');

      if (!codeVerifier) {
        console.error('No se encontró el code_verifier');
        return;
      }

      // Envía el código y el code_verifier al backend
      const response = await axios.post(
        'https://api-gateway-1047491143983.europe-southwest1.run.app/api/v1/auth/callback',
        { code, code_verifier: codeVerifier },
        { withCredentials: true }
      );
      // Maneja la respuesta del backend
      console.log('Usuario autenticado:', response.data);

      // Limpia el code_verifier del almacenamiento local
      localStorage.removeItem('faceit_code_verifier');

      // Redirige al usuario
      router.push('/my-profile');
    } catch (error) {
      console.error('Error al autenticar al usuario:', error);
    }
  } else {
    console.error('No se recibió ningún código de autorización.');
  }
});

</script>
<template>
  FACEIT CALLBACK
</template>