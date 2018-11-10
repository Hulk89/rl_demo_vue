<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <div class="page">
                    <vue-markdown>
## 요약

---

* value function에 대해서 최적의 value function만 뽑는 정책을 가정함
* 이러면 value function에 policy가 내재됨
* v(s)만 잘 업데이트하면 되겠다!
* Review
  * Bellman Optimality Equation
    * $v^*(s) = {max}_a E[R_{t+1}+\gamma v^*(S_{t+1}) \vert S_t=s, A_t=a]$
* 요걸 똑같이 update하는 식으로 만들면
  * $v_{k+1}(s) = {max}_{a \in A} (R_s^a+\gamma v_k(s'))$
* Policy iteration의 update 수식
  * $v_{k+1}(s) = {\Sigma}_{a \in A} \pi(a \vert s)(R_{t+1} + \gamma v_k(s'))$

## Policy iteration과의 비교

---

|Policy iteration | Value iteration |
|:--|:--|
|evaluation 여러번 가능|한번마다 improvement가 자동으로 됨|
|value를 update할 때 policy에 대한 확률이 들어간다.|value function이 max가 되는 녀석만 골라 update|

## Dynamic Programming의 한계

---

* 계산 복잡도 및 curse of Dim.
* 환경에 대한 완벽한 정보가 필요!!
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
