<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs1 text-xs-center>
                <h1>MDP와 Bellman Equation</h1>
            </v-flex>
            <v-flex xs8>
                <MDPBellmanPage/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import MDPBellmanPage from '../pages/MDPBellmanPage.vue'
export default {
    components: {
        MDPBellmanPage
    }
}
</script>
