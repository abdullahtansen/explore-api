const loadQuote = () => {
    fetch('https://api.kanye.rest/')
    .then(res=> res.json())
    .then(data =>displayShow(data))
}
const displayShow = data =>{
    const postContainer = document.getElementById('post-container');
    postContainer.innerText = `${data.quote}`;
}
