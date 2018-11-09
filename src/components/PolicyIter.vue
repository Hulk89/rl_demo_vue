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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { OBJ_TYPE } from '../utils/constants.js'
import random_util from '../utils/random.js'
import GridworldView from './GridworldView.vue'

export default {
    data: () => ({
        world :     [[{type:   OBJ_TYPE.NONE, 
                       reward: 0,
                       policy: {up: 0, down: 0, left: 0, right: 0},
                       selected: false}]],
        svg_size:   [0, 0],
        line_width: 30,
        env_size:   [4, 4]
    }),
    components: {
        /* eslint-disable vue/no-unused-components */
        GridworldView
    },
    mounted: function () {
        this.initialize_env()
    },
    computed: {
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
        initialize_env: function() {
            /* world initialization */
            let width  = this.env_size[1]
            let height = this.env_size[0]
            this.world = Array(height).fill().map(() => {
                return Array(width).fill().map( () => { 
                    return {type:    OBJ_TYPE.NONE,
                            reward:  0,
                            policy: {
                                up: 0.25,
                                down: 0.25,
                                left: 0.25,
                                right: 0.25
                            },
                            selected: false} 
                })
            })
            let rand = random_util.getLocations(2, height, width)
            let enemy = this.world[rand[0][0]][rand[0][1]]
            let goal  = this.world[rand[1][0]][rand[1][1]]
            enemy.type = OBJ_TYPE.ENEMY
            enemy.reward = -10
            goal.type = OBJ_TYPE.GOAL
            goal.reward = 5
        }
    }
}

</script>

<style>
</style>
