<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs1 text-xs-center>
                <h1>Home</h1>
            </v-flex>
            <v-flex xs8 text-xs-center>
            </v-flex>
            <v-flex xs2 text-xs-center>
                <BasePage/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BasePage from '../pages/BasePage.vue'
export default {
    components: {
        BasePage
    }
}
</script>
