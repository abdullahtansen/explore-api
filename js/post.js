function postUser(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => displayPosts(data))
}

function displayPosts(data){
    const postsContainer = document.getElementById('post-container');
    for(const post of data){
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
        <h5>User - ${post.id}</h5>
        <h6>Post title - ${post.title}</h6>
        <p>Post Description - ${post.body}</p>`;
        postsContainer.appendChild(postDiv);
    }
}

postUser();
