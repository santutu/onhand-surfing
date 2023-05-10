<script setup>
import { reactive, ref } from "vue"

const text = ref("");

</script>


<template>
    <div>
        <h1>
            options
            Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
        </h1>
        <h2>This is the Option UI page!</h2>

        <input type="text" v-model="text">
    </div>
</template>