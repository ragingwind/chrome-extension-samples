function changeImagesToGrey() {
  var images = document.querySelectorAll('img');

  for (var i = 0; i < images.length; ++i) {
    images[i].setAttribute('style', '-webkit-filter:grayscale(100%)');
  };
}
