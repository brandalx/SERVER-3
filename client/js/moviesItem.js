export default class MoviesItem {
  constructor(_parent, _item, _index) {
    this.title = title;
    this.summary = _item.summary;
    this.rating = _item.rating;
    this.genere = _item.genere;
    this.index = _index;
  }

  render() {
    let tr = document.createElement("tr");
    document.querySelector(this.parent).append(tr);
    tr.innerHTML = `
        <td>${this.index + 1}</td>
        <td>${this.title}</td>
        <td>${this.summary} nis</td>
        <td>${this.rating}</td>
        <td>${this.genere}</td>
        <td><button class="btn btn-danger">X</button></td>
        `;
  }
}
