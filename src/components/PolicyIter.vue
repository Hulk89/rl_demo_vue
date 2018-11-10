<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs1 text-xs-center>
                <h1>Policy Iteration</h1>
            </v-flex>
            <v-flex xs8 text-xs-center>
                <GridworldView 
                    :world="world"
                    :line_width="line_width"
                    @calculate-value="calculate_value"
                    />
            </v-flex>
            <v-flex xs2 text-xs-center>
                <v-layout wrap>
                    <v-flex xs12>
                        <h3 v-if="selected_idx.row != -1">
                            new v({{selected_idx.row}}, {{selected_idx.col}}) = {{value.eq}} = {{value.total}}
                        </h3>
                        <h3 v-else>
                            grid를 클릭하면 다음 value function 수식이 나옵니다.
                        </h3>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout>
                            <v-flex xs3>
                                <v-text-field label="decay" v-model.number="decay"/>
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="row" :items="rows" v-model.number="params.row"/>
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="col" :items="cols" v-model.number="params.col"/>
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="num_obstacle" :items="enemies"
                                    v-model.number="params.num_enemy"/>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn @click="evaluate_step"
                            :disabled="!step_enabled">next eval</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn @click="improvement_step"
                            :disabled="!step_enabled">next improve</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn @click="step"
                            :disabled="!step_enabled">step</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn @click="restart">restart</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import GridworldView from './GridworldView.vue'
import { dir_to_str } from '../utils/constants.js'
import GridWorld from '../classes/grid-env.js' 
import PolicyIteration from '../classes/policy_iteration.js'

export default {
    data: () => ({
        svg_size:   [0, 0],
        line_width: 50,
        params: {row:4, col:4, num_enemy: 1},
        env: new GridWorld(4, 4),
        rows: [3,4,5,6,7],
        cols: [3,4,5,6,7],
        agent: new PolicyIteration(4, 4, 0.9),
        selected:  make_selected(4, 4),
        decay: 0.9,
        step_enabled: true,
        selected_idx: {row: -1, col: -1}
    }),
    components: {
        /* eslint-disable vue/no-unused-components */
        GridworldView
    },
    watch: {
        selected_idx: function () {
            this.selected = make_selected(this.params.row, this.params.col)
            let row_i = this.selected_idx.row
            let col_i = this.selected_idx.col
            if (row_i != -1)
                this.selected[row_i].splice(col_i, 1, true)
        },
        decay: function () {
            this.agent.decay = this.decay
        },
        params: {  
            handler: function () {
                this.env.initialize(this.params)
                this.agent.initialize(this.params)
                this.selected = make_selected(this.params.row, this.params.col)
                this.restart()
            },
            deep: true
        }
    },
    computed: {
        enemies: function() {
            return Array(Math.min(this.params.row, this.params.col)-1).fill().map((_, i) => i+1)
        },
        world: function() {
            return Array(this.params.row).fill().map( (row, row_i) => {
                return Array(this.params.col).fill().map( (item, col_i) => {
                    let decision = this.agent.decisions[row_i][col_i]
                    let env = this.env.world[row_i][col_i]
                    let selected = this.selected[row_i][col_i]
                    return {value:    decision.value,
                            policy:   decision.policy,
                            reward:   env.reward,
                            type:     env.type,
                            selected: selected}
                })
            })
        },
        world_transform: function() {
            let start_row = this.svg_size[0]/2 - this.world.length/2 * this.line_width
            let start_col = this.svg_size[1]/2 - this.world[0].length/2 * this.line_width
            return "translate(" + start_row + ', ' + start_col + ")" 
        },
        neighbors: function() {
            let row_i = this.selected_idx.row
            let col_i = this.selected_idx.col
            return this.env.get_neighbors(row_i, col_i)
        },
        value: function() {
            /* value 계산 식과 실제 value function 값을 return*/
            let values = []
            let sum = 0
            let row_i = this.selected_idx.row
            let col_i = this.selected_idx.col
            this.neighbors.forEach( (n) => {
                let reward = this.env.get_reward(n.idx[0], n.idx[1])
                let val = this.agent.get_value(n.idx[0], n.idx[1])
                let prob = this.agent.decisions[row_i][col_i].policy[n.dir]
                values.push("{"+ dir_to_str(n.dir) + "}" + prob.toFixed(2) + '*' + '(' + reward.toFixed(2) 
                                             + ' + ' + this.decay + ' * ' + parseFloat(val).toFixed(2) + ')')

                sum += prob * (reward + this.decay * val)
            })
            return {eq: values.join(' + '), total: sum.toFixed(2)}
        }
    },
    methods: {
        transform: function (row_idx, col_idx) {
            return "translate(" + this.line_width * row_idx + ', '
                + this.line_width * col_idx + ")"
        },
        evaluate_step: function() {
            this.agent.update_values(this.env)
        },
        improvement_step: function() {
            this.agent.improve_policy(this.env)
        },
        step: function() {
            let action = this.agent.get_action(this.env)
            let result = this.env.set_next_state(action)

            this.selected_idx = {row:-1, col: -1}

            if (result.done) {
                this.step_enabled=false
            }                
        },
        restart: function() {
            this.env.initialize(this.params)
            this.agent.initialize(this.params)
            this.step_enabled=true
        },
        calculate_value: function(index) {
            if (!this.env.is_end_state(index.row, index.col))
                this.selected_idx = index
        },
        reset_selected() {
            this.selected.forEach( (row) => {
                row.forEach( (item, i) => {
                    row.splice(i, 1, false)
                })
            })
        }
    }
}

function make_selected(row, col) {
    return Array(row).fill().map( () => {
            return Array(col).fill().map( () => {
                return false
            })
        })
}

</script>

<style>
</style>
