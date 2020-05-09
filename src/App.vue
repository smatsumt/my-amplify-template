<template>
  <v-app>
    <v-toolbar max-height="56px">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>my-amplify-template</v-toolbar-title>
      <v-spacer/>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/profile" v-if="user">Profile</v-btn>
      <v-btn text @click="signOut()" v-if="user">Sign Out</v-btn>
    </v-toolbar>
    <v-content style="padding: 12px">
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
import {Auth} from 'aws-amplify';
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
    signOut: async function(){
      try {
        // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#sign-out
        await Auth.signOut();
        this.$router.push({path: '/logout'})
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
  }
}

</script>