(function main() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      var imageSrc = JSON.parse(xhttp.responseText).image;
      document.getElementById('cat').src = imageSrc;
    }
  };

  xhttp.open('GET', '/images', true)
  xhttp.send();
}());
