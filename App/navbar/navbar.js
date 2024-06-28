document.addEventListener("DOMContentLoaded", function() {
  const navContainer = document.getElementById('navbar-container');
  const currentPath = window.location.pathname; 

  fetch('../../navbar/nav-links.json')
    .then(response => response.json())
    .then(data => {
      const nav = document.createElement('nav');
      nav.className = 'navbar navbar-expand-lg navbar-dark';
      nav.innerHTML = `
        <div class="container">
          <a class="navbar-brand" href="${data.brand.url}">${data.brand.name}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarNav">
            <ul class="navbar-nav mr-auto"></ul>
          </div>
        </div>
      `;

      const navbarNav = nav.querySelector('.navbar-nav');
      data.links.forEach(link => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const a = document.createElement('a');
        a.className = 'nav-link';
        a.href = link.url;
        a.textContent = link.name;
        if (currentPath.includes(link.url)) { 
          a.classList.add('current');
        }
        li.appendChild(a);
        navbarNav.appendChild(li);
      });

      navContainer.appendChild(nav);
    
      console.log("Current path for comparison:", currentPath); 
    })
    .catch(error => console.error('Error loading the navigation data: ', error));
});
