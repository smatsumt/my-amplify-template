<template>
    <amplify-authenticator v-bind:authConfig="authConfig">
    </amplify-authenticator>
</template>

<script>
export default {
    name: "Auth",
    data: () => {
        return {
            authConfig: {
                signUpConfig: {
                    hideAllDefaults: true,
                    signUpFields: [
                        {
                        label: 'Username',
                        key: 'username',
                        required: true,
                        displayOrder: 1,
                        type: 'string',
                        },
                        {
                        label: 'Email',
                        key: 'email',
                        required: true,
                        displayOrder: 2,
                        type: 'string',
                        },
                        {
                        label: 'Password',
                        key: 'password',
                        required: true,
                        displayOrder: 3,
                        type: 'password',
                        },
                    ]
                }
            }
        }
    }
}
</script>

<style scoped>

</style>