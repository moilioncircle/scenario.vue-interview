<template>
  <div class="form">
    <h1>This is form page</h1>
    <Form class="form">
      <FormItem label="Name" :label-width="100">
        <Input v-model="text"></Input>
      </FormItem>
    </Form>
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

<style scoped>
  .form {
    width: 400px;
  }
</style>
