'use strict';

let dropdownList = document.getElementById('repos') ;
function dropdownListGen(data){
  let option; 
  for (let i = 0; i < data.length; i++) {
  option = document.createElement("option");
  option.text = data[i].name;
  option.value = i;
  dropdownList.add(option);
}
  return dropdownList;
  
}

let info = document.getElementById('root'); 
function selectedRepoInfo(data){
let infoArr=[];
for (let i = 0; i < data.length; i++) {
  infoArr.push(data[document.getElementById('repos').name].description);
}
}

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (key === 'text') {
        elem.innerText = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function main(url) {
    fetchJSON(url, (err, data) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      } else {
        dropdownListGen(data);
       }
    });
  }


  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}


