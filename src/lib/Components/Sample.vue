<script lang="ts" setup>
import { reactive, ref } from 'vue';


const text = ref("");
</script>

<template>
    <div class="test">sample component</div>
    <input type="text" v-model="text">
    {{ text }}
</template>

