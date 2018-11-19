<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs1 text-xs-center>
                <h1>Monte Carlo Demo</h1>
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
                        <v-layout wrap>
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
                    <v-flex xs4>
                        <v-btn @click="step"
                            :disabled="!step_enabled">step</v-btn>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn @click="next_episode" :disabled="step_enabled">next_episode</v-btn>
                    </v-flex>
                    <v-flex xs4>
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
        params: {row:3, col:3, num_enemy: 1},
        env: new GridWorld(3, 3),
        rows: [3,4],
        cols: [3,4],
        agent: new PolicyIteration(3, 3, 0.9, true),
        decay: 0.9,
        step_enabled: true,
        selected: make_selected(3, 3),
        path: []
    }),
    components: {
        /* eslint-disable vue/no-unused-components */
        GridworldView
    },
    watch: {
        decay: function () {
            this.agent.decay = this.decay
        },
        params: {  
            handler: function () {
                this.restart()
            },
            deep: true
        }
    },
    mounted() {
        this.reset_path()
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
                    return {value:    decision.value,
                            policy:   decision.policy,
                            reward:   env.reward,
                            type:     env.type,
                            selected: false}
                })
            })
        },
        world_transform: function() {
            let start_row = this.svg_size[0]/2 - this.world.length/2 * this.line_width
            let start_col = this.svg_size[1]/2 - this.world[0].length/2 * this.line_width
            return "translate(" + start_row + ', ' + start_col + ")" 
        }
    },
    methods: {
        transform: function (row_idx, col_idx) {
            return "translate(" + this.line_width * row_idx + ', '
                + this.line_width * col_idx + ")"
        },
        step: function() {
            let action = this.agent.get_action(this.env)
            let result = this.env.set_next_state(action)
            
            console.log(result)

            this.path.push( {state:  this.env.get_state(), 
                             reward: result.reward})
            if (result.done) {
                /* TODO: value 계산 */
                this.step_enabled = false
                let value = 0.0
                this.path.reverse().forEach( (item, i) => { 
                    if ( i == 0 ) {
                    }
                    else {
                        let row = item.state[0]
                        let col = item.state[1]
                        this.agent.decisions[row][col].value = item.reward + this.decay * value
                        value = item.reward + this.decay * value
                        console.log(value)
                    }
                })
                /* selected 보여주기*/
            }
        },
        next_episode: function() {
            this.env.revert_env_info()
            this.step_enabled = true
            this.reset_path()
            this.selected = make_selected(this.params.row, this.params.col)
        },
        restart: function() {
            this.env.initialize(this.params)
            this.agent.initialize(this.params)
            
        },
        calculate_value: function(index) {
            console.log("nothing to do")
        },
        reset_path: function() {
            this.path.splice(this.path.length, 0, {state: this.env.get_state(), reward: 0})
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
