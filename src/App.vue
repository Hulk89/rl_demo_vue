<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hulk's</span>&nbsp;
        <span class="font-weight-light">RL Demo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <PolicyIterView/>
    </v-content>
  </v-app>
</template>

<script>
import PolicyIterView from './views/PolicyIterView.vue'

export default {
  name: 'App',
  components: {
    PolicyIterView
  },
  data () {
    return {
      //
    }
  }
}
</script>
