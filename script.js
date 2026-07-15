const themeBtn = document.getElementById('theme-btn');
const themeImg = document.getElementById('theme-img');
const body = document.body;

let allExtensions = [];

themeBtn.addEventListener('click', () => {
    if(body.getAttribute('data-theme') === 'dark'){
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light')
        themeImg.setAttribute('src', 'assets/images/icon-moon.svg');
    } else{
        body.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
        themeImg.setAttribute('src', 'assets/images/icon-sun.svg');
    }
})

if(localStorage.getItem('theme') === 'dark'){
    body.setAttribute('data-theme', 'dark')
    themeImg.setAttribute('src', 'assets/images/icon-sun.svg');
}

async function loadExtensions() {
    try{
        const response = await fetch('./data.json');
        const data = await response.json();
        renderExtensions(data);
        allExtensions = data;
    } catch(error)
    {
        console.error('Data load error: ', error);
    }
}

function renderExtensions(extensions){
    const container = document.getElementById('extensions');

    container.innerHTML = '';

    extensions.forEach(ext => {
        const extension = document.createElement('article');

        extension.innerHTML = `
          <div class="top">
            <img src="${ext.logo}" alt="${ext.name} Logo" width="60" height="60">
            <div class="top-text">
              <h3>${ext.name}</h3>
              <p>${ext.description}</p>
            </div>
          </div>
          <div class="bottom">
            <button class="remove" type="button">Remove</button>
            <div class="toggle">
              <label class="toggle-label">
                <input type="checkbox" class="toggle-input" aria-label="Toggle extension">
                <span class="toggle-slider"></span>
              </label>

              <label class="toggle-label">
                <input type="checkbox" class="toggle-input" aria-label="Toggle extension" ${ext.isActive ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        `;

        container.appendChild(extension);
    });
}


function filterExtensions(status){
  let filtered = allExtensions;

  if(status === 'active'){
    filtered = allExtensions.filter(item => item.isActive === true);
  } else if(status === 'inactive'){
    filtered = allExtensions.filter(item => item.isActive === false);
  }

  renderExtensions(filtered);
}



const filtersContainer = document.querySelector('.filters');

filtersContainer.addEventListener('click', (e) => {
  if(e.target.tagName !== 'BUTTON') return;

  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  const filterType = e.target.textContent.toLowerCase();
  filterExtensions(filterType);
})



loadExtensions();