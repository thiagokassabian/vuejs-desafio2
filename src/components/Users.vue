<template>
	<div class="p-text-center" v-if="isLoading">
		<ProgressSpinner />
	</div>

	<div v-if="users">
		<ul class="list-style">
			<li v-for="(user, index) in users" :key="index">
				<router-link
					:to="{ name: 'albums', params: { userId: user.id } }"
					>{{ user.name }}</router-link
				>
			</li>
		</ul>
	</div>
</template>
<script>
import { onMounted, ref } from "vue";
import { getUsers } from "./app-service";
export default {
	name: "Users",
	setup(props, context) {
		const users = ref(null);
		const isLoading = ref(false);
		onMounted(() => {
			isLoading.value = true;
			getUsers()
				.then((reponse) => {
					users.value = reponse;
				})
				.finally(() => {
					isLoading.value = false;
				});

			// emitindo evento para o componente pai
			context.emit("setConfig", {
				title: "Users <span>List</span>",
				isHome: true,
			});
		});

		return { users, isLoading };
	},
};
</script>
<style scoped></style>
