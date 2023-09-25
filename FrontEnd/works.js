export function generateFigureHTML(imageUrl, title) {
  return `
    <figure>
      <img src="${imageUrl}" alt="${title}">
      <figcaption>${title}</figcaption>
    </figure>
  `;
}

export function generateWorksHTML(works) {
  for (const work of works) {
    const workHTML = generateFigureHTML(work.imageUrl, work.title);
    document.querySelector(".gallery").innerHTML += workHTML;
  }
}

export function generateWorksModal(works) {
  for (const work of works) {
    const workHTML = generateFigureHTML(work.imageUrl, work.title);
    const i = works.indexOf(work);
    const modalWorkContainerHTML = `
    <div class="modalWorkContainer">
    <span class="deleteIcon data-index="${i}"><i class="fa-solid fa-trash-can"></i>
    </span>
    <figure>
    <img src="${work.imageUrl}" alt="${work.title}">
    </figure>
    </div>
    `;
    document.querySelector(".modalGallery").innerHTML += modalWorkContainerHTML;
  }
}
