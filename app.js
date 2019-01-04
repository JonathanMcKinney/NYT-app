console.log("hello world");

// NYT Search API 6ead5140e5e0428689152de2a91fa97f (Freddy's private key)
// NYT Doc https://developer.nytimes.com/article_search_v2.json#/Console/GET/articlesearch.json
// Article name = response.docs.snippet
// Article link = response.docs.web_url
// Article thumbnail = response.docs.multimedia.url


var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var query = "";
var sDate = "";
var eDate = "";
var preset;

$("#trashButton").on("click", function(){ 
    restart();
})

$("#searchButton").on("click", function() { 
    restart();
    
    query = $("#searchTerm").val(); 
    sDate = $("#startYear").val().toString(); 
    eDate = $("#endYear").val().toString(); 
    preset = $(".numResults").data("number");
    preset1 = document.querySelectorAll('[data-number]').toString(); 
    console.log("first " + preset1);


    url += '?' + $.param({
        'api-key': "6ead5140e5e0428689152de2a91fa97f",
        'q': query,
        'begin_date': sDate,
        'end_date': eDate

    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
       console.log(result);
        let getInfo = result.response.docs;
        let getLength = getInfo.length; 

        for (let i = 1; i < preset + 1; i++) {    
            console.log("looped" + preset);                               
            
            let article = $("<div>")
            
            article.append("<h3>" + "<a href='" + getInfo[i].web_url + "'>"+ getInfo[i].headline.main + "</a>" + "</h3>")  
            article.append("<p>" + getInfo[i].snippet + "</p>")   
            

            $("#display-results").append(article);

        }
    }).fail(function(err) {
        console.log("Nope")
    });
});

function restart() {

    $("#display-results").empty();
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    query = ""; 
    sDate = "";
    eDate = "";
}