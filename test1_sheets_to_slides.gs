//var slidesID = "1AfEZ6gvrFr0OMSNkQwviB-5WDLjcm76rzD5pzY2xso8";
var slidesTypeID = "14aEfz965efR4plWKCcUiN-GuGSSOCCe5PgSgN7_6ojs"
var sheetsID = "102Y5zBPWQyanMzZy6Cvz5BOvFqOxhHQfAOTz6XZmtQQ";
var word_arr = []; //sentences
var type_arr = []; //types
var page_arr = []; //page num

var x = 125.5; //roughly x width of slide is 720  // type 2 x:127 y:110  pt.2 = x: 127 y:252
var y = 108; //roughly y height of slide is 405
var len = 9.34;
//var space = 10;

function main1(){
  logProductInfo(); // three arrays: word_arr, type_arr, page_arr; should all be the same length
  Logger.log("Sent: " + word_arr);
  Logger.log("Type: " + type_arr);
  Logger.log("Page: " + page_arr);
  for(var z = 0; z < word_arr.length; z++){ 
    Logger.log("z = " + z);
    if (type_arr[z] == 1){
      type1_test(word_arr[z], page_arr[z]);
      Logger.log("Type 1 just ran.");
    }
    else if (type_arr[z] == 2){
      var sents_arr = [word_arr[z], word_arr[z+1]];
      type2_test(sents_arr, page_arr[z]);
      z++;
      Logger.log("Type 2 just ran.");
    }
    else if (type_arr[z] == 3){
      var sents_arr = [word_arr[z], word_arr[z+1], word_arr[z+2]];
      type3_test(sents_arr, page_arr[z]);
      z = z+2;
      Logger.log("Type 3 just ran.");
    }
    else if (type_arr[z] == 4){
      var sents_arr = [word_arr[z], word_arr[z+1], word_arr[z+2], word_arr[z+3]];
      type4_test(sents_arr, page_arr[z]);
      z = z+3;
      Logger.log("Type 4 just ran.");
    }
    else{
      Logger.log("Error at position " + z);
    }
  }
}
function test_types(){
  logProductInfo(); // three arrays: word_arr, type_arr, page_arr; should all be the same length
  Logger.log("Sent: " + word_arr);
  Logger.log("Type: " + type_arr);
  Logger.log("Page: " + page_arr);

}

function addProduct() {
  var sheet = SpreadsheetApp.getActiveSheet();
  for(var i = 0; i < pixels.length; i++){
    sheet.appendRow([letter[i], pixels[i]]);
  }
}

function type1_test(sentence, page){
  //x = 360; 
  y = 284; //y should always be 284 //x = 360 is the exact middle
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides;
  var pageID = slides[page-1].objectId;
  //addRectangle(slidesTypeID, pageID, 10);
  var text = sentence;
  var size = text.length*len;
  var mid = size/2;
  x = 360-mid;
  
  var substrings = text.split(' ');
  Logger.log(substrings);
  //var num_words = substrings.length;
  
  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else if(substrings[i].startsWith("/") && substrings[i].length == 1){
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      x = x + wordlength +len;
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
  
  
}

function type2_test(sentences, page){
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  //for(var i = 0; i < word_arr.length;i++){ //word_arr.length = # of sentences
  //if type 2:
  x = 125.5; y = 108;
  var pageID = slides[page-1].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = sentences[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
    x = 125.5;
    y = 251;
    //i++;
    //round two
    //var pageID = slides[4].objectId;     
    var text = sentences[1]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
     // Logger.log("Start char: " + temp[0]);
      x = x +len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x +len;
      }
    
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x +len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")||substrings[i].endsWith(".")){
      //Logger.log(substrings[i].length);
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text.length);
      var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len;; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
  //}
}

function type3_test(sentences, page){
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  //for(var i = 0; i < word_arr.length;i++){ //word_arr.length = # of sentences
  //if type 2:
  x = 125.5; y = 78;
  var pageID = slides[page-1].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = sentences[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
    x=125.5
    y = 182;
    //i++;
    //round two    
    var text = sentences[1]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
  x=127
    y = 286;
    //i++;
    //round two
    
    var text = sentences[2]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
}


function type4_test(sentences, page){
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  //for(var i = 0; i < word_arr.length;i++){ //word_arr.length = # of sentences
  //if type 2:
  x = 127; y = 52;
  var pageID = slides[page-1].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = sentences[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
    x= 125.5
    y = 139;
    //i++;
    //round two
       
    var text = sentences[1]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
  x= 125.5
  y = 225;
    //i++;
    //round two
      
    var text = sentences[2]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
  x = 125.5
    y = 312;
    //i++;
    //round two
   // var pageID = slides[10].objectId;     
    var text = sentences[3]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      //Logger.log("Start char: " + temp[0]);
      x = x + len;
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + len;
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        //var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        //Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text.length);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength +len +len; //should be + space + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + len;
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        Logger.log(new_text);
        var wordlength = new_text.length*len; //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength +len;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")||substrings[i].endsWith(".")){
      //var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      //Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      Logger.log(new_text);
      var wordlength = new_text.length*len;//gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len +len; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        //Logger.log("2nd to last: " + q);
        x = x +len;
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      Logger.log(substrings[i].length);
      var wordlength = substrings[i].length*len; //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength +len;
      //}  
    }
  }
}

function test(){ 
  var str = ["let's","do","it", "Yes"];
  for(var i = 0; i < str.length; i++){
    var text = str[i].split("").join(" ");
    var substrings = text.split(' ');
    for (var j = 0; j <substrings.length; j++){
      
    }
  }
  //pixel(str1_
}

/**
  * Creates a Slides API service object and logs the number of slides and
  * elements in a sample presentation:
  * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
  */

function logProductInfo() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
   // Logger.log('Product name: ' + data[i][0]); //row i col 1 (A)
    //Logger.log(data[i][0]); //row i col 2 (B) 
    word_arr.push(data[i][0]);
    type_arr.push(data[i][1]);
    page_arr.push(data[i][2]);
  }
}

/**
 * Add a new rectangle to a page.
 * @param {string} presentationId The presentation ID.
 * @param {string} pageId The page ID.
 */
function addRectangle(presentationId, pageId, length) {
  // You can specify the ID to use for elements you create,
  // as long as the ID is unique.
  var pageElementId = Utilities.getUuid();

  var requests = [{
    'createShape': {
      'objectId': pageElementId,
      'shapeType': 'ROUND_RECTANGLE',
      'elementProperties': {
        'pageObjectId': pageId,
        'size': {
          'width': {
            'magnitude': length,
            'unit': 'PT'
          },
          'height': {
            'magnitude': 20,
            'unit': 'PT'
          }
        },
        'transform': {
          'scaleX': 1,
          'scaleY': 1,
          'translateX': x,
          'translateY': y,
          'unit': 'PT'
        }
      }
    }
  }
  ];
  var response =
      Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
  //Logger.log('Created Textbox with ID: ' + response.replies[0].createShape.objectId);
}

/**
 * @see https://remarkablemark.org/blog/2019/09/28/javascript-remove-punctuation/
 */

var regex = /[!¡“#$%&'”()*+,/.:;<=>?¿@[\]^_`{|}~]/g;

/**
 * Removes punctuation.
 *
 * @param {string} string
 * @return {string}
 */
function removePunctuation(string) {
  var string1 = string.replace(regex, '');
  var final_string = string1.replace(/\s{2,}/g," ");
  return final_string
}
function testPunct(){
  var new_string = removePunctuation('¿Cómo? Yes, let’s / do it, “she own’s it” /  ¡No way! Saliga-smith.');
  Logger.log(new_string);
}