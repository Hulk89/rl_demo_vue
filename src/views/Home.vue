<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs1 text-xs-center>
                <h1>Home</h1>
            </v-flex>
            <v-flex xs8>
                <HomePage/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import HomePage from '../pages/HomePage.vue'
export default {
    components: {
        HomePage
    }
}
</script>
