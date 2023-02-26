<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>

export default {
    name: 'App-Header',
    props: {
        title: String,
    },
}
</script>

<style scoped>
header {
    background-color: gray;
    color: white;
    padding: 10px;
    border-top: 1px solid gray;
    border-right: 1px solid gray;
}
</style>