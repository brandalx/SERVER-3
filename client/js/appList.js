import MoviesItem from "./moviesItem.js";
import { deleteFrom } from "./appForm.js";
export const createList = (_ar) => {
  let mainAppender = document.querySelector("#id_parent");
  mainAppender.innerHTML = " ";
  _ar.forEach((item, i) => {
    let movies = new MoviesItem(item, i);
    movies.render();
  });
  deleteFrom();
};
