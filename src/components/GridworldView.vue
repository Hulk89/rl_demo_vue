<template>
    <svg :width="world.length * line_width" :height="world[0].length * line_width" id="svg">
        <g v-for="(row, row_idx) in world" :transform="transform(0, row_idx)" :key="row_idx">
            <g v-for="(obj, col_idx) in row" :transform="transform(col_idx, 0)" :key="col_idx">
                <PolicyRect :line_width="line_width"
                            :obj_type="obj.type"
                            :policy="obj.policy"
                            :reward="obj.reward"
                            :value="obj.value"
                            :selected="obj.selected"
                            @click.native="clicked(row_idx, col_idx)"/>
            </g>
        </g>
    </svg>
</template>

<script>
import PolicyRect from './PolicyRect'

export default {
    data: () => ({
        svg_size:   [0, 0],
    }),
    props: ['world', 'line_width', 'env_size'],
    components: {
        /* eslint-disable vue/no-unused-components */
        PolicyRect
    },
    mounted: function () {
        let svg = document.getElementById("svg")
        let rect = svg.getBoundingClientRect()
        this.svg_size = [rect.width, rect.height] 
    },
    methods: {
        transform: function (row_idx, col_idx) {
            return "translate(" + this.line_width * row_idx + ', '
                + this.line_width * col_idx + ")"
        },
        clicked: function(row_idx, col_idx) {
            this.$emit('calculate-value', {row: row_idx, col: col_idx})
        }
    }
}

</script>

<style>
</style>
