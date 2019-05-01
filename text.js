class Text{
  constructor(){
    this.articles = [];
    this.poems = [];
    this.articleInfo = null;
    this.articleText = null;
    this.poemInfo = null;
    this.poemText = null;
  }
  getNewsData(query, day=30, month=4, year=2019){
    let formattedDate = year+"-"+month+"-"+day;
    let formattedQuery = {
      happy:["puppy","pizza"],
      sad:["dead","accident"],
      chill:["cafe","vacation"],
      hype:["party","intense"],
      romantic:["love","flower"],
      confident:["business","skydiving"]
    }
    let randomIndex = Math.floor(Math.random()*formattedQuery[query].length);
    let search = formattedQuery[query][randomIndex];
    let ajaxOptions = {
      url: 'https://newsapi.org/v2/everything',
      method: 'get',
      dataType: 'json',
      data:{
        q: search,
        from: formattedDate,
        sortBy: "popularity",
        language: "en",
        apiKey: "5e6556e5beed49609afc392ff37eb5b6"
      },
      success: this.newsDataSuccess,
      error: function(){ console.log("An error happened.");}
    }
    $.ajax(ajaxOptions);
  }
  getPoems(query){
    let formattedQuery = {
      happy:["puppy"],
      sad:["dead"],
      chill:["cafe"],
      hype:["party"],
      romantic:["love"],
      confident:["business"]
    }
    let randomIndex = Math.floor(Math.random()*formattedQuery[query].length);
    let search = formattedQuery[query][randomIndex];
    let url = "http://poetrydb.org/lines/"+search;
    let ajaxOptions = {
      url: url,
      method: 'get',
      dataType: 'json',
      success: this.poemSuccess,
      error: function(){ console.log("An error happened.");}
    }
    $.ajax(ajaxOptions);
  }
  newsDataSuccess(response){
    console.log("articles:",response);
    this.articles = response.articles;
    let randomIndex = Math.floor(Math.random()*response.articles.length);
    var articleTitle = $("<h1>").text("Title: "+response.articles[randomIndex].title);
    var articleAuthor = $("<h2>").text("Author: "+response.articles[randomIndex].author);
    $(".article-title").append(articleTitle);
    $(".article-author").append(articleAuthor);
    let textIndex = response.articles[randomIndex].content.indexOf("[+");
    let formattedText = response.articles[randomIndex].content.substring(0,textIndex);
    $(".article-text").text("Article: "+formattedText);
  }
  poemSuccess(response){
    console.log("poems:",response);
    this.poems = response;
    let randomIndex = Math.floor(Math.random()*response.length);
    var poemTitle = $("<h1>").text("Title: "+response[randomIndex].title);
    var poemAuthor = $("<h2>").text("Author: "+response[randomIndex].author);
    $(".poem-title").append(poemTitle);
    $(".poem-author").append(poemAuthor);
    $(".poem-text").text("Poem: "+response[randomIndex].lines.join(" "));
  }
}
