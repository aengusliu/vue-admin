<template>
    <div id="login">
        {{msg}}
    </div>
</template>

<script>
export default {
    name: "Login",
    components: {},
    data() {
        return {
            msg: 'qaq'
        }
    }
}
</script>

<style lang="scss" scoped>
#login {
    height: 100vh;
    background-color: blueviolet;
}
</style>