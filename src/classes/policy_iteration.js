
export default class PolicyIteration {
    constructor(height, width, decay) {
        this.row = height
        this.col = width
        this.decay = decay
        this.initialize()
    }

    initialize() {
        this.decisions = this.initialize_decisions()
    }

    initialize_decisions() {
        let decisions = Array(this.row).fill().map(() => {
            return Array(this.col).fill().map( () => { 
                return { value: 0,
                         policy: { up: 0.25,
                                   down: 0.25,
                                   left: 0.25,
                                   right: 0.25 } }
            })
        })
        return decisions
    }

    calculate_new_value(row_i, col_i, env) {
        if (env.is_end_state(row_i, col_i)) {
            return 0
        }
        else{
            let curr_decision = this.decisions[row_i][col_i]
            let value = 0
            let neighbors = env.get_neighbors(row_i, col_i)
            neighbors.forEach((n) => {
                let n_state_reward = env.get_reward(n.idx[0], n.idx[1])
                let n_state_value = this.get_value(n.idx[0], n.idx[1])
                value += curr_decision.policy[n.dir] * (n_state_reward + this.decay * n_state_value)
            })
            return value.toFixed(2)
        }
    }

    update_values(env) {
        let new_values = Array(this.row).fill().map(()=>{
            return Array(this.col).fill().map(() => 0)
        })

        this.decisions.forEach( (row, row_i) => {
            row.forEach( (item, col_i) => {
                let new_val = this.calculate_new_value(row_i, col_i, env)
                new_values[row_i][col_i] = new_val
            })
        })

        /* update values */
        new_values.forEach( (row, row_i) => {
            row.forEach( (value, col_i) => {
                this.decisions[row_i][col_i].value = value
            })
        })
    }

    get_value(row_i, col_i) {
        return this.decisions[row_i][col_i].value
    }

    get_action(env) {
        let [row_i, col_i] = env.get_state()
        let policy = this.decisions[row_i][col_i].policy
        let max_policy = []
        for (var dir in policy) {
            if (policy[dir] > 0)
                max_policy.push(dir)
        }
        var action = max_policy[Math.floor(Math.random() * max_policy.length)];
        return action
    }

    improve_policy(env) {
        this.decisions.forEach( (row, row_i) => {
            row.forEach( (curr_decision, col_i) => {
                let neighbors = env.get_neighbors(row_i, col_i)

                let max_return = {val: -1000, dirs:['up']}
                neighbors.forEach((n) => {
                    let n_state_reward = env.get_reward(n.idx[0], n.idx[1])
                    let n_state_value = this.get_value(n.idx[0], n.idx[1])
                    let _return = (n_state_reward + this.decay * n_state_value)

                    if (_return > max_return.val) {
                        max_return = {val: _return, dirs: [n.dir]}
                    }
                    else if (_return == max_return.val) {
                        max_return.dirs.push(n.dir)
                    }
                })

                curr_decision.policy = {up:0, down:0, left:0, right:0}
                max_return.dirs.forEach( (dir) => {
                    curr_decision.policy[dir] = 1/max_return.dirs.length
                })
            })
        })
    }
}

