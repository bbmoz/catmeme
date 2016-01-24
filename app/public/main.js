(function main() {
  var catImgElement = document.getElementById('cat');
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      catImgElement.src = JSON.parse(xhttp.responseText).image;
    }
  };

  xhttp.open('GET', '/images', true)
  xhttp.send();
}());
