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

// Define a function that takes a single journal entry object
// and returns a DOM tree that matches one of the example entries in the HTML.

function getEntry(journal) {
  var listItem = document.createElement('li');
  listItem.className = 'row single-entry';

  var columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  listItem.appendChild(columnHalf);

  var entryImg = document.createElement('img');
  entryImg.className = 'entry-image';
  entryImg.src = journal.url;
  columnHalf.appendChild(entryImg);

  columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  listItem.appendChild(columnHalf);

  var entryTitle = document.createElement('h2');
  var titleText = document.createTextNode(journal.title);
  entryTitle.appendChild(titleText);
  entryTitle.className = 'no-margin-top';
  columnHalf.appendChild(entryTitle);

  var entryText = document.createElement('p');
  var noteInput = document.createTextNode(journal.notes);
  entryText.appendChild(noteInput);
  entryText.className = 'entry-text';
  columnHalf.appendChild(entryText);

  return listItem;
}

var singleEntry = document.querySelector('.list');
for (var i = 0; i < data.entries.length; i++) {
  singleEntry.appendChild(getEntry(data.entries[i]));
}
