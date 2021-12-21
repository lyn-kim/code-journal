/* global data */
/* exported data */

// Listen for 'input' events on the photoUrl input
// to update the src attribute of the photo preview
// when the input value changes.

var imageUrlInput = document.querySelector('#img-url');
var preview = document.querySelector('#preview');
imageUrlInput.addEventListener('input', displayImg);

function displayImg(event) {
  preview.src = event.target.value;
}
