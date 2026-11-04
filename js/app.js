// ITCS333 A3 — vanilla to-do app (add, toggle, delete, filter, counter).
// One listener on #todo-list handles item clicks (event delegation).
(function () {
  'use strict';

  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var errorMsg = document.getElementById('error-msg');
  var list = document.getElementById('todo-list');
  var counter = document.getElementById('counter');
  var filterAll = document.getElementById('filter-all');
  var filterActive = document.getElementById('filter-active');
  var filterDone = document.getElementById('filter-done');

  var currentFilter = 'all';

  function updateCounter() {
    var left = 0;
    var children = list.children;
    var i;
    for (i = 0; i < children.length; i++) {
      if (!children[i].classList.contains('completed')) {
        left += 1;
      }
    }
    counter.textContent = left + (left === 1 ? ' item left' : ' items left');
  }

  function applyFilter() {
    var children = list.children;
    var i;
    var li;
    var done;
    var show;
    for (i = 0; i < children.length; i++) {
      li = children[i];
      done = li.classList.contains('completed');
      if (currentFilter === 'active') {
        show = !done;
      } else if (currentFilter === 'done') {
        show = done;
      } else {
        show = true;
      }
      li.style.display = show ? '' : 'none';
    }
  }

  function setFilter(name) {
    currentFilter = name;
    applyFilter();
  }

  function addItem(text) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    var button = document.createElement('button');

    span.className = 'item-text';
    span.textContent = text;

    button.type = 'button';
    button.className = 'delete-btn';
    button.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
    applyFilter();
    updateCounter();
  }

  form.addEventListener('submit', function (event) {
    var text;
    event.preventDefault();
    text = input.value.trim();
    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');
    addItem(text);
    input.value = '';
  });

  list.addEventListener('click', function (event) {
    var target = event.target;
    var deleteBtn;
    var itemText;
    var li;

    if (!target || !target.closest) {
      return;
    }

    deleteBtn = target.closest('.delete-btn');
    if (deleteBtn) {
      li = deleteBtn.closest('li');
      if (li) {
        li.remove();
        updateCounter();
      }
      return;
    }

    itemText = target.closest('.item-text');
    if (itemText) {
      li = itemText.closest('li');
      if (li) {
        li.classList.toggle('completed');
        applyFilter();
        updateCounter();
      }
    }
  });

  filterAll.addEventListener('click', function () {
    setFilter('all');
  });

  filterActive.addEventListener('click', function () {
    setFilter('active');
  });

  filterDone.addEventListener('click', function () {
    setFilter('done');
  });

  updateCounter();
})();
