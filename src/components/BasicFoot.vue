<template>
  <footer class="basic-footer">
    <p>&copy; {{ currentYear }} PlantQuest. All rights reserved.</p>
  </footer>
</template>

<script>
const currentYear = new Date().getFullYear();

export default {
  name: 'BasicFoot',
  data() {
    return {
      currentYear
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-footer {
  padding: 1rem;
  text-align: center;
  background-color: #f5f5f5;
  color: #333;
}
</style>
