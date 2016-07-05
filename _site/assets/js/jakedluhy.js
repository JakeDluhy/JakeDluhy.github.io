$(document).ready(function() {
  $(".button-collapse").sideNav();
  $('nav a').addClass('waves-effect');

  var NUM_BACKGROUND_IMAGES = 21;
  var IMAGE_HEIGHT = 300;
  var NUM_HORIZONTAL = 6;

  var docHeight = parseInt($(document).height());
  var numVertical = Math.ceil(docHeight/IMAGE_HEIGHT);
  var totalImages = NUM_HORIZONTAL * numVertical;

  var imgArray = [];
  var numArrays = Math.ceil(totalImages / NUM_BACKGROUND_IMAGES);
  for(var i=0; i < numArrays; i++) {
    var tempImgArray = new Array(NUM_BACKGROUND_IMAGES);
    for(var j=0; j < tempImgArray.length; j++) {
      tempImgArray[j] = j;
    }
    shuffle(tempImgArray);

    imgArray = imgArray.concat(tempImgArray);
  }

  var $imgContainer = $('[image-container="true"]');
  if($imgContainer.length) {
    for(var k=0; k < totalImages; k++) {
      var bgImg = "bg_img_" + imgArray[k] + ".png";
      var tag = '<img src="/assets/images/bg_images/' + bgImg + '" class="background-image" />'

      $imgContainer.append(tag);
    }
  }
});

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}