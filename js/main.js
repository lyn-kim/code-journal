/* global data */
/* exported data */

var imageUrlInput = document.querySelector('#img-url');
var preview = document.querySelector('#preview');
var defaultSrc = preview.src;
imageUrlInput.addEventListener('input', displayImg);

function displayImg(event) {
  preview.src = event.target.value;
}

var entryForm = document.querySelector('#entry-form');
entryForm.addEventListener('submit', collectInput);

function collectInput(event) {
  event.preventDefault();
  var title = entryForm.elements.title.value;
  var url = entryForm.elements.url.value;
  var notes = entryForm.elements.notes.value;
  var inputs = {
    title: title,
    url: url,
    notes: notes,
    entryId: data.nextEntryId++
  };
  data.entries.unshift(inputs);
  preview.src = defaultSrc;
  entryForm.reset();
}

var previousInputJSON = localStorage.getItem('entry');
if (previousInputJSON !== null) {
  data.entries = JSON.parse(previousInputJSON);
  data.nextEntryId = parseInt(localStorage.getItem('entryId'), 10);
}

window.addEventListener('beforeunload', storeInput);

function storeInput(event) {
  var entryInputJSON = JSON.stringify(data.entries);
  localStorage.setItem('entry', entryInputJSON);
  localStorage.setItem('entryId', data.nextEntryId.toString());
  // console.log(data.nextEntryId);
}
