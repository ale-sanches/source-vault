<script setup>
import Card from './Card.vue'

const onClickAdd = () => {}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      imageUrl="/sneakers/sneakers-1.jpg"
      :price="5000"
      :is-added="true"
      :isFavorite="false"
      :onClickAdd="true"
    />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>
