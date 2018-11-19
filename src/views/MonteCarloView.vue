<template>
    <div>
        <demo />
        <page />
    </div>
</template>

<script>
import MonteCarlo from '../components/MonteCarlo.vue'
import PolicyIterPage from '../pages/PolicyIterPage.vue'

export default {
    components: {
        'demo': MonteCarlo,
        'page': PolicyIterPage
    }
}
</script>
