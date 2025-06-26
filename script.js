// Fetch Minecraft server status
async function fetchServerStatus() {
	const serverIp = "mc.elfx.my.id";
	const statusElement = document.getElementById("server-status");
	const playersElement = document.getElementById("server-players");
	const versionElement = document.getElementById("server-version");

	try {
		// Show loading state
		statusElement.innerHTML =
			'<span class="h-3 w-3 rounded-full bg-gray-500 mr-2 animate-pulse"></span><span class="text-sm font-medium text-gray-400">Checking...</span>';

		const response = await fetch(
			`https://api.mcstatus.io/v2/status/java/${serverIp}`
		);
		const data = await response.json();

		if (data.online) {
			// Update status
			statusElement.innerHTML =
				'<span class="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></span><span class="text-sm font-medium text-green-400">Online</span>';

			// Update players
			playersElement.textContent = `${data.players.online} / ${data.players.max}`;

			// Update version
			versionElement.textContent = data.version.name_clean;
		} else {
			statusElement.innerHTML =
				'<span class="h-3 w-3 rounded-full bg-red-500 mr-2"></span><span class="text-sm font-medium text-red-400">Offline</span>';
			playersElement.textContent = "0 / 0";
			versionElement.textContent = "Server Offline";
		}
	} catch (error) {
		console.error("Error fetching server status:", error);
		statusElement.innerHTML =
			'<span class="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span><span class="text-sm font-medium text-yellow-400">Error</span>';
	}
}

// Mobile menu toggle
document
	.getElementById("mobile-menu-button")
	.addEventListener("click", function () {
		const menu = document.getElementById("mobile-menu");
		menu.classList.toggle("hidden");

		// Change icon based on menu state
		const icon = this.querySelector("i");
		if (menu.classList.contains("hidden")) {
			icon.classList.remove("fa-times");
			icon.classList.add("fa-bars");
		} else {
			icon.classList.remove("fa-bars");
			icon.classList.add("fa-times");
		}
	});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		const targetId = this.getAttribute("href");
		if (targetId === "#") return;

		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			// Close mobile menu if open
			const mobileMenu = document.getElementById("mobile-menu");
			if (!mobileMenu.classList.contains("hidden")) {
				mobileMenu.classList.add("hidden");
				const menuButton =
					document.getElementById("mobile-menu-button");
				const icon = menuButton.querySelector("i");
				icon.classList.remove("fa-times");
				icon.classList.add("fa-bars");
			}

			// Scroll to target
			window.scrollTo({
				top: targetElement.offsetTop - 80,
				behavior: "smooth"
			});
		}
	});
});

// Fetch server status when page loads
document.addEventListener("DOMContentLoaded", fetchServerStatus);

// Add shadow to navbar on scroll
window.addEventListener("scroll", function () {
	const nav = document.querySelector("nav");
	if (window.scrollY > 10) {
		nav.classList.add("shadow-xl");
	} else {
		nav.classList.remove("shadow-xl");
	}
});
