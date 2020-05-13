var word_arr = []; //sentences
var type_arr = []; //types
var page_arr = []; //page num

function logProductInfo() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 2; i < data.length; i++) {
   // Logger.log('Product name: ' + data[i][0]); //row i col 1 (A)
    //Logger.log(data[i][0]); //row i col 2 (B) 
    word_arr.push(data[i][3]);
    type_arr.push(data[i][7]);
    page_arr.push(data[i][8]);
  }
  Logger.log("sent: " + word_arr);
  Logger.log("types: " + type_arr);
  Logger.log("pages: " + page_arr);
  
  for(var j = 0; j< word_arr.length; j++){
    if (word_arr[j] == ''){
      j++;
    }
    else{
      Logger.log("text: " + word_arr[j]);
    }
//    if(type_arr[j] == ""){
//      j++;
//    }
//    else{
//      Logger.log("type: " + type_arr[j]);
//    }
//    if(page_arr[j] == ""){
//      j++;
//    }
//    else{
//      Logger.log("page: " + page_arr[j]);
//    }
  }
}