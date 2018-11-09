<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs2>
                <h1>Policy Iteration</h1>
            </v-flex>
            <v-flex xs8>
                <GridworldView 
                    :world="world"
                    :line_width="line_width"
                    :env_size="env_size"
                    />
            </v-flex>
            <v-flex xs2>
                <v-layout>
                    <v-btn @click="evaluate_step"
                           :disabled="!step_enabled">next eval</v-btn>
                    <v-btn @click="improvement_step"
                           :disabled="!step_enabled">next improve</v-btn>
                    <v-btn @click="step"
                           :disabled="!step_enabled">step</v-btn>
                    <v-btn @click="restart">restart</v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { OBJ_TYPE } from '../utils/constants.js'
import GridworldView from './GridworldView.vue'

import env from '../classes/grid-env.js' 
import agent from '../classes/policy_iteration.js'

export default {
    data: () => ({
        svg_size:   [0, 0],
        line_width: 50,
        env_size:   [4, 4],
        env: new env.GridWorld(4, 4),
        agent: new agent.PolicyIteration(4, 4),
        selected:  Array(4).fill().map( () => {
            return Array(4).fill().map( () => {
                return {value: false}
            })
        }),
        step_enabled: true
    }),
    components: {
        /* eslint-disable vue/no-unused-components */
        GridworldView
    },
    mounted: function () {
        //this.env = new env.GridWorld(this.env_size[0], this.env_size[1])
        //this.agent = new agent.PolicyIteration(this.env_size[0], this.env_size[1])
        /*
        this.selected = Array(this.env_size[0]).fill().map( (row,row_i) => {
            return Array(this.env_size[1]).fill().map( (item, col_i) => {
                return {selected: false}
            })
        })
        */
    },
    computed: {
        world: function() {
            return Array(this.env_size[0]).fill().map( (row, row_i) => {
                return Array(this.env_size[1]).fill().map( (item, col_i) => {
                    let decision = this.agent.decisions[row_i][col_i]
                    let env = this.env.world[row_i][col_i]
                    let selected = this.selected[row_i][col_i]
                    return {value:    decision.value,
                            policy:   decision.policy,
                            reward:   env.reward,
                            type:     env.type,
                            selected: selected.value}
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
        evaluate_step: function() {
            this.agent.update_values(this.env)
        },
        improvement_step: function() {
            this.agent.improve_policy(this.env)
        },
        step: function() {
            let done = false
            let action = this.agent.get_action(this.env)
            let result = this.env.set_next_state(action)
            if (result.done) {
                this.step_enabled=false
            }
                
        },
        restart: function() {
            this.env.reinitialize()
            this.agent.reinitialize()
            this.step_enabled=true
        }
        
    }
}

</script>

<style>
</style>
