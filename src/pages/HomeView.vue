<script setup lang="ts">
import Players_datatable from '../components/ibercs/players_datatable/players_datatable.vue';
import { ApiBackend } from '@/api/api_backend';

const players = await ApiBackend.Players.GetAll()

</script>

<template>
    
    <Players_datatable :players="players" />
</template>