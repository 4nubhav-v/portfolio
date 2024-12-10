const API_URL = "https://4nubhav.vercel.app/api/getTrack";
// const API_URL = "http://localhost:3000/track";
async function fetchCurrentTrack() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const track = data.recenttracks.track[0];

    if (track && track["@attr"] && track["@attr"].nowplaying) {
      document.getElementById(
        "track-name"
      ).textContent = `Track Name: ${track.name}`;
      document.getElementById(
        "artist-name"
      ).textContent = `Artist: ${track.artist["#text"]}`;
      document.getElementById("album-cover").src = track.image[3]["#text"];
    } else {
      document.querySelector(".temp-main").style.display = "none";
    }
  } catch (error) {
    document.querySelector(".temp-main").style.display = "none";
    console.log(error);
  }
}

fetch(`https://4nubhav.vercel.app/api/info`)
  .then((response) => response.json()) // Parse the JSON data from the response
  .then((data) => {
    let st1 = document.getElementById("info1").innerText;
    let st2 = document.getElementById("info2").innerText;
    st1 = `${st1} ${data.email}`;
    st2 = `${st2} ${data.phoneNumber}`;
    document.getElementById("info1").innerText = st1;
    document.getElementById("info2").innerText = st2;
  })
  .catch((error) => console.error("Error fetching data:", error));

// Fetch current track information on page load
fetchCurrentTrack();

// Optionally, refresh every 30 seconds
setInterval(fetchCurrentTrack, 30000);
