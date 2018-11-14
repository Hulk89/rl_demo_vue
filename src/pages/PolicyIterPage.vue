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
    * Review 
        * Bellman Expectation Equation
          * $v_\pi(s) =  {\Sigma}_{a \in A} \pi(a \vert s)(R_{t+1} + \gamma v_\pi(s'))$
    * 위 수식을 dynamic programming을 통해 구해본다
        * $v_{k+1}(s) = {\Sigma}_{a \in A} \pi(a \vert s)(R_{t+1} + \gamma v_k(s'))$
* **Policy improvement**
    * Review
        * q-func: $q_\pi(s,a) = E_\pi[R_{t+1} + \gamma v_\pi(S_{t+1}) \vert S_t=s, A_t=a]$
    * $q_\pi(s,a) = R_{s}^a + \gamma v_\pi(s')$ 로 고침
    * Greedy Improvement
        * 위 식을 최대화하는 action a를 반환
    * Softmax Improvement 
        * 위 식을 softmax에 넣어서 action a의 확률을 만듬


## Value iteration과의 차이점
---
* policy와 value-function이 분리되어있음
  * 확률적 policy도 가능하다.

---

# Appendix

* Bellman optimality equation
    * $\begin{matrix} v_*(s) & = & max_a q_{\pi_*}(s, a) \\
                       & = & max_a E_{\pi_*}[G_t \vert S_t = s, A_t = a] \\
                       & = & max_a E_{\pi_*}[R_{t+1} + \gamma G_{t+1} \vert S_t = s, A_t = a] \\ 
                       & = & max_a E_{\pi_*}[R_{t+1} + \gamma v_*(S_{t+1}) \vert S_t = s, A_t = a] \\ 
                       & = & max_a \Sigma_{s', r} p(s', r \vert s, a)[r + \gamma v_*(s')]
                       \end{matrix}$
* Greedy improvement
    * 모든 정책은 기존($\pi$)과 똑같은데
    * 하나의 s에 대해서 action을 greedy하게 취하는 정책을 $\pi'$라 해보자
        * $q_\pi(s, \pi '(s)) \ge v_\pi (s)$
    * $v_{\pi'}(s) \ge v_\pi(s)$ 이며
    * 나머지 state에 대해서도 당연히 더 큰 값을 보장한다. 
        * $\pi(a \vert s) \ge 0$
        * $p(s', r \vert s, a) \ge 0$
* 모든 s에 대해서
    * $v_{\pi'} = v_\pi$라면
        * $\begin{matrix} \pi '(s) & = & argmax_a q_\pi (s, a) \\
                                & = & argmax_a \Sigma_{s', r} p(s', r \vert s, a)[r + \gamma v_\pi(s')] \\
            \end{matrix}$ 이므로
        * $v_{\pi'}(s) = max_a \Sigma_{s', r} p(s', r \vert s, a) [r + \gamma v_{\pi'}(s')]$
    * 따라서 $v_{\pi'} = v_*$
---
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
