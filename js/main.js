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
  buttonSave();
  singleEntry.innerHTML = '';
  loadEntry();
}

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
window.addEventListener('DOMContentLoaded', loadEntry);

function loadEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    singleEntry.appendChild(getEntry(data.entries[i]));
  }
  checkEmptyList();
}

var noEntryMsg = document.querySelector('.message');
function checkEmptyList() {
  if (data.entries.length === 0) {
    noEntryMsg.className = 'message';
  } else {
    noEntryMsg.className = 'message hidden';
  }
}

var newButton = document.querySelector('.new-button');
newButton.addEventListener('click', buttonNew);

function buttonNew() {
  event.preventDefault();
  showEntryForm('entry-form');
}

var $views = document.querySelectorAll('div[data-view]');

function showEntryForm(dataView) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === dataView) {
      $views[i].className = 'row';
    } else {
      $views[i].className = 'row hidden';
    }
  }
}

function buttonSave() {
  showEntries('entries');
}

function showEntries(dataView) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === dataView) {
      $views[i].className = 'row';
    } else {
      $views[i].className = 'row hidden';
    }
  }
}

var navEntryButton = document.querySelector('.nav-entries');
navEntryButton.addEventListener('click', goToEntries);
function goToEntries() {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === 'entry-form') {
      $views[i].className = 'row hidden';
    } else {
      $views[i].className = 'row';
    }
  }
}
