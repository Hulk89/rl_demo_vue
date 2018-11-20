<template>
    <div>
        <v-container>
            <v-layout wrap>
                <v-flex xs12 md6>
                    <mcdemo />
                </v-flex>
                <v-flex xs12 md6>
                    <tddemo />
                </v-flex>
            </v-layout>
        </v-container>
        <mcpage />
        <tdpage />
    </div>
</template>

<script>
import MonteCarlo from '../components/MonteCarlo.vue'
import TemporalDifference from '../components/TemporalDifference.vue'
import MonteCarloPage from '../pages/MonteCarloPage.vue'
import TemporalDifferencePage from '../pages/TemporalDifferencePage.vue'

export default {
    components: {
        'mcdemo': MonteCarlo,
        'tddemo': TemporalDifference,
        'mcpage': MonteCarloPage,
        'tdpage': TemporalDifferencePage 
    }
}
</script>
