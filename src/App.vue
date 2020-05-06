<template>
  <v-app>
    <v-toolbar max-height="56px">
      <v-spacer/>
      <router-link to="/">Home</router-link>
      <v-spacer/>
      <router-link to="/about">About</router-link>
      <v-spacer/>
      <router-link to="/profile" v-if="user">Profile</router-link>
      <v-spacer/>
      <amplify-sign-out v-if="user"></amplify-sign-out>
    </v-toolbar>
    <v-content style="padding-top: 12px">
      <router-view/>
    </v-content>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import AmplifyStore from '@/store/';

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    user() {
      return AmplifyStore.state.user
    }
  },
  methods: {
    profile: function() {
        this.$router.push('/profile')
    },
  }
}

</script>