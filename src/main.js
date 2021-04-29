import { createApp } from "vue";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";

import Users from "./components/Users";
import Albums from "./components/Albums";
import Photos from "./components/Photos";

import PrimeVue from "primevue/config";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

//import mitt from "mitt";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/users", component: Users },
		{ path: "/users/:userId/albums", name: "albums", component: Albums },
		{
			path: "/users/:userId/albums/:albumId",
			name: "photos",
			component: Photos,
		},
		{ path: "/", redirect: "/users" },
	],
});

//const emitter = mitt();

const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component("ProgressSpinner", ProgressSpinner);
app.component("Button", Button);

//app.provide("emitter", emitter);

app.mount("#app");
