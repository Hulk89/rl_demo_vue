<template>
    <div>
        <demo />
        <page />
    </div>
</template>

<script>
import MonteCarlo from '../components/MonteCarlo.vue'
import MonteCarloPage from '../pages/MonteCarloPage.vue'

export default {
    components: {
        'demo': MonteCarlo,
        'page': MonteCarloPage
    }
}
</script>
