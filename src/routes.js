import MDPBellmanView from './views/MDPBellmanView.vue'
import PolicyIterView from './views/PolicyIterView.vue'
import ValueIterView from './views/ValueIterView.vue'
import Home from './views/Home.vue'
import PredictionControlView from './views/PredictionControlView.vue'
import PredictionView from './views/PredictionView.vue'

export const routes = [
        {
            path: '/',
            name: 'Home',
            component: Home,
            icon: 'home'
        },
        {
            path: '/mdp_bellman',
            name: 'MDP + Bellman Equation',
            component: MDPBellmanView,
            icon: 'functions'
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
        {
            path: '/prediction_control',
            name: 'Prediction & Control',
            component: PredictionControlView,
            icon: 'android'
        },
        {
            path: '/prediction',
            name: 'Prediction',
            component: PredictionView,
            icon: 'remove_red_eye'
        },
    ]
