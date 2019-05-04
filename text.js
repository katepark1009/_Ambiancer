class TextDataHandler{
  constructor(){
    this.articles = [];
    this.url = "";
    this.newsDataSuccess = this.newsDataSuccess.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleNewsfeedButton = this.handleNewsfeedButton.bind(this);
    this.mood = "";
  }
  getNewsData(query, day=30, month=4, year=2019){
    this.mood = query;
    let formattedDate = year+"-"+month+"-"+day;
    let search = "";
    if(presentationMode){
      let formattedQuery = {
        happy:"thanks",
        sad:"tragic",
        chill:"vacation",
        hype:"party",
        romantic:"love",
        motivated:"success"
      }
      search = formattedQuery[query];
    }
    else{
      let formattedQuery = {
        happy:["puppy","thanks"],
        sad:["dead","accident","tragic"],
        chill:["cafe","vacation"],
        hype:["party","intense"],
        romantic:["love","flower"],
        motivated:["business","success"]
      }
      let randomIndex = getRandomIndex(formattedQuery[query]);
      search = formattedQuery[query][randomIndex];
    }
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
      error: handleError
    }
    $.ajax(ajaxOptions);
  }
  getPoems(query){
    this.mood = query;
    let search = "";
    if(presentationMode){
      let formattedQuery = {
        happy:"joy",
        sad:"funeral",
        chill:"relax",
        hype:"party",
        romantic:"love",
        motivated:"business"
      }
      search = formattedQuery[query];
    }
    else{
      let formattedQuery = {
        happy:["joy","happy","wonderful"],
        sad:["funeral","dead","sorrowful","sad"],
        chill:["relax","coffee"],
        hype:["party"],
        romantic:["love"],
        motivated:["business"]
      }
      let randomIndex = getRandomIndex(formattedQuery[query]);
      search = formattedQuery[query][randomIndex];
    }
    let url = "http://poetrydb.org/lines/"+search;
    let ajaxOptions = {
      url: url,
      method: 'get',
      dataType: 'json',
      success: this.poemSuccess,
      error: handleError
    }
    $.ajax(ajaxOptions);
  }
  newsDataSuccess(response){
    if(presentationMode){
      console.log('response articles:', response.articles);
      $(".article-title").empty();
      $(".article-author").empty();
      let article1;
      let article2;
      let article3;
      let article4;
      let article5;
      let articleTitle1;
      let articleTitle2;
      let articleTitle3;
      let articleTitle4;
      let articleTitle5;
      switch(this.mood){
        case "happy":
          article1 = response.articles[7];
          this.articles.push(article1);
          articleTitle1 = $("<p>").addClass("text newsfeed-title neon-text").text(article1.title);
          articleTitle1.on("click",this.handleTitleClick);
          $(".news-feed").append(articleTitle1);
          break;
        case "sad":
          article1 = response.articles[7];
          this.articles.push(article1);
          articleTitle1 = $("<p>").addClass("text newsfeed-title neon-text").text(article1.title);
          articleTitle1.on("click",this.handleTitleClick);
          $(".news-feed").append(articleTitle1);
          article2 = response.articles[7];
          this.articles.push(article2);
          articleTitle2 = $("<p>").addClass("text newsfeed-title neon-text").text(article2.title);
          articleTitle2.on("click",this.handleTitleClick);
          $(".news-feed").append(articleTitle1);
          article3 = response.articles[7];
          this.articles.push(article3);
          articleTitle3 = $("<p>").addClass("text newsfeed-title neon-text").text(article3.title);
          articleTitle3.on("click",this.handleTitleClick);
          $(".news-feed").append(articleTitle1);
          article4 = response.articles[7];
          this.articles.push(article1);
          articleTitle4 = $("<p>").addClass("text newsfeed-title neon-text").text(article4.title);
          articleTitle4.on("click",this.handleTitleClick);
          $(".news-feed").append(articleTitle1);
          article5 = response.articles[7];
          this.articles.push(article1);
          articleTitle5 = $("<p>").addClass("text newsfeed-title neon-text").text(article5.title);
          articleTitle5.on("click",this.handleTitleClick);
          $(".news-feed").append(articleTitle1);
          break;
        case "chill":
          break;
        case "hype":
          break;
        case "romantic":
          break;
        case "motivated":
      }


    }
    else{
      console.log('response article:', response.articles[0]);
      $(".article-title").empty();
      $(".article-author").empty();
      let randomIndex;
      let counter = 0;
      while(response.articles.length > 0 && counter < 5){
        randomIndex = getRandomIndex(response.articles);
        let article = response.articles.splice(randomIndex,1)[0];
        if(article.content){
          this.articles.push(article);
          let articleTitle = $("<p>").addClass("text newsfeed-title neon-text").text(article.title);
          articleTitle.on("click",this.handleTitleClick);
          $(".news-feed").append(articleTitle);
          counter++;
        }
        else{
        }
      }
    }
  }
  poemSuccess(response){
    $(".poem-title").empty();
    $(".poem-author").empty();
    console.log("poems:",response);
    this.poems = response;
    let randomIndex = getRandomIndex(response);
    var poemTitle = $("<h1>").addClass("neon-text").text(response[randomIndex].title);
    var poemAuthor = $("<h2>").addClass("neon-text").text("- Author: "+response[randomIndex].author+ " -" )
    $(".poem-title").append(poemTitle);
    $(".poem-author").append(poemAuthor);
    for(let line of response[randomIndex].lines){
      let poemline = $("<p>").addClass("neon-text").text(line);
      $(".poem-text").append(poemline);
    }
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
   let row1 = $("<div>");
   let row2 = $("<div>");
   let row3 = $("<div>");
   let row4 = $("<div>");
   let row7 = $("<div>");
   let titleHeader = $("<h1>").addClass("neon-text").text(chosenArticle.title);
   let textParagraph = $("<p>").addClass("article-preview neon-text").text(formattedText);
   let authorHeader = $("<h2>").addClass("neon-text").text("Author: "+chosenArticle.author);
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
   let newsfeedHeader = $("<h1>").addClass("neon-text").text("News Feed");
   let newsfeedContainer = $("<div>").addClass("news-feed-container");
   let row5 = $("<div>");
   let row6 = $("<div>");
   newsfeedTitle.append(newsfeedHeader);
   row5.append(newsfeedTitle);
   row6.append(newsfeed);
   newsfeedContainer.append(row5).append(row6);
   $(".section2").append(newsfeedContainer);
 }
 handleNewsfeedButton(){
   $(".section2").empty();
   let newsfeed = $("<div>").addClass("news-feed");
   let newsfeedTitle = $("<div>").addClass("news-feed-title");
   let newsfeedHeader = $("<h1>").addClass("neon-text").text("News Feed");
   let newsfeedContainer = $("<div>").addClass("news-feed-container");
   let row5 = $("<div>");
   let row6 = $("<div>");
   newsfeedTitle.append(newsfeedHeader);
   row5.append(newsfeedTitle);
   row6.append(newsfeed);
   newsfeedContainer.append(row5).append(row6);
   $(".section2").append(newsfeedContainer);

   for(let article of this.articles){
     let articleTitle = $("<p>").addClass("text newsfeed-title neon-text").text(article.title);
     articleTitle.on("click",this.handleTitleClick);
     $(".news-feed").append(articleTitle);
   }
 }
}
