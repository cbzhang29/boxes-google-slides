//var slidesID = "1AfEZ6gvrFr0OMSNkQwviB-5WDLjcm76rzD5pzY2xso8";
var slidesTypeID = "14aEfz965efR4plWKCcUiN-GuGSSOCCe5PgSgN7_6ojs"
var sheetsID = "102Y5zBPWQyanMzZy6Cvz5BOvFqOxhHQfAOTz6XZmtQQ";
var word_arr = [];
var x = 127; //roughly x width of slide is 720  // type 2 x:127 y:110  pt.2 = x: 127 y:252
var y = 108; //roughly y height of slide is 405
var letter = 'íóáé¡!"#$%&\'()*+,-./0123456789:;<=>¿?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~–‘’“”'; // a space is 5
var pixels = [3,10.5,10.5, 10.5, 5, 5, 6, 11, 10.5, 16, 12, 3, // á,é, ,!,",#,$,%,&,\   11 characters
             6, 6, 7, 11, 5, 6, 5, 5, 10, 10, //()*+,-./01    10 characters
             10, 10, 10, 10, 10, 10, 10, 10, 5, 5,// 23456789:;    10 characters
             11, 11, 11, 10, 10, 18, 12, 12, 13, 13, //18 is the @    10 characters
             12, 11, 14, 13, 5, 9, 12, 10, 15, 13, // 5 is the I    10 characters
             14, 12, 14, 13, 12, 11, 13, 12, 17, 12, //          10 characters
             12, 11, 5, 5, 5, 8, 10, 6, 10, 10, //        10 characters
             9, 10, 10, 6, 10, 9, 3, 4, 9, 4, //  6 is f        10 characters
             15, 10, 10, 10, 10, 6, 9, 5, 10, 9,//        10 characters
             13, 9, 9, 9, 6, 5, 5, 11,10,4, //       10 characters
             4,6,6.5] //    3 char
function test_types(){
  //x = 31.5; y = 100;
  logProductInfo();
  var presentation = Slides.Presentations.get(slidesTypeID);
  var slides = presentation.slides;
  var pageID = slides[5].objectId;
  //var text = word_arr[0]; //whole sentence
  //Logger.log("Text: " + text);
  addRectangle(slidesTypeID, pageID, 8);
//  var substrings = text.split(' ');
//  
//  for(var i = 0; i < substrings.length; i++){
//    var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
//    addRectangle(slidesTypeID, pageID, wordlength);
//    x = x + wordlength + 5;
////  var wordlength = pixel(substrings[1]); //gets the lengths of each word //words is an array of the wordlengths
////    addRectangle(slidesTypeID, pageID, wordlength);
////    x = x + wordlength + 4.5;
//  
//  }
}

function addProduct() {
  var sheet = SpreadsheetApp.getActiveSheet();
  for(var i = 0; i < pixels.length; i++){
    sheet.appendRow([letter[i], pixels[i]]);
  }
}

function type1_test(){
  x = 360; y = 283; //y should always be 283
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides;
  var pageID = slides[2].objectId;
  addRectangle(slidesTypeID, pageID, 10);
  
}

function type2_test(){
  logProductInfo(); //should add all sentences to word_arr (array);
  Logger.log(word_arr);
  var presentation = Slides.Presentations.get(slidesTypeID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  //for(var i = 0; i < word_arr.length;i++){ //word_arr.length = # of sentences
  //if type 2:
  x = 127; y = 110;
  var pageID = slides[4].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
      //}  
    }
  }
    x=127
    y = 253;
    //i++;
    //round two
    var pageID = slides[4].objectId;     
    var text = word_arr[1]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
    
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
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
  x = 127; y = 78;
  var pageID = slides[6].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
      //}  
    }
  }
    x=127
    y = 182;
    //i++;
    //round two
    var pageID = slides[6].objectId;     
    var text = word_arr[1]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
    
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
      //}  
    }
  }
  x=127
    y = 286;
    //i++;
    //round two
    var pageID = slides[6].objectId;     
    var text = word_arr[2]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
    
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
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
  x = 127; y = 52;
  var pageID = slides[9].objectId; //get the pageID of the slide
    //addTextBox(slidesID, pageID, word_arr[i]); //add text to slide
  var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
      //}  
    }
  }
    x= 127
    y = 139;
    //i++;
    //round two
    var pageID = slides[9].objectId;     
    var text = word_arr[1]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
    
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
      //}  
    }
  }
  x=127
    y = 225;
    //i++;
    //round two
    var pageID = slides[9].objectId;     
    var text = word_arr[2]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
    
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
      //}  
    }
  }
  x = 127
    y = 312;
    //i++;
    //round two
    var pageID = slides[9].objectId;     
    var text = word_arr[3]; 
    //var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');

  for(var i = 0; i < substrings.length; i++){
    Logger.log("Substring " + i + ": " + substrings[i]);
    if(substrings[i].startsWith('¡') || substrings[i].startsWith("¿")|| substrings[i].startsWith("“") || substrings[i].startsWith("/")){
      var temp = substrings[i];
      Logger.log("Start char: " + temp[0]);
      x = x + pixels[letter.indexOf(temp[0])];
      if (temp[1] == '¡' || temp[1] == "¿"){
        x = x + pixels[letter.indexOf(temp[1])];
      }
    
      if (substrings[i].endsWith("!") || substrings[i].endsWith("?") ||substrings[i].endsWith(",") ||substrings[i].endsWith("”") ||substrings[i].endsWith(".")){
        var p = substrings[i].charAt(substrings[i].length-1); //p is the last character
        var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths

        addRectangle(slidesTypeID, pageID, wordlength);
        
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }   
      }
      else{
        var new_text = removePunctuation(substrings[i]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesTypeID, pageID, wordlength);
        x = x + wordlength + 5;
      }
    }
    else if (substrings[i].endsWith("?") || substrings[i].endsWith("!") || substrings[i].endsWith(",") || substrings[i].endsWith("”")){
      var p = substrings[i].charAt(substrings[i].length-1);
      var q = substrings[i].charAt(substrings[i].length-2); // q is the second to last character

      Logger.log("End char: " + p);
      var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
      //Logger.log("Wordlength: " + wordlength);
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
      if(q == "!" || q == "?" || q == "." || q == ","){
        Logger.log("2nd to last: " + q);
        x = x + pixels[letter.indexOf(q)];
      }
    }
    else{
      //var new_text = removePunctuation(substrings[i]);
      var wordlength = pixel(substrings[i]); //gets the lengths of each word //words is an array of the wordlengths
      //if type 2:
      //for(var j = 0; j<wordlength.length; j++){
      addRectangle(slidesTypeID, pageID, wordlength);
      x = x + wordlength + 5;
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
  //for (var i = 1; i < data.length; i++) {
   // Logger.log('Product name: ' + data[i][0]); //row i col 1 (A)
    //Logger.log(data[i][0]); //row i col 2 (B) //right now this one has the spanish sentences//
 //word_arr.push(data[0][0]);
   //word_arr.push(data[1][0]);
  //word_arr.push(data[4][1]);
   // word_arr.push(data[i][0]);
  word_arr.push(data[2][0]);
  }
//}
function pixel(input){ //input is the word
  Logger.log("Input: " + input);
  Logger.log("Word length (# of letters): " + input.length);

  //var punctuation = '!"#$%&\'()*+,-./:;<=>¿?@[\\]^_`{|}~';
  //var totals = [];
  var total = 0;
  for(var j = 0; j< input.length; j++){
    //Logger.log("round " + j);
    var text = input[j];
    //Logger.log("Letter: " + text);
   // Logger.log("Letter length: " + pixel[letter.indexOf(text)]);
    //for (var i = 0; i < text.length; i++) {
      total = total + pixels[letter.indexOf(text)];
    //}  
  }
  //totals.push(total);
  //Logger.log(letter.length);
  //Logger.log(pixel.length);
  return total;
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