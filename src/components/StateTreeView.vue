<template>
    <svg :width="12 * radius" :height="12 * radius">
        <g v-for="(node, node_idx) in nodes" :key="node_idx + 100">
            <g v-for="(to_idx, idx) in node.action" :key="idx">
                <polyline :points="points(node_idx, to_idx)" class="line"/>
            </g>
        </g>
        <g v-for="(node, node_idx) in nodes" :key="node_idx">
            <g :transform="transform(node_idx)">
                <ValueStateNode :radius="radius"
                            :obj_type="node.type"
                            :ignore_value="ignore_value"
                            :reward="node.reward"
                            :value="node.value"
                            :selected="node.selected"
                            @click.native="clicked(node_idx)"/>
            </g>
        </g>
    </svg>
</template>

<script>
import ValueStateNode from './ValueStateNode'

export default {
    props: {nodes: Array, 
            radius: Number,
            ignore_value: {type: Boolean, default: false}
            },
    components: {
        /* eslint-disable vue/no-unused-components */
        ValueStateNode
    },
    methods: {
        get_pos: function (idx) {
            return [this.nodes[idx].pos[0] * this.radius * 4 + this.radius * 2,
                    this.nodes[idx].pos[1] * this.radius * 4 + this.radius * 2]
        },
        transform: function (idx) {
            let pos = this.get_pos(idx)
            return "translate(" + pos[0] + ', ' + pos[1] + ')'
        },
        points: function (from_idx, to_idx) {
            let from_pos = this.get_pos(from_idx)
            let to_pos = this.get_pos(to_idx)
            return from_pos[0] + " " + from_pos[1] + " " +
                    to_pos[0] + " " + to_pos[1]
        },
        clicked: function(idx) {
            this.$emit('clicked-node', idx)
        }
    }
}

</script>

<style>
.line {
    fill:         none;
    stroke:       black;
    stroke-width: 3;
}
</style>
