<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Teams_datatable from '@/components/ibercs/teams_datatable/teams_datatable.vue';
import { TeamsModel } from '@/entities/teams';
import { onMounted, ref } from 'vue';

const teams = ref([] as TeamsModel[]);

onMounted(async () => {
	teams.value = await ApiBackend.Teams.GetAll(true);
});
</script>

<template>
	<Teams_datatable :teams="teams"/>
</template>