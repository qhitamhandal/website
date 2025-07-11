document.addEventListener("DOMContentLoaded", () => {
  fetch("/config.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((config) => {
      // Social Media (only on index.html)
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

      // Discord (only on index.html)
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

      // Minecraft Server (only on index.html)
      const minecraftWidget = document.getElementById("minecraft-widget");
      if (minecraftWidget) {
        fetch(`https://api.mcsrvstat.us/2/${config.minecraftServerIp}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.online) {
              minecraftWidget.innerHTML = `<strong>Status:</strong> <span class="status-online">Online</span><br><strong>Players:</strong> ${data.players.online}/${data.players.max}`;
            } else {
              minecraftWidget.innerHTML =
                '<strong>Status:</strong> <span class="status-offline">Offline</span>';
            }
          })
          .catch(
            () =>
              (minecraftWidget.innerHTML = "Error fetching Minecraft status."),
          );
      }

      // Cila SMP Server (only on cila-smp.html)
      const cilaSmpWidget = document.getElementById("cila-smp-widget");
      if (cilaSmpWidget) {
        fetch(`https://api.mcsrvstat.us/2/${config.minecraftServerIp}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.online) {
              let serverHtml = "";
              if (data.icon) {
                serverHtml += `<img src="${data.icon}" alt="Server Icon" class="server-icon">`;
              }
              serverHtml += `<strong>Status:</strong> <span class="status-online">Online</span><br>`;
              serverHtml += `<strong>Players:</strong> ${data.players.online}/${data.players.max}<br>`;
              if (data.motd && data.motd.html) {
                serverHtml += `<strong>MOTD:</strong><div class="motd">${data.motd.html.join("<br>")}</div>`;
              }
              serverHtml += `<a href="https://chat.whatsapp.com/GmtRDT4w0TH3DbnaBItxzX" target="_blank" rel="noopener noreferrer" class="community-link">Join Community</a>`;
              cilaSmpWidget.innerHTML = serverHtml;
            } else {
              cilaSmpWidget.innerHTML =
                '<strong>Status:</strong> <span class="status-offline">Offline</span>';
            }
          })
          .catch(
            () => (cilaSmpWidget.innerHTML = "Error fetching server status."),
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
