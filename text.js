class Text{
  constructor(){
    this.articles = [];
    this.poems = [];
    this.articleElement = null;
    this.poemElement = null;
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
    let title = $("<div>").addClass("article-title").text("Title: "+response.articles[randomIndex].title);
    let author = $("<div>").addClass("article-author").text("Author: "+response.articles[randomIndex].author);
    let textIndex = response.articles[randomIndex].content.indexOf("[+");
    let formattedText = response.articles[randomIndex].content.substring(0,textIndex);
    let text = $("<div>").addClass("article-text").text("Article: "+formattedText);
    let article = $("<div>").addClass("article");
    article.append(title);
    article.append(author);
    article.append(text);
    this.articleElement = article;
    $(".ambience-screen").append(this.articleElement);
  }
  poemSuccess(response){
    console.log("poems:",response);
    this.poems = response;
    let randomIndex = Math.floor(Math.random()*response.length);
    let title = $("<div>").addClass("poem-title").text("Title: "+response[randomIndex].title);
    let author = $("<div>").addClass("poem-author").text("Author: "+response[randomIndex].author);
    let text = $("<div>").addClass("poem-text").text("Poem: "+response[randomIndex].lines.join(" "));
    let poem = $("<div>").addClass("poem");
    poem.append(title);
    poem.append(author);
    poem.append(text);
    this.poemElement = poem;
    $(".ambience-screen").append(this.poemElement);
  }
}
