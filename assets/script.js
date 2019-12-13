// This is the function that has the functionality for making the api call
// Function that handles when the call is successfully
function success_function(response){
    for(var i=0;i<response.response.docs.length;i++){
        var vheading=response.response.docs[i].abstract;
        var vpublished=response.response.docs[i].pub_date;
        var vsection=response.response.docs[i].section_name;
        var vlink=response.response.docs[i].web_url;
        var vauthor=response.response.docs[i].byline.original;
        var record={heading:vheading,author: vauthor,section: vsection,published: vpublished,link: vlink}
        articles_info.push(record);
    }
    console.log(articles_info);
    }
    //  Function that handles when the call is not successful
    function error_function(){
    alert("error")
    }
    var api_key='EpzgypA0SaNTLyQAWNx3SRRbFk6EocLC';
    // when there is a start and end year
    // var api_query ="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search_term+"&begin_date="+start_year+"0101&end_date="+end_year+"1231&fl="+Nbr_records+"&sort=newest&api-key="+api_key;
    var articles_info=[];
    $("#final_sub").on("click", function(){
        // input search val
        var search_term = $('#inputSearch').val();
        console.log(search_term);
        // number records val
        var nNbr_records = $('#inputRecords').val();
        var start_year = $('#inputStartYear').val();
        var end_year = $('#inputEndYear').val();
        console.log(start_year);
        start_year=2000;
        end_year=2019;
        var api_query="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search_term+"&begin_date="+start_year+"0101&end_date="+end_year+"1231&sort=newest&api-key="+api_key;   
        console.log(api_query);
        event.preventDefault();
        alert("making ajax");
        $.ajax({url: api_query,success: success_function,error: error_function});
    });