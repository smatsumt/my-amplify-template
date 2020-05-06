<template>
    <div class="container">
        <h1 v-if="user">user: {{user.username}}</h1>
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