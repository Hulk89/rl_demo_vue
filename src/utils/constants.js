
export const OBJ_TYPE = Object.freeze({
    NONE:  0,
    ENEMY: 1,
    GOAL:  2,
    ME:    3,
})


export const DIRECTION = Object.freeze({
    UP:    0,
    DOWN:  1,
    LEFT:  2,
    RIGHT: 3,
})

export function dir_to_str(dir) {
    switch (dir) {
        case DIRECTION.UP:
            return 'up'
        case DIRECTION.DOWN:
            return 'down'
        case DIRECTION.LEFT:
            return 'left'
        case DIRECTION.RIGHT:
            return 'right'
    }
}
