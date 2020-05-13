//var slidesID = "1AfEZ6gvrFr0OMSNkQwviB-5WDLjcm76rzD5pzY2xso8";
var slidesTypeID = "14aEfz965efR4plWKCcUiN-GuGSSOCCe5PgSgN7_6ojs"
var sheetsID = "102Y5zBPWQyanMzZy6Cvz5BOvFqOxhHQfAOTz6XZmtQQ";
var word_arr = [];
var x = 125.5; //roughly x width of slide is 720  // type 2 x:127 y:110  pt.2 = x: 127 y:252
var y = 108; //roughly y height of slide is 405
var x2 = 0; //x coordinate for text box
var y2 = 0; //y coordinate for text box
var pad = 7; //padding is 7
var len = 9.34;
//var space = 10;

function test_types(){
  logProductInfo();
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides;
  var pageID = slides[10].objectId;
  
  var text = word_arr[0]; //entire sentence
  x2 = x-pad; //starting point of text box
  y2 = 52-pad;
  //y2 = 78-pad; // type 3
  //y2 = y-7; //type2
  var elementId = addTextBox(slidesTypeID, pageID, 700,text);
  //var x2 = 0;
  formatShapeText(slidesTypeID, elementId);
  
  text = word_arr[1];
  //y2 = 251-pad; //type 2
  //y2 = 182-pad; //type 3
  y2 = 139-pad;
  elementId = addTextBox(slidesTypeID, pageID, 700, text);
  formatShapeText(slidesTypeID, elementId);
  
  text = word_arr[2];
  //y2 = 286-pad;//type3
  y2 = 225-pad;
  elementId = addTextBox(slidesTypeID, pageID, 700, text);
  formatShapeText(slidesTypeID, elementId);
  
  text = word_arr[3];
  y2 = 312-pad;//type4
  elementId = addTextBox(slidesTypeID, pageID, 700, text);
  formatShapeText(slidesTypeID, elementId);
}

function addProduct() {
  var sheet = SpreadsheetApp.getActiveSheet();
  for(var i = 0; i < pixels.length; i++){
    sheet.appendRow([letter[i], pixels[i]]);
  }
}

function type1_test(){
  //x = 360; 
  y = 284; //y should always be 284 for the boxes //x = 360 is the exact middle
  y2 = 275;
  logProductInfo();
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides;
  var pageID = slides[3].objectId;
  //addRectangle(slidesTypeID, pageID, 10);
  var text = word_arr[0]; //entire sentence
 
  var size = text.length*len;
  var mid = size/2;
  x = 360-mid; //starting point of boxes
  x2 = 360-mid-7;
  x2 = 360-mid-7; //starting point of text box
  var elementId = addTextBox(slidesTypeID, pageID, 720,text);

  formatShapeText(slidesTypeID, elementId);
  
  var text2 = word_arr[1];
  size = text2.length*len;
  mid = size/2;
  x2 = 360-mid-7;
  y2 = 300;
  elementId = addTextBox(slidesTypeID, pageID, 720, text2);
  formatShapeText(slidesTypeID, elementId);
  
//  var elementId = addTextBox(slidesTypeID, pageID, 720,text);
//  //var x2 = 0;
//  formatShapeText(slidesTypeID, elementId);
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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

function type2_test(){
  logProductInfo(); //should add all sentences to word_arr (array);
  Logger.log(word_arr);
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  //for(var i = 0; i < word_arr.length;i++){ //word_arr.length = # of sentences
  //if type 2:
  x = 125.5; y = 108;
  var pageID = slides[6].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = word_arr[0]; //whole sentence
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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
    var text = word_arr[1]; 
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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

function type3_test(){
  logProductInfo(); //should add all sentences to word_arr (array);
  Logger.log(word_arr);
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  //for(var i = 0; i < word_arr.length;i++){ //word_arr.length = # of sentences
  //if type 2:
  x = 125.5; y = 78;
  var pageID = slides[8].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = word_arr[0]; //whole sentence
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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
    var text = word_arr[1]; 
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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
    y = 286;
    //i++;
    //round two
    
    var text = word_arr[2]; 
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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


function type4_test(){
  logProductInfo(); //should add all sentences to word_arr (array);
  Logger.log(word_arr);
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  //for(var i = 0; i < word_arr.length;i++){ //word_arr.length = # of sentences
  //if type 2:
  x = 125.5; y = 52;
  var pageID = slides[10].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = word_arr[0]; //whole sentence
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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
       
    var text = word_arr[1]; 
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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
      
    var text = word_arr[2]; 
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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
    var pageID = slides[10].objectId;     
    var text = word_arr[3]; 
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
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
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
    //Logger.log(data[i][0]); //row i col 2 (B) //right now this one has the spanish sentences//
 //word_arr.push(data[0][0]);
   //word_arr.push(data[1][0]);
  //word_arr.push(data[4][1]);
    word_arr.push(data[i][0]);
  //word_arr.push(data[2][0]);
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
/**
 * Add a new text box with text to a page.
 * @param {string} presentationId The presentation ID.
 * @param {string} pageId The page ID.
 */
function addTextBox(presentationId, pageId, length, text) {
  // You can specify the ID to use for elements you create,
  // as long as the ID is unique.
  var pageElementId = Utilities.getUuid();

  var requests = [{
    'createShape': {
      'objectId': pageElementId,
      'shapeType': 'TEXT_BOX',
      'elementProperties': {
        'pageObjectId': pageId,
        'size': {
          'width': {
            'magnitude': length,
            'unit': 'PT'
          },
          'height': {
            'magnitude': 30,
            'unit': 'PT'
          }
        },
        'transform': {
          'scaleX': 1,
          'scaleY': 1,
          'translateX': x2,
          'translateY': y2,
          'unit': 'PT'
        }
      }
    }
  }, {
    'insertText': {
      'objectId': pageElementId,
      'text': text,
      'insertionIndex': 0
    }
  }];
  var response =
      Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
  Logger.log('Created Textbox with ID: ' +
      response.replies[0].createShape.objectId);
  return pageElementId;
}
                                             
/**
 * Format the text in a shape.
 * @param {string} presentationId The presentation ID.
 * @param {string} shapeId The shape ID.
 */
function formatShapeText(presentationId, shapeId) {
  var requests = [{
    'updateTextStyle': {
      'objectId': shapeId,
      'fields': 'foregroundColor,bold,italic,fontFamily,fontSize,underline',
      'style': {
        'foregroundColor': {
          'opaqueColor': {
            'themeColor': 'DARK1'
          }
        },
        'bold': false,
        'italic': false,
        'underline': false,
        'fontFamily': 'Consolas',
        'fontSize': {
          'magnitude': 17,
          'unit': 'PT'
        }
      },
      'textRange': {
        'type': 'ALL'
      }
    }
  }];
  var response =
      Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
}                