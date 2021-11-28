var search = document.querySelector('form');

search.addEventListener('submit', function (e) {
  
    var searchValue = document.querySelector('.search-bar').value;
    var searchValueCapitalized = searchValue.charAt(0).toUpperCase()+searchValue.slice(1);

    e.preventDefault();

    var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var resultsTextSection = document.querySelector('.search-results-text');
       var resultsText = document.createElement('h1');

       resultsText.className = 'results';
       resultsTextSection.innerHTML = '';

       var res = JSON.parse(xhttp.responseText);
       var data = res.photos

       if (res.total_results > 0) {
           if (searchValue.slice(-1) === 's') {
            resultsText.innerHTML = `${searchValueCapitalized} Photos`;
            resultsTextSection.appendChild(resultsText);
        } else {
            resultsText.innerHTML = `${searchValueCapitalized} Images`;
            resultsTextSection.appendChild(resultsText);
        }
       } else {
            resultsText.innerHTML = `We Couldn't Find Anything For "${searchValueCapitalized}"`;
            resultsTextSection.appendChild(resultsText);
       }
       var leftPhotosSection = document.querySelector('.left-side')
       var leftCenterPhotosSection = document.querySelector('.left-center-side')
       var rightCenterPhotosSection = document.querySelector('.right-center-side')
       var rightPhotosSection = document.querySelector('.right-side')

       leftPhotosSection.innerHTML = '';
       leftCenterPhotosSection.innerHTML = '';
       rightCenterPhotosSection.innerHTML = '';
       rightPhotosSection.innerHTML = '';
       
       data.forEach(function(photo, i) {
        if (i % 4 === 0) {
            var leftPhotoDiv = document.createElement('div');
            leftPhotoDiv.className = 'photos';
            leftPhotoDiv.innerHTML = `
            <img class ="photo-align" src='${photo.src.large}'>
            <div class="overlay">
            <p class="photographer">${photo.photographer}</p>
            </div>
            `;
            leftPhotosSection.appendChild(leftPhotoDiv)
          } else if (i % 4 === 1){
            var leftCenterPhotoDiv = document.createElement('div');
            leftCenterPhotoDiv.className = 'photos';
            leftCenterPhotoDiv.innerHTML = `
            <img class ="photo-align" src='${photo.src.large}'>
            <div class="overlay">
            <p class="photographer">${photo.photographer}</p>
            </div>
            `;
            leftCenterPhotosSection.appendChild(leftCenterPhotoDiv)
          } else if (i % 4 === 2){
            var rightCenterPhotoDiv = document.createElement('div');
            rightCenterPhotoDiv.className = 'photos';
            rightCenterPhotoDiv.innerHTML = `
            <img class ="photo-align" src='${photo.src.large}'>
            <div class="overlay">
            <p class="photographer">${photo.photographer}</p>
            </div>
            `;
            rightCenterPhotosSection.appendChild(rightCenterPhotoDiv)
          } else if (i % 4 === 3){
            var rightPhotoDiv = document.createElement('div');
            rightPhotoDiv.className = 'photos';
            rightPhotoDiv.innerHTML = `
            <img class ="photo-align" src='${photo.src.large}'>
            <div class="overlay">
            <p class="photographer">${photo.photographer}</p>
            </div>
            `;
            rightPhotosSection.appendChild(rightPhotoDiv)
          }
       }) 
    }
};
xhttp.open("GET", `https://api.pexels.com/v1/search?query=${searchValue}&per_page=40`, true);
xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001e4cb0352c03241f49b991566cbbf976d')
xhttp.send();
})


