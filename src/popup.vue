<script setup>
import { reactive } from "vue"
import "~style.css"

const state = reactive({ count: 0, action: null })

function test() {
  console.log("test");
}
function tab() {
  chrome.tabs.create({
    url: "./tabs/test.html"
  })
}
function increment() {
  state.count++
  state.action = "increment"
}

function decrement() {
  state.count--
  state.action = "decrement"
}
</script>


<template>
  <div>
    <span class="material-icons">
      search
    </span>

    <span 
      class="flex-grow-[1] text-base material-icons rounded-full py-1  px-2 ">
      west
    </span>
    <h2 class="text-center">
      Welcome to yours
      <a href="https://www.plasmo.com" target="_blank">Plasmo</a> Extension!
    </h2>

    <div class="opacity-100">
      adasd
    </div>
    <div class="opacity-50">
      adasd
    </div>

    <div class="opacity-0">
      adasd
    </div>

    <div class="container">
      <button @click="decrement">-</button>
      <p>
        <b>{{ state.count }}</b>
      </p>
      <button @click="increment">+</button>
      <button @click="tab">tab</button>
      <button @click="test">test</button>
    </div>
  </div>
  <p v-if="state.action" class="action text-center">
    {{ state.action }}
  </p>
</template>

<style>
.container {
  min-width: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 47px;
}

.text-center {
  text-align: center;
}

.action {
  color: #470;
  font-weight: bold;
}
</style>

