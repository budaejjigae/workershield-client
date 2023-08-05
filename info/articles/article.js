const urlParam = new URL(location.href).searchParams.get('id');
const id = Number(urlParam);

const mainTitle = document.getElementsByClassName('main-title')[0];
const thumbnail = document.getElementsByClassName('image-title')[0];
const articleTitle = document.getElementById('article-title');
const articleContent = document.getElementById('article-content');

for(let el of data.articles){  
    if(el.id === id){
        thumbnail.style.backgroundImage = `url(${el.thumbnail})`; 
        mainTitle.innerHTML= el.title;
        articleTitle.innerHTML = el.title;
        articleContent.innerHTML = el.content;
    }
}