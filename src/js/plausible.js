// Handle link events - those that have data-analytics
let elements = document.querySelectorAll("a[data-analytics]");
registerAnalyticsEvents(elements, handleLinkEvent);

// Handle button form events - those that have data-analytics
elements = document.querySelectorAll("button[data-analytics]");
registerAnalyticsEvents(elements, handleFormEvent);
/**
* Iterate Elements and add event listener
*
* @param {NodeList} Array of elements
* @param {string} callback function name
*/
function registerAnalyticsEvents(elements, callback) {
  for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', callback);
      elements[i].addEventListener('auxclick', callback);
  }
}
/**
* Handle Link Events with plausible
* https://github.com/plausible/analytics/blob/e1bb4368460ebb3a0bb86151b143176797b686cc/tracker/src/plausible.js#L74
*
* @param {Event} click
*/
function handleLinkEvent(event) {
  var link = event.target;
  var middle = event.type == "auxclick" && event.which == 2;
  var click = event.type == "click";
  while (link && (typeof link.tagName == 'undefined' || link.tagName.toLowerCase() != 'a' || !link.href)) {
      link = link.parentNode;
  }

  if (middle || click)
      registerEvent(link.getAttribute('data-analytics'));

  // Delay navigation so that Plausible is notified of the click
  if (!link.target) {
      if (!(event.ctrlKey || event.metaKey || event.shiftKey) && click) {
          setTimeout(function () {
              location.href = link.href;
          }, 150);
          event.preventDefault();
      }
  }
}
/**
* Handle form button submit events with plausible
*
* @param {Event} click
*/
function handleFormEvent(event) {
  event.preventDefault();

  registerEvent(event.target.getAttribute('data-analytics'));

  setTimeout(function () {
      event.target.form.submit();
  }, 150);
}
/**
* Parse data and call plausible
* Using data attribute in html eg. data-analytics='"Register", {"props":{"plan":"Starter"}}'
*
* @param {string} data - plausible event "Register", {"props":{"plan":"Starter"}}
*/
function registerEvent(data) {
  // break into array
  let attributes = data.split(/,(.+)/);

  // Parse it to object
  let events = [JSON.parse(attributes[0]), JSON.parse(attributes[1] || '{}')];

  plausible(...events);
}
