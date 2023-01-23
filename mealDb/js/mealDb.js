const loadMealDb = (search) =>{
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
    .then(res=> res.json())
    .then(data=> mealDbShow(data.meals))
}

const mealDbShow = (meals) => {
    const mealDbContainer = document.getElementById('meal-container');
    mealDbContainer.innerHTML = ``;
    meals.forEach( meal =>{
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
       mealDiv.innerHTML = `
       <div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src=${meal.strMealThumb} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
      </div>`;
      mealDbContainer.appendChild(mealDiv);
    //   mealDbContainer.appendChild(mealContainer)
    })
}

const searchFood = () =>{
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadMealDb(searchText)
  searchField.value = '';
}

const loadMealDetail = (idMeal) =>{
  // console.log('get details of id', idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

  fetch(url)
  .then(res => res.json())
  .then(data => displayMilDetail(data.meals[0]))
}

const displayMilDetail = (mealDetail) =>{
 const detailContainer = document.getElementById('detail-container');
 detailContainer.innerHTML = ``
 const mealDiv = document.createElement('div');
 mealDiv.classList.add('card');
 mealDiv.innerHTML = `
                <img src="${mealDetail.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${mealDetail.strMeal}</h5>
                  <p class="card-text"></p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              `;
  detailContainer.appendChild(mealDiv);
}

loadMealDb('');