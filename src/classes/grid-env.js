import { OBJ_TYPE } from '../utils/constants.js'
import random_util from '../utils/random.js'

class GridWorld {
    constructor(height, width) {
        this.row = height
        this.col = width
        this.initialize()
    }

    initialize() {
        this.world = this.initialize_world()
        this.is_done = false
    }
    initialize_world() {
        let world = Array(this.row).fill().map(() => {
            return Array(this.col).fill().map( () => { 
                return {type:    OBJ_TYPE.NONE,
                        reward:  0}
            })
        })
        let rand = random_util.getLocations(3, this.row, this.col)
        let enemy = world[rand[0][0]][rand[0][1]]
        let goal  = world[rand[1][0]][rand[1][1]]
        let me    = world[rand[2][0]][rand[2][1]]

        enemy.type   = OBJ_TYPE.ENEMY
        enemy.reward = -10
        goal.type    = OBJ_TYPE.GOAL
        goal.reward  = 5
        me.type      = OBJ_TYPE.ME
        return world
    }

    get_reward(row, col) {
        return this.world[row][col].reward
    }

    get_type(row, col) {
        return this.world[row][col].type
    }
    
    is_end_state(row, col) {
        let curr_type = this.get_type(row, col)

        switch (curr_type) {
            case OBJ_TYPE.ENEMY:
            case OBJ_TYPE.GOAL:
                return true
        }
        return false
    }

    get_neighbors(row_i, col_i) {
        let neighbors = [{dir:'left',  idx: [row_i, col_i-1]},
                         {dir:'up',    idx: [row_i-1, col_i]},
                         {dir:'right', idx:[row_i, col_i+1]},
                         {dir:'down',  idx: [row_i+1, col_i]}]
        let real_neighbors = neighbors.filter(n => {
            if (n.idx[0] < 0 || n.idx[0] >= this.row)
                return false
            if (n.idx[1] < 0 || n.idx[1] >= this.col)
                return false
            return true
        })
        return real_neighbors
    }

    get_me() {
        let idx = [-1, -1]
        this.world.forEach( (row, row_i) => {
            row.forEach( (item, col_i) => {
                if (item.type == OBJ_TYPE.ME) {
                    idx = [row_i, col_i]
                }
            })
        })
        return idx
    }

    get_next_state(row_i, col_i, action) {
        let neighbors = this.get_neighbors(row_i, col_i)
        let idx = [0, 0]
        let available_action = neighbors.some( (n) => {
            if (n.dir == action) {
                idx = n.idx
                return true
            }
            return false
        })
        if (!available_action) {
            return [row_i, col_i]
        }
        else{
            return idx
        }
    }
    set_next_state(action) {
        let curr_me = this.get_me()
        let next_state = this.get_next_state(curr_me[0], curr_me[1], action)

        this.is_done = this.is_end_state(next_state[0], next_state[1])
        this.world[curr_me[0]][curr_me[1]].type = OBJ_TYPE.NONE
        this.world[next_state[0]][next_state[1]].type = OBJ_TYPE.ME

        let reward = this.get_reward(next_state[0], next_state[1])
        return {reward: reward, done: this.is_done}
    }
}

export default {
    GridWorld
}
