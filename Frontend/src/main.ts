import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from '@/routes/routes'
import Keycloak from 'keycloak-js'

import keycloakConfig from '../keycloak.json'

const initKeycloak = async () => {
    const keycloak = new Keycloak(keycloakConfig)

    try {
        console.log('Initialisation de Keycloak...')
        const authenticated = await keycloak.init({
            onLoad: 'login-required',
            enableLogging: true,
        })
        console.log(`Keycloak initialisé, authentification: ${authenticated ? 'authentifié' : 'non authentifié'}`)

        const app = createApp(App)

        const router = createRouter({
            history: createWebHistory(),
            routes
        })

        // Ajoutez une garde de navigation pour vérifier l'authentification
        router.beforeEach((to, from, next) => {
            if (to.meta.requiresAuth && !keycloak.authenticated) {
                console.log('Utilisateur non authentifié, redirection vers la page de connexion...');
                keycloak.login({ redirectUri: window.location.origin + to.fullPath });
            } else {
                next();
            }
        })

        // Ajoutez Keycloak aux propriétés globales
        app.config.globalProperties.$keycloak = keycloak

        app.use(router).mount('#app')


    } catch (error) {
        console.error('Échec de l\'initialisation de Keycloak', error);
    }
}

initKeycloak()