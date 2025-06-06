//your JS code here. If required.
// const output = document.getElementById("output");
// const btn = document.getElementById("download-images-button");

// const images = [
//   { url: "https://picsum.photos/id/237/200/300" },
//   { url: "https://picsum.photos/id/238/200/300" },
//   { url: "https://picsum.photos/id/239/200/300" },
// ];


const output = document.getElementById("output");

// Create button and loading, error elements dynamically
const btn = document.createElement("button");
btn.id = "download-images-button";
btn.textContent = "Download Images";
document.body.insertBefore(btn, output);

const loading = document.createElement("div");
loading.id = "loading";
loading.textContent = "Loading...";
loading.style.display = "none";
document.body.insertBefore(loading, output);

const errorDiv = document.createElement("div");
errorDiv.id = "error";
errorDiv.style.color = "red";
document.body.insertBefore(errorDiv, output);

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Function to download all images
function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  const promises = images.map((img) => downloadImage(img.url));

  Promise.all(promises)
    .then((loadedImages) => {
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      errorDiv.textContent = err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

// Event listener for button
btn.addEventListener("click", downloadImages);
