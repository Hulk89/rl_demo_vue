<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <div class="page">
                    <vue-markdown>
# Policy Iteration
## 구성 요소
---
* **Policy 초기화**
* **Policy evaluation**
    * review 
        * Bellman Expectation Equation
          * $v_\pi(s) =  {\Sigma}_{a \in A} \pi(a \vert s)(R_{t+1} + \gamma v_\pi(s'))$
    * 위 수식을 dynamic programming을 통해 구해본다
        * $v_{k+1}(s) = {\Sigma}_{a \in A} \pi(a \vert s)(R_{t+1} + \gamma v_k(s'))$
* **Policy improvement**
    * 여러가지 가능하나 Greedy Improvement를 소개한다.
    * review
        * q-func: $q_\pi(s,a) = E_\pi[R_{t+1} + \gamma v_\pi(S_{t+1}) \vert S_t=s, A_t=a]$
    * $q_\pi(s,a) = R_{s}^a + \gamma v_\pi(s')$ 로 고침
    * 위 식을 최대화하는 action a를 반환하는 정책


## Value iteration과의 차이점
---
* policy와 value-function이 분리되어있음
  * 확률적 policy도 가능하다.
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
