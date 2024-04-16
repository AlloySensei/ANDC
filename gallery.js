
var modal = document.getElementById("modal");

var modalImg = document.getElementById("modal-img");

var span = document.getElementById("close");

var images = document.querySelectorAll('.gallery img');

images.forEach(function(image) {
    image.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
    }
});

span.onclick = function() { 
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
