<template>
    <v-container fill-height>
        <v-layout column>
            <v-flex xs1 text-xs-center>
                <h1>Monte Carlo Demo</h1>
            </v-flex>
            <v-flex xs8 text-xs-center>
                <StateTreeView
                    :nodes="nodes"
                    :radius="radius"
                    :ignore_value="false"
                    @clicked-node="clicked_node"/>
            </v-flex>
            <v-flex xs2 text-xs-center>
                <v-layout wrap>
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
import { dir_to_str, OBJ_TYPE } from '../utils/constants.js'
import StateTreeView from './StateTreeView.vue'

export default {
    data: () => ({
        radius: 25,
        decay: 0.9,
        path: [{state: 0, reward: 0}],
        step_enabled: true,
        nodes: [
                {selected: true, pos:[1,0], value:0, reward: 0, type: OBJ_TYPE.NONE, action: [1, 2, 3]},
                {selected: false, pos:[0,1], value:0, reward: 0, type: OBJ_TYPE.NONE, action: [4, 5]},
                {selected: false, pos:[1,1], value:0, reward: 0, type: OBJ_TYPE.NONE, action: [5]},
                {selected: false, pos:[2,1], value:0, reward: 0, type: OBJ_TYPE.NONE, action: [4, 6]},
                {selected: false, pos:[0,2], value:0, reward: -10, type: OBJ_TYPE.ENEMY, action: []},
                {selected: false, pos:[1,2], value:0, reward: 5, type: OBJ_TYPE.GOAL, action:[]},
                {selected: false, pos:[2,2], value:0, reward: -5, type: OBJ_TYPE.ENEMY, action: []},
            ],
        curr_pos: 0

    }),
    components: {
        /* eslint-disable vue/no-unused-components */
        StateTreeView
    },
    mounted() {
        this.initialize()
    },
    watch: {
        curr_pos: function (val, oldVal) {
            this.nodes[oldVal].selected = false
            this.nodes[val].selected = true
        },
    },
    methods: {
        initialize: function() {
            this.path = [{state: 0, reward: 0}]
            this.nodes.forEach( (item) => {
                item.value = 0
            })
            this.curr_pos = 0
            this.step_enabled = true
        },
        step: function() {
            let actions = this.nodes[this.curr_pos].action
            let action = actions[Math.floor(Math.random() * actions.length)]
            
            let reward = this.nodes[action].reward
            let done = (this.nodes[action].action.length == 0)


            this.path.push( {state:  action,
                             reward: reward})
            this.curr_pos = action

            if (done) {
                this.step_enabled = false
                let value = 0.0
                this.path.reverse().forEach( (item, i) => { 
                    if ( i == 0 ) {
                        value = item.reward
                    }
                    else {
                        value = item.reward + this.decay * value
                        let prev_val = this.nodes[item.state].value
                        this.nodes[item.state].value = parseFloat((0.9 * prev_val + 0.1 * value).toFixed(2))
                        value = parseFloat(value.toFixed(2))
                    }
                })
            }
        },
        next_episode: function() {
            this.step_enabled = true
            this.reset_path()
        },
        restart: function() {
            this.initialize()
            
        },
        clicked_node: function(index) {
            console.log(index)
        },
        reset_path: function() {
            this.path = [{state: 0, reward: 0}]
            this.curr_pos = 0
        }
    }
}

</script>

<style>
</style>
