
var search_term;
var nNbr_records;
var articles_info = [];


// This is the function that has the functionality for making the api call
// Function that handles when the call is successfully
function success_function(response) {
    for (var i = 0; i < response.response.docs.length; i++) {

        var vHeading = response.response.docs[i].abstract;
        var vPublished = response.response.docs[i].pub_date;
        var vSection = response.response.docs[i].section_name;
        var vLink = response.response.docs[i].web_url;
        var vAuthor = response.response.docs[i].byline.original;
        var record = { heading: vHeading, author: vAuthor, section: vSection, published: vPublished, link: vLink }
        articles_info.push(record);
        console.log(vHeading)

        // creating variable to create a element on page 
        var articles = $('<div>').addClass("row")

        // using same variable to fill the html of that element this is called a 'template literal'
        // using the back tick " ` " button to enclose with *variable*.html
        // using the for loop and the API call, I can dynamically create the articles

        // I downloaded an extension called ES6 String HTML and typed /*html*/ to view it like html
        articles.html(/*html*/`
        
                        <div class='mb-1'>
                            <h3 class='headers'> ${vHeading}</h1>
                            <p class='author'>${vAuthor}</p>
                            <p class='year'> ${vPublished}</p>
                            <p class='type'> Section: ${vSection}</p>
                            
                            <a href='${vLink}'> Click here to view article</a>
                            <br>
                            <hr class='mb-2'>

                        </div> 
                            `)
        $('.articles-display-here').prepend(articles)
    }

}


//  Function that handles when the call is not successful
function error_function() {
    alert("error")
}


var api_key = 'EpzgypA0SaNTLyQAWNx3SRRbFk6EocLC';

$("#final_sub").on("click", function () {
    
    $(".articles-display-here").empty();
    
    // input search val
    var search_term = $('#inputSearch').val();
    

    // number records val
    var nNbr_records = $('#inputRecords').val();
    console.log(nNbr_records)
    var start_year = $('#inputStartYear').val();
    if (start_year == "") {
        start_year = "1920"
    }
    console.log(start_year)
    var end_year = $('#inputEndYear').val();
    if (end_year == "") {
        end_year = "2019"
    }
    console.log(end_year);

    var api_query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search_term + "&begin_date=" + start_year + "0101&end_date=" + end_year + "1231&sort=newest&api-key=" + api_key;

    event.preventDefault();
    $.ajax({ url: api_query, success: success_function, error: error_function });
});