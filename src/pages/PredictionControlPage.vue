<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <div class="page">
                    <vue-markdown>
# Prediction & Control

* RL은 **환경의 모델을 몰라도 상호작용을 통해 학습이 가능**
* DP는 환경의 모델을 알아야함

* Prediction: policy가 주어졌을 때, Value func.를 계산하는 것(evaluation)
  * 몬테카를로 예측
  * 시간차 예측
* Control: Value function을 토대로 agent의 optimal policy를 찾는 것(Improvement)
  * Sarsa (시간차 제어)
  * Q-learning (off-policy)
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
        VueMarkdown,
    },
    methods: {
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
