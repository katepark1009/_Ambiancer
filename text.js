class TextDataHandler{
  constructor(){
    this.articles = [];
    this.url = "";
    this.newsDataSuccess = this.newsDataSuccess.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleNewsfeedButton = this.handleNewsfeedButton.bind(this);
    this.handleArticleButton = this.handleArticleButton.bind(this);
  }
  getNewsData(query, day=30, month=4, year=2019){
    let formattedDate = year+"-"+month+"-"+day;
    let formattedQuery = {
      happy:["puppy","pizza"],
      sad:["dead","accident"],
      chill:["cafe","vacation"],
      hype:["party","intense"],
      romantic:["love","flower"],
      motivated:["business","skydiving"]
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
        apiKey: "9e7748236bd94a3b917d8405a1fc97b7"
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
      motivated:["business"]
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
    console.log('response article:', response.articles[0]);
    $(".article-title").empty();
    $(".article-author").empty();
    let randomIndex;
    let counter = 0;
    while(response.articles.length > 0 && counter < 5){
      randomIndex = Math.floor(Math.random()*response.articles.length);
      let article = response.articles.splice(randomIndex,1)[0];
      if(article.content){
        this.articles.push(article);
        let articleTitle = $("<p>").addClass("text newsfeed-title").text(article.title);
        let firstBr = $("<br>");
        let secondBr = $("<br>");
        articleTitle.on("click",this.handleTitleClick);
        $(".news-feed").append(articleTitle).append(firstBr).append(secondBr);
        counter++;
      }
      else{
      }
    }
  }
  poemSuccess(response){
    $(".poem-title").empty();
    $(".poem-author").empty();
    console.log("poems:",response);
    this.poems = response;
    let randomIndex = Math.floor(Math.random()*response.length);
    var poemTitle = $("<p>").text(response[randomIndex].title);
    var poemAuthor = $("<p>").text("- Author: "+response[randomIndex].author+ " -" )
    $(".poem-title").append(poemTitle);
    $(".poem-author").append(poemAuthor);
    let preString = "";
    let postString = response[randomIndex].lines.join(" ");
    let semiIndex = postString.indexOf(";");
    let periodIndex = postString.indexOf(".");
    let commaIndex = postString.indexOf(",");

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
    $(".poem-text").html("<p class='text'>"+preString+"</p>");
  }
  handleTitleClick(event){
   $(".section2").empty();
   let title = $(event.target).text();
   let chosenArticle;
   for(let article of this.articles){
     if(article.title === title){
       chosenArticle = article;
       break;
     }
   }
   this.url = chosenArticle.url;
   let textIndex = chosenArticle.content.indexOf("[+");
   let formattedText = chosenArticle.content.substring(0,textIndex);
   let row1 = $("<div>").addClass("row1 row");
   let row2 = $("<div>").addClass("row2 row");
   let row3 = $("<div>").addClass("row3 row");
   let row4 = $("<div>").addClass("row4 row");
   let row7 = $("<div>").addClass("row7");
   let titleHeader = $("<h1>").text(chosenArticle.title);
   let textParagraph = $("<p>").addClass("article-preview").text(formattedText);
   let authorHeader = $("<h2>").text("Author: "+chosenArticle.author);
   let articleAuthor = $("<div>").addClass("article-author").append(authorHeader);
   let articleInfo = $("<div>").addClass("mini-div article-info");
   let articleText = $("<div>").addClass("mini-div article-text").append(textParagraph);
   let articleTitle = $("<div>").addClass("article-title").append(titleHeader);
   let anchor = $("<a>").attr("target","_blank").attr("href",this.url).text("To the article");
   let articleButton = $("<button>").addClass("article-btn");
   let newsfeedButton = $("<button>").addClass("news-feed-btn").text("Return to the newsfeed");
   let articleButtonCol = $("<div>").addClass("article-btn-col");
   let newsfeedButtonCol = $("<div>").addClass("news-feed-btn-col");
   let imageFromArticle = $('<img>').attr("src", chosenArticle.urlToImage).addClass("article-image");
   articleButton.on("click",this.handleArticleButton);
   newsfeedButton.on("click",this.handleNewsfeedButton);
   $(".section2").append(row1,articleAuthor, imageFromArticle).append(row2).append(row7);
   row1.append(articleInfo);
   articleInfo.append(row3).append(row4);
   row3.append(articleTitle);
  //  $(".row4").append(articleAuthor);
   row2.append(articleText);
   row7.append(newsfeedButtonCol).append(articleButtonCol);
   articleButtonCol.append(articleButton);
   newsfeedButtonCol.append(newsfeedButton);
   articleButton.append(anchor);
 }
 resetNewsFeed(){
   $(".section2").empty();
   this.articles = [];
   let newsfeed = $("<div>").addClass("news-feed");
   let newsfeedTitle = $("<div>").addClass("news-feed-title");
   let newsfeedHeader = $("<h1>").text("News Feed:");
   let newsfeedContainer = $("<div>").addClass("news-feed-container");
   let row5 = $("<div>");
   let row6 = $("<div>");
   newsfeedTitle.append(newsfeedHeader);
   row5.append(newsfeedTitle);
   row6.append(newsfeed);
   newsfeedContainer.append(row5).append(row6);
   $(".section2").append(newsfeedContainer);
 }
 handleArticleButton(){
   console.log("article button clicked!");
 }
 handleNewsfeedButton(){
   console.log("newsfeed button clicked!");
   $(".section2").empty();
   let newsfeed = $("<div>").addClass("news-feed");
   let newsfeedTitle = $("<div>").addClass("news-feed-title");
   let newsfeedHeader = $("<h1>").text("News Feed:");
   let newsfeedContainer = $("<div>").addClass("news-feed-container");
   let row5 = $("<div>");
   let row6 = $("<div>");
   newsfeedTitle.append(newsfeedHeader);
   row5.append(newsfeedTitle);
   row6.append(newsfeed);
   newsfeedContainer.append(row5).append(row6);
   $(".section2").append(newsfeedContainer);

   for(let article of this.articles){
     let articleTitle = $("<p>").addClass("text newsfeed-title").text(article.title);
     let firstBr = $("<br>");
     let secondBr = $("<br>");
     articleTitle.on("click",this.handleTitleClick);
     $(".news-feed").append(articleTitle).append(firstBr).append(secondBr);
   }
 }
}
