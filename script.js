
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
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`
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
        articles.forEach(article => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="info">
                <div class="author">
                <span>Author:</span>
                <span title = "${article.author}" class ="author">${truncateString(article.author ||"UnKhown" ,4) || "UnKhown"}</span></div>
                <div class="published-at">${new Date (article.publishedAt).toDateString()}</div>
                </div>
                <img src="${article.urlToImage}" alt="${article.title}">
                <a href="${article.url}" target="_blank">${article.title}</a>
                <p class="description">${article.description}</p>
                <div class="source">
                    ${article.source.name}
                </div>
            `
            newsList.appendChild(listItem);
            
        });
    
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


