import { generateWorksHTML } from "./works.js";
import { allWorks } from "./filter.js";
import { filterWorks } from "./filter.js";
import { getWorks, getCategories } from "./api.js";


async function init() {
  const works = await getWorks();
  const category = await getCategories();

  generateWorksHTML(works);
  allWorks(works);
  filterWorks(works, category);
}

init();

