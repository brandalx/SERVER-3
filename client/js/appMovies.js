import MoviesItem from "./moviesItem.js";
let query = 1;
const init = () => {
  doApi();
  declareEvemts();
};
let back = document.querySelector("#btnBack");
let next = document.querySelector("#btnNext");
const declareEvemts = () => {
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
};

const doApi = async (peg) => {
  let url = `http://localhost:3003/movies?page=${peg}`;
  let resp = await axios.get(url);
  console.log(resp.data);
  createList(resp.data);
};

const createList = (_ar) => {
  let mainAppender = document.querySelector("#id_parent");
  mainAppender.innerHTML = " ";
  _ar.forEach((item, i) => {
    let movies = new MoviesItem(item, i);
    movies.render();
  });
};

init();
