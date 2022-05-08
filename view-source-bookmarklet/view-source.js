let preTag = newTab.document.createElement('pre');
preTag.innerText = document.documentElement.innerHTML;
document.body.innerHTML = '';
document.body.appendChild(preTag);