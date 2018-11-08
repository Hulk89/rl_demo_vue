<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs2>
                <h1>Policy Iteration</h1>
            </v-flex>
            <v-flex xs8>
                <svg width="100%" height="100%" id="svg">
                    <g :transform="world_transform">
                        <g v-for="(row, row_idx) in world" :transform="transform(0, row_idx)" :key="row_idx">
                            <g v-for="(col, col_idx) in row" :transform="transform(col_idx, 0)" :key="col_idx">
                                <PolicyRect :line_width="line_width"
                                            :obj_type="world[row_idx][col_idx].type"
                                            :policy="world[row_idx][col_idx].policy" />
                            </g>
                        </g>
                    </g>
                </svg>
            </v-flex>
            <v-flex xs2>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { OBJ_TYPE } from '../constant.js'
import random_util from '../utils/random.js'
import PolicyRect from './PolicyRect'

export default {
    data: () => ({
        world :     [[{type: OBJ_TYPE.NONE, reward: 0, policy: {up: 0, down: 0, left: 0, right: 0}}]],
        svg_size:   [0, 0],
        line_width: 30,
        env_size:   [4, 4]
    }),
    components: {
        /* eslint-disable vue/no-unused-components */
        PolicyRect
    },
    mounted: function () {
        let svg = document.getElementById("svg")
        let rect = svg.getBoundingClientRect()
        this.svg_size = [rect.width, rect.height] 
        
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
                            }} 
                })
            })
            let rand = random_util.getLocations(2, height, width)
            this.world[rand[0][0]][rand[0][1]].type = OBJ_TYPE.ENEMY
            this.world[rand[1][0]][rand[1][1]].type = OBJ_TYPE.GOAL
        }
    }
}

</script>

<style>
</style>
