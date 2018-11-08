<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs1>
                <h1> Policy Iteration</h1>
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
        </v-layout>
    </v-container>
</template>

<script>
import { OBJ_TYPE } from '../constant.js'
import PolicyRect from './PolicyRect.vue'

export default {
    data: () => ({
        world :     [[{type: OBJ_TYPE.NONE}]],
        svg_size:   [0, 0],
        line_width: 30,
        env_size:   [4, 4]
    }),
    components: {
        PolicyRect
    },
    mounted: function () {
        let svg = document.getElementById("svg")
        let rect = svg.getBoundingClientRect()
        this.svg_size = [rect.width, rect.height] 
        
        this.world = Array(this.env_size[0]).fill().map(() => {
            return Array(this.env_size[1]).fill().map( () => { 
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
    }
}

</script>

<style>
</style>