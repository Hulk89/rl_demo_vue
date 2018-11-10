<template>
    <div>
        <demo />
        <page />
    </div>
</template>

<script>
import ValueIter from '../components/ValueIter.vue'
import ValueIterPage from '../pages/ValueIterPage.vue'

export default {
    components: {
        'demo': ValueIter,
        'page': ValueIterPage
    }
}
</script>
