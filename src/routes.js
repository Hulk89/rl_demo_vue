import PolicyIterView from './views/PolicyIterView.vue'
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
    ]
