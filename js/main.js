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
  var editing = data.editing;

  var inputs = {
    title: title,
    url: url,
    notes: notes
  };

  if (editing !== null) {
    inputs.entryId = editing.entryId;
  } else {
    inputs.entryId = data.nextEntryId++;
  }

  preview.src = defaultSrc;
  entryForm.reset();
  buttonSave();

  if (editing === null) {
    singleEntry.prepend(generateDom(inputs));
    data.entries.unshift(inputs);
  } else {
    var existingEntry = document.querySelector('[data-entry-id="' + editing.entryId + '"]');
    existingEntry.replaceWith(generateDom(inputs));
    var entryIndex = data.entries.findIndex(function (entry) {
      return entry.entryId === editing.entryId;
    });
    data.entries[entryIndex] = inputs;
  }
  checkEmptyList();
}

function generateDom(entry) {
  var listItem = document.createElement('li');
  listItem.className = 'row single-entry';

  var specificID = entry.entryId;
  listItem.setAttribute('data-entry-id', specificID);

  var columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  listItem.appendChild(columnHalf);

  var entryImg = document.createElement('img');
  entryImg.className = 'entry-image';
  entryImg.src = entry.url;
  columnHalf.appendChild(entryImg);

  columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  listItem.appendChild(columnHalf);

  var entryTitle = document.createElement('h2');
  var titleText = document.createTextNode(entry.title);
  entryTitle.appendChild(titleText);
  entryTitle.className = 'no-margin-top flex';
  columnHalf.appendChild(entryTitle);

  var icon = document.createElement('i');
  icon.className = 'fas fa-pen margin-left-auto';
  entryTitle.appendChild(icon);

  var entryText = document.createElement('p');
  var noteInput = document.createTextNode(entry.notes);
  entryText.appendChild(noteInput);
  entryText.className = 'entry-text';
  columnHalf.appendChild(entryText);

  return listItem;
}

var singleEntry = document.querySelector('.list');
window.addEventListener('DOMContentLoaded', loadEntry);

function loadEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    singleEntry.appendChild(generateDom(data.entries[i]));
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

var $views = document.querySelectorAll('div[data-view]');

var newButton = document.querySelector('.new-button');
newButton.addEventListener('click', buttonNew);

function buttonNew() {
  entryForm.reset();
  data.editing = null;
  hideDeleteButton(event);
  switchView('entry-form');
}

function buttonSave() {
  switchView('entries');
}

function switchView(dataView) {
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
  switchView('entries');
}

function switchToEditEntries() {
  switchView('entry-form');
}

var clickToEdit = document.querySelector('ul');
clickToEdit.addEventListener('click', editButton);

function editButton(event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  for (var i = 0; i < data.entries.length; i++) {
    var parentElement = event.target.closest('li');
    var specificId = parentElement.getAttribute('data-entry-id');
    var specificIdNumber = parseInt(specificId);
    if (data.entries[i].entryId === specificIdNumber) {
      switchToEditEntries();
      data.editing = data.entries[i];

      var editEntriesTitle = document.getElementById('editEntry');
      editEntriesTitle.textContent = 'Edit Entries';

      var entryTitle = document.getElementById('entryTitle');
      entryTitle.value = data.editing.title;

      var imgUrl = document.getElementById('img-url');
      imgUrl.value = data.editing.url;

      var notes = document.getElementById('notes');
      notes.value = data.editing.notes;
    }
  }
  showDeleteButton();
}

var deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', showDeleteButton);

function showDeleteButton(event) {
  deleteButton.className = 'delete-button';
}

function hideDeleteButton(event) {
  deleteButton.className = 'delete-button hidden';
}

var modalView = document.getElementById('modal-view');

deleteButton.addEventListener('click', showModal);
function showModal(event) {
  modalView.className = 'row';
}

var cancelButton = document.querySelector('.cancel-btn');
cancelButton.addEventListener('click', switchToEditEntries);

var confirmButton = document.querySelector('.confirm-btn');
confirmButton.addEventListener('click', deleteEntryFromDom);
function deleteEntryFromDom(event) {

  var editing = data.editing;
  if (editing !== null) {
    var entryIndex = data.entries.findIndex(function (entry) {
      return entry.entryId === editing.entryId;
    });
    data.entries.splice(entryIndex, 1);
  }

  data.editing = null;
  goToEntries();
}
