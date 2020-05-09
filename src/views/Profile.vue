<template>
    <div class="container">
        <v-avatar color="indigo" size="36">
          <span class="white--text headline">{{user.username[0]}}{{user.username.slice(-1)[0]}}</span>
        </v-avatar>
        <h1 v-if="user">{{user.username}}</h1>
    </div>
</template>

<script>
import AmplifyStore from '@/store/';

export default {
    name: "Pofile",

    computed: {
        user: function () {
            return AmplifyStore.state.user
        },
    }
}
</script>

<style scoped>

</style>