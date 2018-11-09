<template>
    <svg width="100%" height="100%" id="svg">
        <g :transform="world_transform">
            <g v-for="(row, row_idx) in world" :transform="transform(0, row_idx)" :key="row_idx">
                <g v-for="(obj, col_idx) in row" :transform="transform(col_idx, 0)" :key="col_idx">
                    <PolicyRect :line_width="line_width"
                                :obj_type="obj.type"
                                :policy="obj.policy"
                                :reward="obj.reward"
                                :selected="obj.selected" />
                </g>
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
