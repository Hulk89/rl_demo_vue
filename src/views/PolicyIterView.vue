<template>
    <div>
        <demo />
        <page />
    </div>
</template>

<script>
import PolicyIter from '../components/PolicyIter.vue'
import PolicyIterPage from '../pages/PolicyIterPage.vue'

export default {
    components: {
        'demo': PolicyIter,
        'page': PolicyIterPage
    }
}
</script>
