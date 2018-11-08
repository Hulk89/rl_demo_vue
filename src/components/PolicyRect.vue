<template>
    <g>
        <rect :width="line_width-1"
              :height="line_width-1"
              :class="obj_class"
              />
        <text :x="3" 
              :y="line_width-3" fill="black">{{ reward }} </text>
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="line_width/2"
              :y2="(line_width/2) * (1-policy.up)"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="line_width/2"
              :y2="(line_width/2) * (1+policy.down)"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="(line_width/2) * (1-policy.left)"
              :y2="line_width/2"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="(line_width/2) * (1+policy.right)"
              :y2="line_width/2"
              stroke="black"
              stroke-width="2"
              v-if="policy_enable"
              />
    </g>
</template>

<script>
import { OBJ_TYPE } from '../utils/constants.js'

export default {
    props: ['line_width', 'obj_type', 'policy', 'reward'],
    computed: {
        obj_class: function () {
            let obj_classes = ['box']
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
        }
    }
}
</script>

<style>

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
