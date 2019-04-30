class Text{
  constructor(){
    this.articles = [];
    this.poems = [];
  }
  getNewsData(query, day=30, month=4, year=2019){
    var formattedDate = year+"-"+month+"-"+day;
    var ajaxOptions = {
      url: 'https://newsapi.org/v2/everything',
      method: 'get',
      dataType: 'json',
      data:{
        q: query,
        from: formattedDate,
        sortBy: "popularity",
        apiKey: "5e6556e5beed49609afc392ff37eb5b6"
      },
      success: this.newsDataSuccess,
      error: function(){ console.log("An error happened.")}
    }
    $.ajax(ajaxOptions);
  }
  getPoems(query){
    var url = "http://poetrydb.org/lines/"+query
    var ajaxOptions = {
      url: url,
      method: 'get',
      dataType: 'json',
      success: this.poemSuccess,
      error: function(){ console.log("An error happened.")}
    }
    $.ajax(ajaxOptions);
  }
  newsDataSuccess(response){
    console.log(response);
    this.articles = response.articles;
    for(var article of response.articles){
      // var title = $("<div>").text(article.title);
      // $("body").append(title);
    }
  }
  poemSuccess(response){
    console.log(response);
    this.poems = response;
  }
}
