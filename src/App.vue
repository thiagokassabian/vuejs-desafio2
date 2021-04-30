<template>
	<div class="container">
		<div class="p-d-flex p-jc-between p-ai-center p-mb-2">
			<div v-if="title" class="p-mr-2">
				<h2 v-html="title"></h2>
			</div>
			<div v-if="!isHome" class="buttons">
				<Button
					icon="pi pi-home"
					class="p-button-rounded p-button-outlined p-mr-2"
					@click="homePage"
				/>
				<Button
					icon="pi pi-arrow-left"
					class="p-button-rounded p-button-secondary p-button-outlined"
					@click="previousPage"
				/>
			</div>
		</div>
		<Card>
			<template #content>
				<router-view @setConfig="config"></router-view>
			</template>
		</Card>
	</div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Card from "primevue/card";

export default {
	name: "App",
	components: {
		Card,
	},
	setup() {
		const router = useRouter();

		const title = ref(null);
		const isHome = ref(true);

		// ouvidor de evento
		const config = (data) => {
			//console.log(data);
			title.value = data.title;
			isHome.value = data.isHome;
		};

		const previousPage = () => {
			router.go(-1);
		};
		const homePage = () => {
			router.push("/");
		};

		return { title, config, isHome, previousPage, homePage };
	},
};
</script>

<style>
body {
	background: #f5f5f5;
}
.container {
	max-width: 40rem;
	margin: auto;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 2rem;
}
h2 {
	margin: 0;
}
h2 > span {
	font-weight: 100;
	color: #777;
	text-transform: capitalize;
}
.buttons {
	flex-shrink: 0;
}
.list-style {
	margin: 0;
	list-style: none;
	padding: 0;
}
.list-style > li {
}
.list-style > li ~ li {
	border-top: 1px solid #f5f5f5;
}
.list-style a {
	display: block;
	padding: 0.5rem;
	transition: all 0.5s;
	color: #2196f3;
	text-decoration: none;
}
.list-style a:hover {
	background: #f5f5f5;
	padding-left: 1rem;
}
</style>
