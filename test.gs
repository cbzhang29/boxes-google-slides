var slidesType2ID = "1zMGLzfYM_y-KUggEWH6Pv9qhx69OTDyK2HA7mFrhwQ4";
var word_arr = [];
x = 0;
y = 0;
var letter = 'óáé¡!"#$%&\'()*+,-./0123456789:;<=>¿?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~–‘’“”'; // a space is 5
var pixels = [10,10, 10, 5, 5, 6, 11, 10, 16, 12, 3, // á,é, ,!,",#,$,%,&,\   11 characters
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
function type2(){
  logProductInfo(); //should add all sentences to word_arr (array);
  Logger.log(word_arr);
  var presentation = Slides.Presentations.get(slidesType2ID); //get the correct presentation
  var slides = presentation.slides; //get the slides from the presentation
  
  for(var i = 0; i < word_arr.length; i+2){ //word_arr.length = # of sentences
    var pageID = slides[i].objectId; //get the pageID of the i-th slide
    var text = word_arr[i]; //gets the sentence in the i position of the array
    
    var substrings = text.split(' ');
    Logger.log(substrings);
    
    x = 127; y = 110; // location 1st sentence
   
    for(var j = 0; j < substrings.length; j++){
      Logger.log("Substring " + i + ": " + substrings[j]);
      if(substrings[j].startsWith('¡') || substrings[j].startsWith("¿")|| substrings[j].startsWith("“") || substrings[j].startsWith("/")){
        var temp = substrings[j];
        Logger.log("Start char: " + temp[0]);
        x = x + pixels[letter.indexOf(temp[0])];
        if (temp[1] == '¡' || temp[1] == "¿"){
          x = x + pixels[letter.indexOf(temp[1])];
        }
    
        if (substrings[j].endsWith("!") || substrings[j].endsWith("?") ||substrings[j].endsWith(",") ||substrings[j].endsWith("”") ||substrings[j].endsWith(".")){
          var p = substrings[j].charAt(substrings[j].length-1); //p is the last character
          var q = substrings[j].charAt(substrings[j].length-2); // q is the second to last character
          Logger.log("End char: " + p);
          var new_text = removePunctuation(substrings[j]);
          var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
          
          addRectangle(slidesType2ID, pageID, wordlength);
        
          x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
          if(q == "!" || q == "?" || q == "." || q == ","){
            Logger.log("2nd to last: " + q);
            x = x + pixels[letter.indexOf(q)];
          }   
        }
        else{
          var new_text = removePunctuation(substrings[j]);
          var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
          //if type 2:
          //for(var j = 0; j<wordlength.length; j++){
          addRectangle(slidesType2ID, pageID, wordlength);
          x = x + wordlength + 5;
        }
      }
      else if (substrings[j].endsWith("?") || substrings[j].endsWith("!") || substrings[j].endsWith(",") || substrings[j].endsWith("”")){
        var p = substrings[j].charAt(substrings[j].length-1);
        var q = substrings[j].charAt(substrings[j].length-2); // q is the second to last character
        
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[j]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //Logger.log("Wordlength: " + wordlength);
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesType2ID, pageID, wordlength);
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }
      }
      else{
        //var new_text = removePunctuation(substrings[j]);
        var wordlength = pixel(substrings[j]); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesType2ID, pageID, wordlength);
        x = x + wordlength + 5;
        //}  
      }
    }
    
    x= 127 //restart
    y = 253; // second line/sentence
    //i++;
    //round two
    var k = i + 1;
    var pageID = slides[k].objectId;     
    var text = word_arr[k]; 
    Logger.log("text 2: " + text);
    var substrings = text.split(' ');
    
    Logger.log(substrings);
    
    for(var n = 0; n < substrings.length; n++){
      Logger.log("Substring " + n + ": " + substrings[n]);
      if(substrings[n].startsWith('¡') || substrings[n].startsWith("¿")|| substrings[n].startsWith("“") || substrings[n].startsWith("/")){
        var temp = substrings[n];
        Logger.log("Start char: " + temp[0]);
        x = x + pixels[letter.indexOf(temp[0])];
        if (temp[1] == '¡' || temp[1] == "¿"){
          x = x + pixels[letter.indexOf(temp[1])];
        }
        
        if (substrings[n].endsWith("!") || substrings[n].endsWith("?") ||substrings[n].endsWith(",") ||substrings[n].endsWith("”") ||substrings[n].endsWith(".")){
          var p = substrings[n].charAt(substrings[n].length-1); //p is the last character
          var q = substrings[n].charAt(substrings[n].length-2); // q is the second to last character
          Logger.log("End char: " + p);
          var new_text = removePunctuation(substrings[n]);
          var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
          
          addRectangle(slidesType2ID, pageID, wordlength);
          
          x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
          if(q == "!" || q == "?" || q == "." || q == ","){
            Logger.log("2nd to last: " + q);
            x = x + pixels[letter.indexOf(q)];
          }   
        }
        else{
          var new_text = removePunctuation(substrings[n]);
          var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
          //if type 2:
          //for(var j = 0; j<wordlength.length; j++){
          addRectangle(slidesType2ID, pageID, wordlength);
          x = x + wordlength + 5;
        }
      }
      else if (substrings[n].endsWith("?") || substrings[n].endsWith("!") || substrings[n].endsWith(",") || substrings[n].endsWith("”")){
        var p = substrings[n].charAt(substrings[n].length-1);
        var q = substrings[n].charAt(substrings[n].length-2); // q is the second to last character
        
        Logger.log("End char: " + p);
        var new_text = removePunctuation(substrings[n]);
        var wordlength = pixel(new_text); //gets the lengths of each word //words is an array of the wordlengths
        //Logger.log("Wordlength: " + wordlength);
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesType2ID, pageID, wordlength);
        x = x + wordlength + 5 + pixels[letter.indexOf(p)]; //should be + 5 + size of punctuation;
        if(q == "!" || q == "?" || q == "." || q == ","){
          Logger.log("2nd to last: " + q);
          x = x + pixels[letter.indexOf(q)];
        }
      }
      else{
        var wordlength = pixel(substrings[n]); //gets the lengths of each word //words is an array of the wordlengths
        //if type 2:
        //for(var j = 0; j<wordlength.length; j++){
        addRectangle(slidesType2ID, pageID, wordlength);
        x = x + wordlength + 5;
        //}  
      }
    }
  }
}
//line 1 is 100, line 2 is 125, line 3 is 150

function test2(){
  var presentation = Slides.Presentations.get(slidesType2ID);
  var slides = presentation.slides;
  var pageID = slides[0].objectId;
  
  addRectangle(slidesType2ID, pageID, 5);
  
}
//  
//
function myFunction() {
  //var text = 'óáé ¡!"#$%&\'()*+,-./0123456789:;<=>¿?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~–\n\r‘’“”';
  //text = text.split("").join(" ");
  //console.log(text);
  logProductInfo();
  //Logger.log("Array: " + word_arr);
  var presentation = Slides.Presentations.get(slidesType2ID);
  var slides = presentation.slides;
  var pageID = slides[0].objectId;
  var text = word_arr[0]; //whole sentence
  Logger.log("Text: " + text);
  
  var substrings = text.split(' ');
  
  for(var i = 0; i < substrings.length; i++){
    var wordlength = pixel(substrings[j]); //gets the lengths of each word //words is an array of the wordlengths
    addRectangle(slidesType2ID, pageID, wordlength);
    x = x + wordlength + 5;
  }
}

function logProductInfo() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    Logger.log("Sentence: " + data[i][1]); 
    word_arr.push(data[i][1]); //row i col 2 (index starts at 0) (B) //right now this one has the spanish sentences
 
  //word_arr.push(data[2][0]); //for Sheet25
  //word_arr.push(data[3][0]);
  //word_arr.push(data[4][0]);
  
  //word_arr.push(data[4][1]);
  }
  Logger.log(word_arr);
}

function pixel(input) { //input is the word
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