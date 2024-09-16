<template>
<v-main app>
  <v-container
    style="padding:0px;"
    fluid
    >

    <component
      :is="'router-view'"
      :spec="view_spec"
      />

  </v-container>
</v-main>
</template>

<style lang="scss"></style>

<script>
export default {
  props: {
    /*
    spec: {
      type: Object,
      required: true,
      }
      */
  },
  
  data () {
    return {
    }
  },

  computed: {
    view_spec() {
      let viewname = this.$route.meta.view || this.$model.main.app.web.defaults.view 
      let spec = this.$model.main.app.web.view[viewname].spec
      return spec
    }
  }
};

</script>
