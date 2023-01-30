const loadSports = () =>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)
    .then(res=> res.json())
    .then(data=> displayShowSports(data.drinks[0]))
}

const displayShowSports = (players) =>{
    const playerContainer = document.getElementById('players-container');
    console.log(players);
    playerContainer.classList.add('player-container')
        playerContainer.innerHTML = `
            <img class='img-fluid' src="${players.strDrinkThumb}" alt="" />
            <h6>${players.strDrink}</h6>
            <p>${players.strGlass}</p>
        `;
       
}
loadSports('');