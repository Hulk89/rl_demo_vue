<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <div class="page">
                    <vue-markdown>

# Monte-carlo prediction(MC)

* DP에서는 모든 state에 대해서 동시에 update를 함
* review (B.E.E.)
  * $v_\pi(s) = E_\pi[R_{t+1} + \gamma v_\pi(s')]$
* Sampling을 통해서 $v_\pi$를 구해보자!
  * $$\begin{matrix} v_\pi(s) & = & E[ R_{t+1}+\gamma R_{t+2}+\gamma^2 R_{t+3}... \vert S_t=s] \\ & = & E[G_t \vert S_t=s] \end{matrix}$$
  * 끝까지 episode를 진행시켜서 $G_t$를 얻어냄
  * 그 $G_t$들을 평균내서 쓰겠다
  * $$v_\pi(s) = \frac{1}{N(s)} {\Sigma}_{i=1}^{N(s)} G_i(s)$$
* sample update(n개의 sample이 있을 때, n+1번째 sample이 들어옴)
  * $$\begin{matrix}V_{n+1} & = & \frac{1}{n}\Sigma_i^{n}G_i\\ & = & \frac{1}{n}(G_{n}+\Sigma_i^{n-1}G_i) \\ & = & \frac{1}{n}(G_{n} + (n-1) * \frac{1}{n-1}\Sigma_i^{n-1}G_i) \\ & = & \frac{1}{n}(G_{n} + (n-1)V_n)  \\ & = & V_n + \frac{1}{n}(G_{n}-V_{n})\end{matrix}$$
* 일반 업데이트 식
  * $V(s) \leftarrow V(s) + \alpha(G(s) - V(s))$ 
    * 위의 데모는 $\alpha$가 0.1이다.
  * $G(s)$에 다가가도록 step-size($\alpha$)만큼 update
* 장점
  * 각 state에 independent하다
    * DP에서는 인접 state에 대해서 구했는데...
    * $V(s) \leftarrow V(s) + \alpha(G(s) - V(s))$로 끝남
  * 전체 state가 아닌 특정 state에 대해서만 구해도 된다.
* 단점
  * 모든 state를 가보지 못했는데, guarantee할 수 있나?
    * 주어진 정책대로 간다면 갈 확률이 거의 없으니 괜찮음...
  * episode가 끝나야지 update를 할 수 있네????
    * episode가 끝나지 않는 문제에는 적용 못함 ㅠ
    * temporal diff로 가자! 


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
