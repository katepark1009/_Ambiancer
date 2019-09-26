class TextDataHandler{
  constructor(){
    this.articles = [];
    this.url = "";
    this.newsDataSuccess = this.newsDataSuccess.bind(this);
    this.poemSuccess = this.poemSuccess.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleNewsfeedButton = this.handleNewsfeedButton.bind(this);
    this.mood = "";
    this.newsResponse = [];
    this.poemResponse = [];
    this.keys = new ApiKeys();
  }
  getNewsData(query, day=30, month=4, year=2019){
    this.mood = query;
    let formattedDate = year+"-"+month+"-"+day;
    let search = "";
    if(presentationMode){
      let formattedQuery = {
        happy:"heartwarming",
        sad:"tragic",
        hype:"amazing",
        romantic:"infatuation",
        motivated:"workout"
      }
      search = formattedQuery[query];
    }
    else{
      let formattedQuery = {
        happy:["puppy","thanks"],
        sad:["dead","accident","tragic"],
        chill:["cafe","vacation"],
        hype:["party","intense"],
        romantic:["love"],
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
        apiKey: this.keys.news
      },
      success: this.newsDataSuccess,
      error: handleError
    }
    $.ajax(ajaxOptions);
  }
  getPoems(query){
    this.mood = query;
    let search = "";
    let ajaxOptions;
    let url = "";
    let title = "";
    let formattedQuery = {
      happy:"joy",
      sad:"funeral",
      chill:"coffee",
      hype:"amazing",
      romantic:"rose",
      motivated:"strength"
    }
    if(presentationMode){
      switch(query){
        case "happy":
          title = "the moon"
          break;
        case "sad":
          title = "on Two Lovers Struck Dead by Lightning";
          break;
        case "chill":
          title = "goodtime jesus";
          break;
        case "romantic":
          title = "love";
          break;
        case "hype":
          title = "o sun of real peace";
          break;
        case "motivated":
          title = "Cancelled Passage of the Ode to Liberty";
          break;
      }
      url = "http://poetrydb.org/title/"+title;
      ajaxOptions = {
        url: url,
        method: 'get',
        dataType: 'json',
        success: this.poemSuccess,
        error: handleError
      };
    }
    else{
      let randomIndex = getRandomIndex(formattedQuery[query]);
      search = formattedQuery[query][randomIndex];
      url = "http://poetrydb.org/lines/"+search;
      ajaxOptions = {
        url: url,
        method: 'get',
        dataType: 'json',
        success: this.poemSuccess,
        error: handleError
      };
    }
    $.ajax(ajaxOptions);
  }
  newsDataSuccess(response){
    this.newsResponse = response;
    if(presentationMode){
      $(".article-title").empty();
      $(".article-author").empty();
      let titlearr = [];
      switch(this.mood){
        case "happy":
          titlearr = [
            "Photographer Grey Hutton gives us a joyful glimpse into the Jewish festival of Purim",
            "How a Marvel fan made sure his blind friend enjoyed Avengers: Endgame is heartwarming",
            "Kids Who Beat Cancer Come Together for Annual Reunion — and Recreate a Stunning Photo from 2014",
            "Victoria Beckham Shares Sweet Tribute to David Beckham for His Birthday: 'You Are Our Everything'",
            "Heart Transplant Recipient, Donor's Family Meet at Cardinals-Reds Game"];
          break;
        case "sad":
          titlearr = [
            "Factbox - 'This is tragic': Environmental studies student, sportswriter among victims in North",
            "President Donald Trump falsely stated that doctors",
            "K.I. mourns 'tragic loss' after fire claims five lives - Tbnewswatch.com",
            "North Carolina police charge suspect with murder after college shooting",
            "Anti-Semitism in US remained at near-record high in 2018: ADL"];
          break;
        case "chill":
          titlearr = [
            "Chinese Astronomers Saw an Exploding Star 2,000 Years Ago. Scientists May Have Just Found the",
            "See plasma clouds burst out of this animated black hole",
            "This $400 air purifier clears my house of odors, vape clouds, and dust mites while barely making",
            "Snow in May? This week's top three weather videos",
            "Hubble spots giant 'buckyballs' jiggling like Jell-O in space"];
          break;
        case "hype":
          titlearr = [
            "How to Celebrate National Space Day",
            "What's on TV: 'Knock Down the House,' and 'Ingress: The Animation",
            "F. Gary Gray Is Working on a 'Saints Row' Movie Adaptation",
            "Amazing POV ride on the Yukon Striker coaster",
            "Islandeering: The woman walking on the edge of hidden islands"];
          break;
        case "romantic":
          titlearr = [
            "Why You Keep Getting Into Toxic Relationships (And How to Stop)",
            "50 Toxic Things Every Girl Should Stop Romanticizing About Love, Life, And Relationships",
            "Fiction: Love, Sex and Robots Collide in a New Ian McEwan Novel",
            "Theron and Rogen pair up for classier update on odd-couple rom-com",
            "Artist Jaime Hernandez reunites his ‘Love and Rockets’ women, but only loves one now"];
          break;
        case "motivated":
          titlearr = [
            "Hitting the gym makes esports athletes more successful",
            "Girl Boss editor-in-chief Neha Gandhi shares the soundtrack for her life",
            "4 steps to reclaim your weekend for fun instead of chores",
            "How successful CEOs start their mornings",
            "Yoga class while waiting for refills? CVS tests new "];
      }
      this.presentationTitles(titlearr);


    }
    else{
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
    $(".poem-text").empty();
    this.poemResponse = response;
    if(presentationMode){

      switch(this.mood){
        case "happy":
          this.displayPoem(16);
          break;
        case "romantic":
          this.displayPoem(2);
          break;
        default:
          this.displayPoem(0);
      }
    }
    else{
      let randomIndex = getRandomIndex(response);
      this.displayPoem(randomIndex);
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
   let titleHeader = $("<h1>").addClass("newstitle").text(chosenArticle.title);
   let textParagraph = $("<p>").addClass("article-preview neon-text").text(formattedText);
   let authorHeader = $("<h2>").addClass("neon-text").text("Author: "+chosenArticle.author);
   let articleAuthor = $("<div>").addClass("article-author").append(authorHeader);
   let articleInfo = $("<div>").addClass("mini-div article-info");
   let articleText = $("<div>").addClass("mini-div article-text").append(textParagraph);
   let articleTitle = $("<div>").addClass("article-title").append(titleHeader);
   let anchor = $("<a>").attr("target","_blank").attr("href",this.url).text("To the article");
   let articleButton = $("<button>").addClass("article-btn");
   let newsfeedButton = $("<button>").addClass("news-feed-btn").text("Back");
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
   $(".poem-title").empty();
   $(".poem-author").empty();
   $(".poem-text").empty();
   this.articles = [];
   let newsfeed = $("<div>").addClass("news-feed");
   let newsfeedTitle = $("<div>").addClass("news-feed-title");
   let newsfeedHeader = $("<h1>").addClass("neon-text newstitle").text("News Feed");
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
   let newsfeedHeader = $("<h1>").addClass("neon-text newstitle").text("News Feed");
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
  presentationTitle(index){
    let article1 = this.newsResponse.articles[index];
    this.articles.push(article1);
    let articleTitle1 = $("<p>").addClass("text newsfeed-title neon-text").text(article1.title);
    articleTitle1.on("click",this.handleTitleClick);
    $(".news-feed").append(articleTitle1);
  }
  presentationTitles(arr){
    for(let description of arr){
      for(let index = 0; index < this.newsResponse.articles.length; index++){
        if(this.newsResponse.articles[index].title.indexOf(description) > -1){
          this.presentationTitle(index);
          break;
        }
      }
    }
  }
  displayPoem(index){
    let poemTitle = $("<h1>").addClass("neon-text").text(this.poemResponse[index].title);
    let poemAuthor = $("<h2>").addClass("neon-text").text("- Author: "+this.poemResponse[index].author+ " -" );
    $(".poem-title").append(poemTitle);
    $(".poem-author").append(poemAuthor);
    for(let line of this.poemResponse[index].lines){
      let poemline = $("<p>").addClass("neon-text").text(line);
      $(".poem-text").append(poemline);
    }
  }
}
