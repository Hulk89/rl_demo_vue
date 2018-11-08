<template>
    <g>
        <rect :width="line_width-1"
              :height="line_width-1"
              :class="obj_class"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="line_width/2"
              :y2="(line_width/2) * (1-policy.up)"
              stroke="black"
              stroke-width="2"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="line_width/2"
              :y2="(line_width/2) * (1+policy.down)"
              stroke="black"
              stroke-width="2"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="(line_width/2) * (1-policy.left)"
              :y2="line_width/2"
              stroke="black"
              stroke-width="2"
              />
        <line :x1="line_width/2"
              :y1="line_width/2"
              :x2="(line_width/2) * (1+policy.right)"
              :y2="line_width/2"
              stroke="black"
              stroke-width="2"
              />
    </g>
</template>

<script>
import { OBJ_TYPE } from '../constant.js'

export default {
    props: ['line_width', 'obj_type', 'policy'],
    computed: {
        obj_class() {
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
