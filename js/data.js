/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousInputJSON = localStorage.getItem('entry');
if (previousInputJSON !== null) {
  data = JSON.parse(previousInputJSON);
}

window.addEventListener('beforeunload', storeInput);

function storeInput(event) {
  var entryInputJSON = JSON.stringify(data);
  localStorage.setItem('entry', entryInputJSON);
}
