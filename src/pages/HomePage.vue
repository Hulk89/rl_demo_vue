<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <div class="page">
                    <vue-markdown>                    
여기서는 기본적인 강화학습에 대해 데모와 설명을 다룹니다.

## 진도

- [x] Policy iteration
- [x] Value iteration
- [x] Monte-carlo prediction
- [x] Temporal difference
- [ ] Sarsa
- [ ] Q-learning
- [ ] 추후 공개..
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
