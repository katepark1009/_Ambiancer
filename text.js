class Text{
  constructor(){
    this.articles = [];
    this.poems = [];
  }
  getNewsData(query, day=30, month=4, year=2019){
    var formattedDate = year+"-"+month+"-"+day;
    var formattedQuery = {
      happy:["puppy","pizza"],
      sad:["dead","accident"],
      chill:["cafe","vacation"],
      hype:["party","intense"],
      romantic:["love","flower"],
      confident:["business","skydiving"]
    }
    var randomIndex = Math.floor(Math.random()*formattedQuery[query].length);
    var search = formattedQuery[query][randomIndex];
    var ajaxOptions = {
      url: 'https://newsapi.org/v2/everything',
      method: 'get',
      dataType: 'json',
      data:{
        q: search,
        from: formattedDate,
        sortBy: "popularity",
        apiKey: "5e6556e5beed49609afc392ff37eb5b6"
      },
      success: this.newsDataSuccess,
      error: function(){ console.log("An error happened.");}
    }
    $.ajax(ajaxOptions);
  }
  getPoems(query){
    var formattedQuery = {
      happy:["puppy"],
      sad:["dead"],
      chill:["cafe"],
      hype:["party"],
      romantic:["love"],
      confident:["business"]
    }
    var randomIndex = Math.floor(Math.random()*formattedQuery[query].length);
    var search = formattedQuery[query][randomIndex];
    var url = "http://poetrydb.org/lines/"+search;
    var ajaxOptions = {
      url: url,
      method: 'get',
      dataType: 'json',
      success: this.poemSuccess,
      error: function(){ console.log("An error happened.");}
    }
    $.ajax(ajaxOptions);
  }
  newsDataSuccess(response){
    console.log(response);
    this.articles = response.articles;
    for(var article of response.articles){
    }
  }
  poemSuccess(response){
    console.log(response);
    this.poems = response;
  }
}
