const loadCatagories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCatagories(data);
};

const displayCatagories = (data) => {
  console.log(data);
  const categoriesUl = document.getElementById("catagories-ul-id");
  data.data.news_category.forEach((category) => {
    const categoryLi = document.createElement("li");
    categoryLi.classList.add("nav-item");
    categoryLi.innerHTML = `
        <a class="nav-link" href="#/" onclick="loadCatagoryData('${category.category_id}')">${category.category_name}</a>
    `;
    categoriesUl.appendChild(categoryLi);
  });
};

const loadCatagoryData = async (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayCatagoryData(data);
};

const displayCatagoryData = (data) => {
  console.log(data);
  const newses = data.data;
  newses.sort((first, second) => second.total_view - first.total_view);
  console.log(newses);
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent='';
  for (const news of newses) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("mb-3");
    // card.style.cssText += 'color:red;background-color:yellow';

    card.innerHTML = `
            <div class="row g-0">
              <div class="col-md-3 p-2">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text " style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;">${news.details}</p>
                  <p class="card-text d-flex justify-content-around"> <span><small class="text-muted">Author Name: ${news.author.name}</small></span> <span><small class="text-muted">Views: ${news.total_view}</small></span> <span> <i class="fa-solid fa-arrow-right"></i></span> </p>
                </div>
              </div>
            </div>
  `;
  cardContainer.appendChild(card);
  }
};

window.onload = (event) => {
  loadCatagories();
};
