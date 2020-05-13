function logSlidesAndElements() {
  var presentationId = '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc';
  var presentation = Slides.Presentations.get(presentationId);
  var slides = presentation.slides;
  Logger.log('The presentation contains %s slides:', slides.length);
  for (i = 0; i < slides.length; i++) {
    Logger.log(
      '- Slide # %s contains %s elements.',
      i + 1,
      slides[i].pageElements.length);
  }
}

/**
 * Create a new slide.
 * @param {string} presentationId The presentation to add the slide to.
 */
function createSlide(presentationId, index) {
  // You can specify the ID to use for the slide, as long as it's unique.
  var pageId = Utilities.getUuid();

  var requests = [{
    'createSlide': {
      'objectId': pageId,
      'insertionIndex': index,
      'slideLayoutReference': {
        'predefinedLayout': 'TITLE_AND_BODY'
      }
    }
  }];
  var slide =
      Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
  //Logger.log('Created Slide with ID: ' + slide.replies[0].createSlide.objectId);
  return pageId;
}

function positionShape(array_words) { //works // positionShape(slide, x, y, width, height)
  var slide = SlidesApp.getActivePresentation().getSlides()[11];
  var x = 50;
  var y = 50;
  
  for (var i = 0; i < array_words.length; i++){
    //Logger.log(array_words[i]);
  var shape = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x,y,array_words[i],18);//left(x) top(y) width height
    x = x + array_words[i] + 15;
}
}

function getText(){ //have to pinpoint what text to get since it can't always be selected
  var selection = SlidesApp.getActivePresentation().getSelection();
  var selectionType = selection.getSelectionType();
  if (selectionType == SlidesApp.SelectionType.TEXT) {
    var textRange = selection.getTextRange();
    var text = textRange.asString();
    text = text.replace(/ /g, ""); 
    var substrings = text.split('/');
    return substrings; //an array of all the words in the sentence
    //Logger.log('Text selected: ' + textRange.asString() + ' Text length: ' + textRange.asString().length + " " + substrings);
  }
}



/**
 * Add a new text box with text to a page.
 * @param {string} presentationId The presentation ID.
 * @param {string} pageId The page ID.
 * @param {string} text The sentence to write
 */
//function addTextBox(presentationId, pageId, text) {
//  // You can specify the ID to use for elements you create,
//  // as long as the ID is unique.
//  var pageElementId = Utilities.getUuid();
//
//  var requests = [{
//    'createShape': {
//      'objectId': pageElementId,
//      'shapeType': 'TEXT_BOX',
//      'elementProperties': {
//        'pageObjectId': pageId,
//        'size': {
//          'width':  {
//            'magnitude': 150,
//            'unit': 'PT'
//          },
//          'height': {
//            'magnitude': 50,
//            'unit': 'PT'
//          }
//        },
//        'transform': {
//          'scaleX': 1,
//          'scaleY': 1,
//          'translateX': 200,
//          'translateY': 100,
//          'unit': 'PT'
//        }
//      }
//    }
//  }, 
//    {
//     'insertText': { //how to i make it 18 Arial
//       'objectId': pageElementId,
//       'text': text,
//       'insertionIndex': 0,
//       "style": {
//          "foregroundColor": {
//            "opaqueColor": {
//              "themeColor": "ACCENT5"
//            }
//          },
//          "bold": false,
//          "italic": false,
//          "underline": false,
//          "fontFamily": "Arial",
//          "fontSize": {
//            "magnitude": 18,
//            "unit": "PT"
//          }
//    
//     },
//        "textRange": {
//          "type": "ALL"
//                  }
//     }
//    } //var response =
//      //Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
//  //Logger.log('Created Textbox with ID: ' + response.replies[0].createShape.objectId);
//    ];
  
  //logProductInfo(); //should add all sentences to word_arr (array);
  //Logger.log(word_arr);
  //var id = getSlide(slidesTypeID);
  //addRectangle(slidesTypeID, id, 10);
  //var width = getSlideLength(slidesID);
  //Logger.log(width);
  //var presentation = Slides.Presentations.get(slidesType2ID);
  //var slides = presentation.slides;
  //var pageID = slides[7].objectId;
  //var arr = pixel("¿Cómo?");
  //Logger.log("Array: " + arr);
  //addRectangle(slidesType2ID, pageID, arr[0])
  //var len = pixel("!");
  //Logger.log(len);
  //¿Cómo? Yes, let’s / do it, “she own’s it” / ¡No way! Saliga-smith.
  
//  var str = "“¡Cómo!”";
//  var ind = str.search("“"); //returns index of punctuation
//  Logger.log("index: " + ind);
//  
//  if(str.startsWith("“")){
//     //check if question mark or exclamation
//    var check = str.search("¿" || "¡");
//    if (check != 1){
//      Logger.log("no additional punct");
//    }
//    else{
//      Logger.log("additional punct");
//    }
//  }
//  if(str.endsWith("“")){
//     //check if question mark or exclamation
//    var check = str.search("¿" || "¡");
//    if (check != 1){
//      Logger.log("no additional punct");
//    }
//    else{
//      Logger.log("additional punct");
//    }
//  }
  
  


function getSlide(presentationId){
  var presentation = Slides.Presentations.get(presentationId);
  var slides = presentation.slides;
  var slideID = slides[5].objectId;
  return slideID;
}