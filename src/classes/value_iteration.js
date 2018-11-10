import PolicyIteration from './policy_iteration.js'

export default class ValueIteration extends PolicyIteration {
    constructor(height, width, decay) {
        super(height, width, decay)
    }

    calculate_new_value(row_i, col_i, env) {
        if (env.is_end_state(row_i, col_i)) {
            return 0
        }
        else{
            let neighbors = env.get_neighbors(row_i, col_i)
            let values = []
            neighbors.forEach((n) => {
                let value = 0
                let n_state_reward = env.get_reward(n.idx[0], n.idx[1])
                let n_state_value = this.get_value(n.idx[0], n.idx[1])
                value = n_state_reward + this.decay * n_state_value  /* policy의 확률을 곱해주지 않는다. max만 취할 것이기 때문에... */
                values.push(value)
            })
            return Math.max(...values).toFixed(2)
        }
    }

    update_values(env) {
        super.update_values(env)
        this.improve_policy(env)
    }
}
