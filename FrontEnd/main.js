import { generateWorksHTML } from "./works.js";
import { allWorks } from "./filter.js";
import { filterWorks } from "./filter.js";


async function init() {
  const works = await fetch("http://localhost:5678/api/works").then((works) =>
    works.json()
  );
  const category = await fetch("http://localhost:5678/api/categories").then(
    (category) => category.json()
  );

  generateWorksHTML(works);
  allWorks(works);
  filterWorks(works, category);

}

init();

