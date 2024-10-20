//b6ebb9fd191b4f4bb0209c67482f0c00
const apiKey = "8645a9321dee4d5b8586c536594c87bb";
const pageSize = 15;
let category = "general";
const allBtn = document.querySelectorAll(".buttons button");

document.addEventListener("DOMContentLoaded", function() {
    allBtn.forEach(btn => {
        btn.addEventListener("click" , ()=>{
            allBtn.forEach(btn => btn.classList.remove("active"))
            btn.classList.add("active")
            category = btn.value;
            fetchNews();
        })
    })
    function fetchNews(){
        const url = ` https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`
        fetch(url)
        .then(respone => respone.json())
        .then(date => {
            displayNews(date.articles)
        }).catch(erro => console.log(erro))
        .finally(() => {
            document.querySelector("#preloader").style.display = "none";
            document.querySelector(".container").style.display = "block";
        });
        
    
    }
    function displayNews(articles){
        const newsList = document.querySelector(".news-list");
        
        newsList.innerHTML = '';
        if (articles && articles.length > 1){
            articles.forEach(article => {
                const listItem = document.createElement("li");
                let srcImg = article.urlToImage || "";
                let articleURl = article.url || "#"
                if(article.urlToImage) {srcImg = article.urlToImage} else srcImg = ""; 
                if(article.url) {articleURl = article.url} else articleURl = ""; 
                listItem.innerHTML = `
                <div class="info">
                    <div class="author">
                        <span>Author:</span>
                        <span title="${article.author || 'Unknown'}" class="author">${truncateString(article.author || 'Unknown', 4)}</span>
                    </div>
                    <div class="published-at">${new Date(article.publishedAt).toDateString()}</div>
                </div>
                <img src="${srcImg}" alt="${article.title}">
                <a href="${articleURl}" target="_blank">${article.title}</a>
                <p class="description">${article.description || 'No description available'}</p>
                <div class="source">
                    ${article.source?.name || 'Unknown'}
                </div>
                `
                newsList.appendChild(listItem);
                
            });
        } else {
            newsList.innerHTML = "no news to show ";
        }
        
    
    };
    
    function truncateString(str , numWords){
        const words = str.split(" ");
        if (words.length <= numWords){
            return str;
        }else{
            return words.slice(0 , numWords).join(" ") + "..."
        }
    }
    
    fetchNews();
});


