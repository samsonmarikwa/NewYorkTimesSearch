$(document).ready(function() {


    //setup variables
    //
    var authKey = "b555441db8b44caa9213327fabb25f58";

    //search parameters
    var queryTerm = "";
    var numResults = 0;
    var startDate = 0;
    var endDate = 0;


    // url base

    function buildURL() {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";


        //create an object called params and give it a property api-key with an initial value
        var params = { "api-key": "b555441db8b44caa9213327fabb25f58" };

        //add other properties to the params object
        params.q = $("#search").val().trim();
        params.page = $("#sel1").val().trim();
        params.begin_date = $("#startYear").val().trim();
        params.end_date = $("#endYear").val().trim();

        url += $.param(params);

        return url;
    }

    //functions
    //===============
    function clearResults() {

        // clear Search results area
        $("#search-results").empty();
    }

    function updatePage(NYT) {
        console.log(NYT);
        for (var x = 0; x < NYT.response.docs.length; x++) {

            var ul = $("<ul>");
            ul.addClass("well");
            $("#search-results").append(ul);

            ul.append("<h4>" + NYT.response.docs[x].headline.main + "</h4>");

            var section = "";

            if (typeof NYT.response.docs[x].section_name != 'undefined') {
                section = NYT.response.docs[x].section_name;
            } else {
                section = "";
            }

            ul.append("<h4>" + section + "</h4>");
            ul.append("<h4>" + NYT.response.docs[x].pub_date + "</h4>");
            ul.append("<h4><a href=" + NYT.response.docs[x].web_url + " target='_blank'>" + NYT.response.docs[x].web_url + "</a></h4>");
        }
    }

    function runQuery(queryURL) {

        // clear Search results area
        clearResults();

        console.log(queryURL);
        // ajax call
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).done(function(NYTData) {
            updatePage(NYTData);
        })

    }

    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        var url = buildURL()
        runQuery(url);
    });


    $("#clearBtn").on("click", function(event) {
        clearResults();
    });

});