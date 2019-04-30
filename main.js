$(document).ready(onload);

function onload(){
  getNewsData();
  getPoem("happy");
  $(".happy").on("click",switchToAmbience);
  
  var images = new Images();
  images.getImages();
}
function getNewsData(){
  ajaxOptions = {
    url: 'https://newsapi.org/v2/everything',
    method: 'get',
    dataType: 'json',
    data:{
      q: "puppy",
      from: "2019-04-30",
      sortBy: "popularity",
      apiKey: "5e6556e5beed49609afc392ff37eb5b6"
    },
    success: newsDataSuccess,
    error: function(){ console.log("An error happened.")}
  }
  $.ajax(ajaxOptions);
}
function getPoem(query){
  var url = "http://poetrydb.org/lines/"+query
  ajaxOptions = {
    url: url,
    method: 'get',
    dataType: 'json',
    success: poemSuccess,
    error: function(){ console.log("An error happened.")}
  }
  $.ajax(ajaxOptions);
}
function newsDataSuccess(response){
  console.log(response);
  for(var article of response.articles){
    // var title = $("<div>").text(article.title);
    // $("body").append(title);
  }
}
function poemSuccess(response){
  console.log(response);
}
function switchToAmbience(){
  $(".home-screen").hide();
}
