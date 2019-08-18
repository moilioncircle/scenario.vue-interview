<template>
  <div class="form">
    <h1>This is form page</h1>
    <Input v-model="text"></Input>
  </div>
</template>

<script>
  export default {
    name: 'form_page',
    data() {
      return {
        text: '',
      }
    }
  }
</script>
