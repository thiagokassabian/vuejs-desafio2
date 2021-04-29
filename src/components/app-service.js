import axios from "axios";

const getUsers = async () => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/users/"
	);
	return response.data;
};

const getUser = async (userId) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${userId}`
	);
	return response.data;
};

const getAlbums = async (userId) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${userId}/albums`
	);
	return response.data;
};

const getPhotos = async (albumId) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
	);
	return response.data;
};

export { getUsers, getAlbums, getPhotos, getUser };
