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

        // for reference to html
        {/* <div class="card result">
        <div class="card-header">Top Articles</div>
        <div class="card-body articles-display-here"></div>
        </div> */}
        var articles = $('<div>').addClass("row")

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
    console.log(articles_info);


}


//  Function that handles when the call is not successful
function error_function() {
    alert("error")
}


var api_key = 'EpzgypA0SaNTLyQAWNx3SRRbFk6EocLC';

// when there is a start and end year
// var api_query ="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search_term+"&begin_date="+start_year+"0101&end_date="+end_year+"1231&fl="+Nbr_records+"&sort=newest&api-key="+api_key;

$("#final_sub").on("click", function () {
    var articles_info = [];
    $(".articles-display-here").empty();
    // input search val
    var search_term = $('#inputSearch').val();
    console.log(search_term);

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
    // start_year = 2000;
    // end_year = 2019;
    var api_query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search_term + "&begin_date=" + start_year + "0101&end_date=" + end_year + "1231&sort=newest&api-key=" + api_key;
    console.log(api_query);
    event.preventDefault();
    $.ajax({ url: api_query, success: success_function, error: error_function });
});

//////////////////////////////////////////////////////
// html for reference


