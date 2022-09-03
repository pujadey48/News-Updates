const loadCategories = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data);
  } catch (error) {
    console.error(error);
  }
};

const displayCategories = (data) => {
  try {
    console.log(data);
    const categoriesUl = document.getElementById("categories-ul-id");
    let index = 0;
    data.data.news_category.forEach((category) => {
      const categoryLi = document.createElement("li");
      categoryLi.classList.add("nav-item");
      categoryLi.innerHTML = `
        <a class="nav-link category-nav-item" href="#/" onclick="loadCategoryData('${category.category_id}', '${category.category_name}', this)">${category.category_name}</a>
    `;
      categoriesUl.appendChild(categoryLi);

      if (index == 0) {
        categoryLi.firstElementChild.click();
      }
      index++;
    });
  } catch (error) {
    console.error(error);
  }
};


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const selectActiveNavItem = (node) => {
    const collection = document.getElementsByClassName("category-nav-item");
    for( const navItem of collection){
        navItem.classList.remove("active");
    };

    node.classList.add("active");
}

const loadCategoryData = async (categoryId, categoryName, node) => {
  try {
    selectActiveNavItem(node);
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryData(data, categoryName);
  } catch (error) {
    console.error(error);
  }
};

const displayCategoryData = (data, categoryName) => {
  try {
    console.log(data);
    const newses = data.data;
    newses.sort((first, second) => second.total_view - first.total_view);
    console.log(newses);

    const itemsFoundLength = document.getElementById("item-found-by-category");
    itemsFoundLength.innerText = `${newses.length} items found in ${categoryName}`;

    const cardContainer = document.getElementById("card-container");
    const noFound = document.getElementById("no-found-message");

    if (newses.length === 0) {
      noFound.classList.remove("d-none");
      itemsFoundLength.parentNode.classList.add("d-none");
    } else {
      noFound.classList.add("d-none");
      itemsFoundLength.parentNode.classList.remove("d-none");
    }

    cardContainer.textContent = "";
    for (const news of newses) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("mb-3");
      // card.style.cssText += 'color:red;background-color:yellow';

      card.innerHTML = `
            <div class="row g-0" onclick="loadNewsDetails('${
              news._id
            }')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <div class="col-md-3 p-2">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start w-100" alt="...">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text " style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;">${
                    news.details
                  }</p>
                  <p class="card-text d-flex justify-content-around align-items-center">
                  <span><img src="${
                    news.author.img
                  }" class="rounded-circle" alt="" width="40" height="40"> <small class="text-muted">Author Name: ${
        news.author.name ? news.author.name : "No data available"
      }</small></span> 
                  <span><small class="text-muted"><i class="fa-solid fa-eye"></i> ${
                    news.total_view ? news.total_view : "No data available"
                  }</small></span> 
                  <span onclick="loadNewsDetails('${
                    news._id
                  }')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i class="fa-solid fa-arrow-right"></i></span> </p>
                </div>
              </div>
            </div>
  `;
      cardContainer.appendChild(card);
    }
    toggleSpinner(false);
  } catch (error) {
    console.error(error);
  }
};
//  modal.........
const loadNewsDetails = async (news_id) => {
  try {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
  } catch (error) {
    console.error(error);
  }
};

const displayNewsDetails = (news) => {
  try {
    console.log(news);
    const modalTitle = document.getElementById("modalTitleDetails");
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById("news-details");
    newsDetails.innerText = news.details;
    const imageCol = document.getElementById("image-col");
    imageCol.innerHTML = `
 <img id="news-details-image" src="${
   news.image_url
 }" class="img-fluid rounded-start" alt="...">
 <p class="card-text d-flex justify-content-around align-items-center mt-2"><span><img id="author-image" src="${
   news.author.img
 }" class="rounded-circle" alt="" width="40" height="40"> <small id="author-name" class="text-muted">${
      news.author.name ? news.author.name : "No data available"
    } </small></span> 
    <span><small class="text-muted"><i class="fa-solid fa-eye"></i>${
      news.total_view ? news.total_view : "No data available"
    } </small></span></p>
 `;
  } catch (error) {
    console.error(error);
  }
};

window.onload = (event) => {
  loadCategories();
};
