import { doApiSearch, doApi } from "./appRequest.js";
import { deleteMovie } from "./appRequest.js";
export const declareEvemts = () => {
  let query = 1;
  let back = document.querySelector("#btnBack");
  let next = document.querySelector("#btnNext");
  next.addEventListener("click", () => {
    query++;
    if (query > 4) {
      query = 4;
      return 0;
    } else {
      doApi(query);
    }
  });
  back.addEventListener("click", () => {
    query--;
    if (query < 1) {
      query = 1;
      return 0;
    } else {
      doApi(query);
    }
  });
  let input = document.querySelector("#input");
  let search = document.querySelector("#search");
  search.addEventListener("submit", (e) => {
    e.preventDefault();
    query = input.value;
    console.log("query is " + query);

    doApiSearch(query);
  });
};

export const deleteFrom = () => {
  const links = document.querySelectorAll(".btndelete");

  for (const element of links) {
    element.addEventListener("click", () => {
      console.log(element.innerHTML);
      deleteMovie();
    });
  }
};
