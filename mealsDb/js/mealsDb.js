// Display All Meal Load
const loadMealsDb = (search) =>{
    const url =`https://themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
    .then(res=> res.json())
    .then(data => mealsDisplayShow(data.meals))
}

// Display All Meal Show
const mealsDisplayShow = (meals) =>{
    const mealContainers = document.getElementById('meal-container');
    mealContainers.innerHTML = ``;
    meals.forEach( meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML =`
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        </div>
        </div>`;
        mealContainers.appendChild(mealDiv);
    })
}
// Meal Search And Find Out
const mealSearch = () =>{
    const searchInput = document.getElementById('search-field');
    const searchValue = searchInput.value;
    loadMealsDb(searchValue);
    searchInput.value = ``;
}
// Load Single Meal Detail
const loadMealDetail = (idMeal) =>{
   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
   fetch(url)
   .then(res => res.json())
   .then(data=> milDetails(data.meals[0]))
}

// Display Single Meal Detail Showing
const milDetails = (mealDetail) => {
    const detailContainer = document.getElementById('meal-details');
    detailContainer.innerHTML = ``;
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');
    mealDiv.innerHTML = `
                 <img src="${mealDetail.strMealThumb}" class="card-img-top img-fluid" alt="...">
                 <div class="card-body">
                  <h5 class="card-title">${mealDetail.strMeal}</h5>
                  <p class="card-text"></p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              `;
 detailContainer.appendChild(mealDiv)
}

loadMealsDb('');