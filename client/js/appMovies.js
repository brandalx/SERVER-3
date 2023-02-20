import MoviesItem from "./moviesItem";

const init = () => {
  doApi();
};

const doApi = async () => {
  let url = "http://localhost:3003/movies";
  let resp = await axios.get(url);
  console.log(resp.data);
  createList(resp.data);
};

const createList = (_ar) => {
  _ar.forEach((item, i) => {
    let movies = new MoviesItem("#id_parent", item, i);
    movies.render();
  });
};

init();
