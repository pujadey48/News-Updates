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
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}` ;
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoryData(data);
  };
  
  const displayCatagoryData = (data) => {
    console.log(data);
    const news = data.data;
    news.sort((first, second) => second.total_view - first.total_view);
    console.log(news);
  };


window.onload = (event) => {
  loadCatagories();
};
