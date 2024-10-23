<script setup lang="ts">
import { onMounted } from 'vue';

const exchangeCodeForToken = async (code: string) => {
  const storedVerifier = sessionStorage.getItem('faceit_code_verifier'); // Recuperar el code_verifier

  if (!storedVerifier) {
    console.error('Code verifier no encontrado');
    return;
  }

  // Hacer la petición al servidor de Faceit para obtener el token de acceso
  const response = await fetch('https://accounts.faceit.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_OAUTH2_FACEIT_ID,
      grant_type: 'authorization_code',
      code: code,
      code_verifier: storedVerifier
    }),
  });

  const data = await response.json();
  console.log('Token de acceso:', data.access_token);

  // Si obtuviste correctamente el token, ahora obtén el userId del usuario
  if (data.access_token) {
    const userProfile = await fetchUserProfile(data.access_token);
    console.log('Perfil de usuario:', userProfile);
  }
};

const fetchUserProfile = async (accessToken: string) => {
  // Llamar a la API de Faceit para obtener el perfil del usuario
  const response = await fetch('https://open.faceit.com/data/v4/players/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const userProfile = await response.json();
  return userProfile;
};

// Captura el `code` en la redirección
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code'); // Captura el código de la URL
  if (code) {
    exchangeCodeForToken(code); // Intercambiar el código por el token de acceso
  }
});
</script>
