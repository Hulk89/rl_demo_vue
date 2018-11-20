<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <div class="page">
                    <vue-markdown>

# Temporal difference(TD)
* Monte-carlo의 수식을 다시 살펴보자
  * $V(S_t) \leftarrow V(S_t) + \alpha(G_t - V(S_t))$ 
  * $G_t$는 episode가 끝나야 알 수 있다.
* $G_t = R_{t+1} + \gamma v_\pi(s')$
* episode의 중간 상태에서(s) 액션(a)를 취하면 다음 상태(s')과 보상 $R_{t+1}$을 알 수 있다.
* 현재의 보상 $R_{t+1}$에 예측한 value func. $V(s')$을 $G_t$대신 쓰는 것이 Temporal difference!!


# 비교
* MC : high variance, zero bias
* TD : low variance, some bias
  * 하지만 MC보다 효율적이고, 더 빨리 수렴한다.
  * 초기값에 sensitive(bootstrap)

                    </vue-markdown>
                    <v-img :src="require('../assets/images/dp_mc_td.png')"/>
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
