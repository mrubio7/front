<script setup lang="ts">
const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code && window.opener) {
    // Envía el código de autorización de vuelta a la pestaña original
    window.opener.postMessage({ code }, window.opener.location.origin);

    // Cierra la pestaña emergente
    window.close();
  }
  
</script>

<template>
    
</template>