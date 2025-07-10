document.addEventListener("DOMContentLoaded", () => {
  fetch("config.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((config) => {
      // Social Media
      const socialLinks = document.getElementById("social-links");
      if (socialLinks) {
        socialLinks.innerHTML = ""; // Clear any existing links
        for (const [social, url] of Object.entries(config.socialMedia)) {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = url;
          link.textContent = social.charAt(0).toUpperCase() + social.slice(1);
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          listItem.appendChild(link);
          socialLinks.appendChild(listItem);
        }
      }

      // Discord
      const discordWidget = document.getElementById("discord-widget");
      if (discordWidget) {
        fetch(`https://api.lanyard.rest/v1/users/${config.discordUserId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.success && data.data) {
              const {
                discord_status,
                activities,
                listening_to_spotify,
                discord_user,
              } = data.data;
              let statusHtml = `<strong>Status:</strong> ${discord_status}<br>`;

              if (listening_to_spotify) {
                statusHtml += `<strong>Listening to:</strong> ${data.data.spotify.song} by ${data.data.spotify.artist}`;
              } else if (activities && activities.length > 0) {
                const mainActivity = activities.find((a) => a.type === 0);
                if (mainActivity) {
                  statusHtml += `<strong>Playing:</strong> ${mainActivity.name}`;
                }
              }
              discordWidget.innerHTML = statusHtml;
            } else {
              discordWidget.innerHTML = "Could not fetch Discord status.";
            }
          })
          .catch(
            () => (discordWidget.innerHTML = "Error fetching Discord status."),
          );
      }

      // Minecraft Server
      const minecraftWidget = document.getElementById("minecraft-widget");
      if (minecraftWidget) {
        fetch(`https://api.mcsrvstat.us/2/${config.minecraftServerIp}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.online) {
              minecraftWidget.innerHTML = `<strong>Status:</strong> <span style="color: #28a745;">Online</span><br><strong>Players:</strong> ${data.players.online}/${data.players.max}`;
            } else {
              minecraftWidget.innerHTML =
                '<strong>Status:</strong> <span style="color: #dc3545;">Offline</span>';
            }
          })
          .catch(
            () =>
              (minecraftWidget.innerHTML = "Error fetching Minecraft status."),
          );
      }
    })
    .catch((error) => {
      console.error("Failed to load config.json:", error);
      const container = document.querySelector(".container");
      if (container) {
        container.innerHTML = `<div style="text-align: center; color: #ffcccc;"><h2>Error</h2><p>Could not load configuration. Please check the console.</p></div>`;
      }
    });
});
