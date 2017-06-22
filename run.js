function renderList(array)  {
  list = document.createElement('ul');
  for (var i = 0; i < Math.min(array.length, 4); i++) {
    var item = document.createElement('li');
    var hr = document.createElement('hr')
    var link = document.createElement('a');
    link.textContent = array[i].title;
    link.href = array[i].url;
    link.setAttribute('target', '_blank');
    item.appendChild(link);
    list.appendChild(item);
    list.appendChild(hr);
  }
  list.style.listStyle = "none";
  document.getElementById("myList").appendChild(list);
}

function topStories() {
  var url = "https://api.nytimes.com/svc/topstories/v2/politics.json";
  url += '?' + $.param({
    'api-key': "8b693f159e224710b5386f0843775911"
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    var arr = result.results.sort( function() { return 0.5 - Math.random() } );
    var display = [];
    for (var i = 0; i < Math.min(arr.length, 4); i++) {
      display.push({"title" : arr[i].title,
                    "url" : arr[i].url});
    }
      renderList(display);
  }).fail(function(err) {
    throw err;
  });
}

document.addEventListener('DOMContentLoaded', topStories);
