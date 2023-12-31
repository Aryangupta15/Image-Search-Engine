const Row = document.getElementById("row");
const SearchArea = document.getElementById("search-area");
const Imageslist = document.getElementById("Images-list");
const ShowMore = document.getElementById("show-more");

let keyword = "";
let page = 1;
let assessKey = "1vylW6wUMK3VOEaNu7wy_7DjHIABnVj2dnCUcL11URs";

async function searchImages() {
  keyword = SearchArea.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${assessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    Imageslist.innerHTML = "";
  }

  if (SearchArea.value === "") {
    alert("Please search for the image!");
  }

  const results = data.results;
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small; // THERE ARE SOME MORE OPTIONS INSTEAD OF SMALL LIKE RAW,FULL,REGULAR,THUMB,ETC

    const imageLink = document.createElement("a");
    imageLink.href = result.links.download; // THERE ARE SOME MORE OPTIONS INSTEAD OF HTML LIKE SELF,DOWNLOAD,DOWNLOAD_LOCAION,ETC
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    Imageslist.appendChild(imageLink);
  });
  ShowMore.style.display = "block";
}

Row.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

ShowMore.addEventListener("click", function () {
  page++;
  searchImages();
});
