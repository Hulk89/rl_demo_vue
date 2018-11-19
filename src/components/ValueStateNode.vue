<template>
    <g>
        <circle :class="obj_class" :r="radius"/>
        <text :x="- radius + 8" 
              :y="- radius + 15"
              v-if="!ignore_value"
              fill="black">v: {{ value }} </text>
        <text :x="-radius + 8" 
              :y="radius - 5" fill="black">R: {{ reward }} </text>
    </g>
</template>

<script>
import { OBJ_TYPE } from '../utils/constants.js'
export default {
    props: {radius: Number, 
            obj_type: Number, 
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
