import PolicyIterView from './views/PolicyIterView.vue'
import ValueIterView from './views/ValueIterView.vue'
import Home from './views/Home.vue'

export const routes = [
        {
            path: '/',
            name: 'Home',
            component: Home,
            icon: 'home'
        },
        {
            path: '/dp_pi',
            name: 'Policy Iteration',
            component: PolicyIterView,
            icon: 'grid_on'
        },
        {
            path: '/dp_vi',
            name: 'Value Iteration',
            component: ValueIterView,
            icon: 'grid_on'
        },
    ]
