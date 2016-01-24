(function main() {
  var catImgElemenet = document.getElementById('cat');
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      catImgElemenet.src = JSON.parse(xhttp.responseText).image;
    }
  };

  xhttp.open('GET', '/images', true)
  xhttp.send();
}());
