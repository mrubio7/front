<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const teamName = route.params.team_name;
</script>

<template>
    {{ teamName }}
</template>