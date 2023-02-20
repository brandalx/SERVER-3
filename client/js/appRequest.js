import { createList } from "./appList.js";

export const doApi = async (peg) => {
  let url = `http://localhost:3003/movies?page=${peg}`;
  let resp = await axios.get(url);
  console.log(resp.data);
  createList(resp.data);
};

export const doApiSearch = async (query) => {
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

export const deleteMovie = async () => {
  const url = `http://localhost:3003/movies/63f2544eb544a0cfa4f4a4af`;
  try {
    const response = await axios.delete(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
