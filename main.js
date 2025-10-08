document.addEventListener("DOMContentLoaded", () => {
	const fetchWithHeaderBtn = document.querySelector("#fetchWithHeader");
	const fetchWithoutHeaderBtn = document.querySelector("#fetchWithoutHeader");

	const loading = document.querySelector(".loading");
	const usersContainer = document.querySelector(".users-container");
	const nothingToShow = document.querySelector(".nothing-to-show");

	fetchWithHeaderBtn.addEventListener("click", () => fetchUsers(true));
	fetchWithoutHeaderBtn.addEventListener("click", () => fetchUsers(false));

	async function fetchUsers(withHeader) {
		// Reset UI
		loading.classList.remove("hide");
		nothingToShow.classList.add("hide");
		usersContainer.textContent = "";

		console.log("Fetching users...");

		try {
			const headers = {
				"x-api-key": "reqres-free-v1",
			};

			const url = "https://reqres.in/api/users?page=1";

			const response = await fetch(url, {
				method: "GET",
				headers: withHeader ? headers : undefined,
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.status}`);
			}

			const data = await response.json();

			await wait(1000);

			const usersList = document.createElement("ul");
			usersList.classList.add("users-list");

			data.data.forEach((user) => {
				const nameEl = document.createElement("li");
				nameEl.classList.add("user-row");
				nameEl.textContent = user.first_name + " " + user.last_name;
				usersList.appendChild(nameEl);
			});

			usersContainer.appendChild(usersList);

			console.log("Done");
		} catch (error) {
			nothingToShow.classList.remove("hide");
		} finally {
			loading.classList.add("hide");
		}
	}

	function wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
});
