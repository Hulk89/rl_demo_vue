<template>
    <g>
        <rect :width="line_width-1"
              :height="line_width-1"
              :class="obj_class"
              />
        <text :x="3" 
              :y="15"
              v-if="!ignore_value"
              fill="black">v: {{ value }} </text>
        <text :x="3" 
              :y="line_width-5" fill="black">R: {{ reward }} </text>
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="line_width/2"
              :y2="(line_width/2) * (1-policy_dict.up)"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="line_width/2"
              :y2="(line_width/2) * (1+policy_dict.down)"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="(line_width/2) * (1-policy_dict.left)"
              :y2="line_width/2"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="(line_width/2) * (1+policy_dict.right)"
              :y2="line_width/2"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
    </g>
</template>

<script>
import { OBJ_TYPE, DIRECTION } from '../utils/constants.js'
export default {
    props: {line_width: Number, 
            obj_type: Number, 
            policy: Array, 
            reward: Number,
            value: Number,
            selected: Boolean,
            ignore_value: {type: Boolean, default: false}},
    computed: {
        obj_class: function () {
            let obj_classes = ['box']
            if (this.selected) {
                obj_classes.push('selected')
            }
            else {
                switch (this.obj_type) {
                    case OBJ_TYPE.NONE:
                        obj_classes.push("none")
                        break
                    case OBJ_TYPE.ENEMY:
                        obj_classes.push("enemy")
                        break
                    case OBJ_TYPE.GOAL:
                        obj_classes.push("goal")
                        break
                    case OBJ_TYPE.ME:
                        obj_classes.push("char")
                        break
                }
            }
            return obj_classes
        },
        policy_enable: function () {
            switch (this.obj_type) {
                case OBJ_TYPE.NONE:
                case OBJ_TYPE.ME:
                    return true
                case OBJ_TYPE.ENEMY:
                case OBJ_TYPE.GOAL:
                    return false
            }
        },
        policy_dict: function () {
            return {up:    this.policy[DIRECTION.UP], 
                    down:  this.policy[DIRECTION.DOWN], 
                    left:  this.policy[DIRECTION.LEFT], 
                    right: this.policy[DIRECTION.RIGHT]} 
        }
    }
}
</script>

<style>

.selected {
    fill: rgb(255, 255, 0);
}
.box {
    stroke-width: 3;
    stroke: rgb(0,0,0);
}
.none {
    fill: rgb(255, 255, 255);
}
.enemy {
    fill: rgb(255, 0, 0);
}
.goal {
    fill: rgb(0,255,0);
}
.char {
    fill: #ffb800;
}
</style>
