import MoviesItem from "./moviesItem.js";
import { doApi, doApiSearch, deleteMovie } from "./appRequest.js";
import { declareEvemts, deleteFrom } from "./appForm.js";
import { createList } from "./appList.js";
let query = 1;
const init = () => {
  doApi();
  declareEvemts();
};

init();
