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

let input = document.querySelector("#input");
let search = document.querySelector("#search");
search.addEventListener("submit", (e) => {
  e.preventDefault();
  query = input.value;
  console.log("query is " + query);

  doApiSearch(query);
});

const doApiSearch = async (query) => {
  try {
    let url = `http://localhost:3003/movies?search=${query}`;
    let resp = await axios.get(url);
    let final = resp.data;
    if (final.length == 0) {
      let mainAppender = document.querySelector("#id_parent");
      mainAppender.innerHTML = `It seems we didnt find anything for your search '${query}'`;
    } else {
      createList(final);
    }
  } catch (err) {
    console.log(err);
    alert("There problem, come back later");
  }
};

const deleteFrom = () => {
  const links = document.querySelectorAll(".btndelete");

  for (const element of links) {
    element.addEventListener("click", () => {
      console.log(element.innerHTML);
      deleteMovie();
    });
  }
};

const deleteMovie = async () => {
  const url = `http://localhost:3003/movies/63f2544eb544a0cfa4f4a4af`;
  try {
    const response = await axios.delete(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const createList = (_ar) => {
  let mainAppender = document.querySelector("#id_parent");
  mainAppender.innerHTML = " ";
  _ar.forEach((item, i) => {
    let movies = new MoviesItem(item, i);
    movies.render();
  });
  deleteFrom();
};

init();
