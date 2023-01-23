const loadUsers = () =>{
    fetch('https://randomuser.me/api/?results=10')
    .then(res=> res.json())
    .then(data => displayUsers(data.results))
}

const displayUsers = users =>{
    const usersContainer = document.getElementById('users-container');
    for(const user of users){
        const userDiv = document.createElement('div');
        userDiv.classList.add('user')
        userDiv.innerHTML = `
            <h2>Name ${user.name.first}</h2>
            <img src=${user.picture.medium} alt="" />
            <p>Gender ${user.gender}</p>
            <p>User Location- ${user.location.country}</p>
        `;
        usersContainer.appendChild(userDiv);
    }
}
loadUsers();