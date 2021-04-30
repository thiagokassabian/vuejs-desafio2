<template>
	<div class="p-text-center" v-if="isLoading">
		<ProgressSpinner />
	</div>

	<div v-if="albums">
		<ul class="list-style">
			<li v-for="(album, index) in albums" :key="index">
				<router-link
					:to="{ name: 'photos', params: { albumId: album.id } }"
					>{{ album.title }}
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
import { getAlbums, getUser } from "./app-service";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
export default {
	name: "Albums",
	props: {
		title: String,
	},
	setup(props, context) {
		const route = useRoute();
		const userId = route.params.userId;

		const albums = ref(null);
		const userName = ref(null);
		const isLoading = ref(false);

		onMounted(() => {
			isLoading.value = true;

			getAlbums(userId)
				.then((response) => {
					albums.value = response;
				})
				.finally(() => {
					isLoading.value = false;
				});
			getUser(userId).then((response) => {
				userName.value = response.name;

				// emitindo evento para o componente pai
				context.emit("setConfig", {
					title: `User <span>${response.name}</span>`,
					isHome: false,
				});
			});
		});

		return { albums, isLoading, userName };
	},
};
</script>
<style scoped></style>
