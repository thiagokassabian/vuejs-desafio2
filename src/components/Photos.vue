<template>
	<div class="p-text-center" v-if="isLoading">
		<ProgressSpinner />
	</div>

	<div v-if="photos">
		<Galleria
			v-if="photos"
			:value="photos"
			:responsiveOptions="responsiveOptions"
			:numVisible="7"
			:circular="true"
			:showItemNavigators="true"
		>
			<template #item="{item}">
				<img :src="item.url" :alt="item.title" />
			</template>
			<template #thumbnail="{item}">
				<img :src="item.thumbnailUrl" :alt="item.title" />
			</template>
			<template #caption="{item}">
				<p class="p-my-0">{{ item.title }}</p>
			</template>
		</Galleria>
	</div>
</template>
<script>
import { onMounted, ref } from "vue";
import { getPhotos, getAlbums } from "./app-service";
import { useRoute } from "vue-router";
import Galleria from "primevue/galleria";
export default {
	name: "Photos",
	props: {
		title: String,
	},
	components: {
		Galleria,
	},
	setup(props, context) {
		const route = useRoute();

		const albumId = route.params.albumId;
		const userId = route.params.userId;

		const photos = ref(null);
		const albumTitle = ref(null);
		const isLoading = ref(false);

		const responsiveOptions = [
			{
				breakpoint: "1024px",
				numVisible: 5,
			},
			{
				breakpoint: "960px",
				numVisible: 4,
			},
			{
				breakpoint: "768px",
				numVisible: 3,
			},
			{
				breakpoint: "560px",
				numVisible: 1,
			},
		];

		onMounted(() => {
			isLoading.value = true;
			getPhotos(albumId)
				.then((response) => {
					photos.value = response;
				})
				.finally(() => {
					isLoading.value = false;
				});
			getAlbums(userId).then((albums) => {
				const found = albums.find((album) => album.id == albumId);
				albumTitle.value = found.title;

				// emitindo evento para o componente pai
				context.emit("setConfig", {
					title: `Album <span>${found.title}</span>`,
					isHome: false,
				});
			});
		});

		return { photos, responsiveOptions, isLoading, albumTitle };
	},
};
</script>
<style scoped>
.p-galleria-item > img {
	width: 100%;
	max-width: 600px;
}
.p-galleria-thumbnail-item-content > img {
	width: 100%;
	display: block;
}
</style>
