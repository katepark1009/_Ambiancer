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
    $(".article-title").empty();
    $(".article-author").empty();
    console.log("articles:",response);
    this.articles = response.articles;
    let randomIndex = Math.floor(Math.random()*response.articles.length);
    var articleTitle = $("<h1>").text(response.articles[randomIndex].title);
    var articleAuthor = $("<h2>").text("Author: "+response.articles[randomIndex].author);
    $(".article-title").append(articleTitle);
    $(".article-author").append(articleAuthor);
    let textIndex = response.articles[randomIndex].content.indexOf("[+");
    let formattedText = response.articles[randomIndex].content.substring(0,textIndex);
    $(".article-text").text(formattedText);
  }
  poemSuccess(response){
    $(".poem-title").empty();
    $(".poem-author").empty();
    console.log("poems:",response);
    this.poems = response;
    let randomIndex = Math.floor(Math.random()*response.length);
    var poemTitle = $("<h1>").text(response[randomIndex].title);
    var poemAuthor = $("<h2>").text("Author: "+response[randomIndex].author);
    $(".poem-title").append(poemTitle);
    $(".poem-author").append(poemAuthor);
    var preString = "";
    var postString = response[randomIndex].lines.join(" ");
    var semiIndex = postString.indexOf(";");
    var periodIndex = postString.indexOf(".");
    var commaIndex = postString.indexOf(",");

    while(semiIndex > -1){
      preString += postString.substring(0,semiIndex+1);
      postString = postString.substring(semiIndex+1,postString.length);
      postString = postString.split("");
      postString.unshift("<br><br>");
      postString = postString.join("");
      semiIndex = postString.indexOf(";");
    }
    preString += postString;
    postString = preString;
    preString = "";
    while(periodIndex > -1){
      preString += postString.substring(0,periodIndex+1);
      postString = postString.substring(periodIndex+1,postString.length);
      postString = postString.split("");
      postString.unshift("<br><br>");
      postString = postString.join("");
      periodIndex = postString.indexOf(".");
    }
    preString += postString;
    postString = preString;
    preString = "";
    while(commaIndex > -1){
      preString += postString.substring(0,commaIndex+1);
      postString = postString.substring(commaIndex+1,postString.length);
      postString = postString.split("");
      postString.unshift("<br><br>");
      postString = postString.join("");
      commaIndex = postString.indexOf(",");
    }
    preString += postString;
    $(".poem-text").html("<div class='formatted-poem-text'>"+preString+"</div>");
  }
}
