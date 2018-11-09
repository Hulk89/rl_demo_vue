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
                    <v-btn @click="evaluate_step">next eval</v-btn>
                    <v-btn @click="improvement_step">next improve</v-btn>
                    <v-btn @click="start">start policy</v-btn>
                </v-layout>
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
        /* TODO: split environment and policy.. (in world, value and policy should be removed) */
        world :     [[{type:     OBJ_TYPE.NONE, 
                       reward:   0,
                       value:    0,
                       policy:   {up: 0, down: 0, left: 0, right: 0},
                       selected: false}]],
        svg_size:   [0, 0],
        line_width: 50,
        env_size:   [4, 4],
        decay:      0.9
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
                            value: 0,
                            policy: {
                                up: 0.25,
                                down: 0.25,
                                left: 0.25,
                                right: 0.25
                            },
                            selected: false} 
                })
            })
            let rand = random_util.getLocations(3, height, width)
            let enemy = this.world[rand[0][0]][rand[0][1]]
            let goal  = this.world[rand[1][0]][rand[1][1]]
            let me    = this.world[rand[2][0]][rand[2][1]]

            enemy.type = OBJ_TYPE.ENEMY
            enemy.reward = -10
            goal.type = OBJ_TYPE.GOAL
            goal.reward = 5
            me.type=OBJ_TYPE.ME
        },
        evaluate_step: function() {
            let new_values = Array(this.env_size[0]).fill().map(()=>{
                return Array(this.env_size[1]).fill().map(() => 0)
            })
            
            this.world.forEach( (row, row_i) => {
                row.forEach( (item, col_i) => {
                    let new_val = this.get_new_value(row_i, col_i)
                    new_values[row_i][col_i] = new_val
                })
            })

            /* update values */
            new_values.forEach( (row, row_i) => {
                row.forEach( (value, col_i) => {
                    this.world[row_i][col_i].value = value
                })
            })
        },
        improvement_step: function() {
            this.world.forEach( (row, row_i) => {
                row.forEach( (item, col_i) => {
                    let curr_grid = this.world[row_i][col_i]
                    let neighbors = this.get_neighbors(row_i, col_i)

                    let max_return = {val: -1000, dirs:['up']}
                    neighbors.forEach((n) => {
                        let next_state = this.world[n.idx[0]][n.idx[1]]
                        let _return = (next_state.reward + this.decay * next_state.value)
                        if (_return > max_return.val) {
                            max_return = {val: _return, dirs: [n.dir]}
                        }
                        else if (_return == max_return.val) {
                            max_return.dirs.push(n.dir)
                        }
                    })

                    curr_grid.policy = {up:0, down:0, left:0, right:0}
                    max_return.dirs.forEach( (dir) => {
                        curr_grid.policy[dir] = 1/max_return.dirs.length
                    })
                })
            })
        },
        start: function() {

        },
        get_new_value: function(row_i, col_i) {
            let curr_grid = this.world[row_i][col_i]

            switch (curr_grid.type) {
                case OBJ_TYPE.ENEMY:
                case OBJ_TYPE.GOAL:
                    return 0
            }

            let value = 0
            let neighbors = this.get_neighbors(row_i, col_i)
            neighbors.forEach((n) => {
                let next_state = this.world[n.idx[0]][n.idx[1]]
                value += curr_grid.policy[n.dir] * (next_state.reward + this.decay * next_state.value)
            })
            return value.toFixed(2)
        },
        get_neighbors: function(row_i, col_i) {
            let neighbors = [{dir:'left',  idx: [row_i, col_i-1]},
                             {dir:'up',    idx: [row_i-1, col_i]},
                             {dir:'right', idx:[row_i, col_i+1]},
                             {dir:'down',  idx: [row_i+1, col_i]}]

            let real_neighbors = neighbors.filter(n => {
                if (n.idx[0] < 0 || n.idx[0] >= this.env_size[0])
                    return false
                if (n.idx[1] < 0 || n.idx[1] >= this.env_size[1])
                    return false
                return true
            })
            return real_neighbors
        }
    }
}

</script>

<style>
</style>
