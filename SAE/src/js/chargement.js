window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    loader.classList.add('fade-in-transition');
    loader.remove();

});

function ChargementCreationPost() {
   var loaderDiv = document.createElement('div');
      loaderDiv.id = 'loader';
      loaderDiv.className = 'loader';

      var loaderInnerDiv = document.createElement('div');
      loaderInnerDiv.className = 'loader-inner';

      loaderDiv.appendChild(loaderInnerDiv);

      // Ajoute le code HTML généré au document
      document.body.innerHTML += loaderDiv.outerHTML;
}