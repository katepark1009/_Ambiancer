let presentationMode = true;
function getRandomIndex(arr){
  return Math.floor(Math.random()*arr.length);
}
function handleError(response){
  $("#error-modal").modal("show");
}
