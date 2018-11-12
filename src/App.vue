<template>
    <v-app>
        <v-navigation-drawer v-model="drawer"
                             clipped
                             fixed
                             app>
            <v-toolbar flat>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                            List
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider/>

            <v-list dense class="pt-0">
                <v-list-tile
                            v-for="route in routes"
                            :key="route.name"
                            :to="route.path"
                            >
                            <v-list-tile-action>
                                <v-icon>{{ route.icon }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ route.name }}</v-list-tile-title>
                            </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <router-link to="/" tag="button">
                <v-toolbar-title class="headline text-uppercase">
                    <span>Hulk's</span>&nbsp;
                    <span class="font-weight-light">RL Demo</span>
                </v-toolbar-title>
            </router-link>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import {routes} from './routes.js'
export default {
    name: 'App',
    data: () => ({
        drawer: false,
        routes: routes
    
    }),
}
</script>
