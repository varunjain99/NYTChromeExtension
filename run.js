console.log("HI");

function renderList(array)  {
  console.log("HEY");
  list = document.createElement('ul');
  for (var i = 0; i < Math.min(array.length, 4); i++) {
    var item = document.createElement('li');
    var hr = document.createElement('hr')
    var link = document.createElement('a');
    link.textContent = array[i].title;
    link.href = array[i].link;
    console.log(array[i].link);
    link.onclick = function () {
                chrome.tabs.create({active: true, url: array[i].link});
            };
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
    console.log(result.results);
    var arr = result.results.sort( function() { return 0.5 - Math.random() } );
    var display = [];
    for (var i = 0; i < Math.min(arr.length, 4); i++) {
      display.push({"title" : arr[i].title,
                    "link" : arr[i].url});
    }
      renderList(display);
  }).fail(function(err) {
    throw err;
  });
}

document.addEventListener('DOMContentLoaded', function() {
        console.log("HI");
        topStories();
      }
    );
