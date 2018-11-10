<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <div class="page">
                    <vue-markdown>
## test                    

* $x_{1}=\frac{1}{2}$
* test
                    </vue-markdown>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'  
export default {
    data: () => ({
    }),
    components: {
        VueMarkdown
    }
}
</script>

<style>
.page {
    min-height: 250px;
    min-width: 80px;
    margin: 10px;
}
</style>
