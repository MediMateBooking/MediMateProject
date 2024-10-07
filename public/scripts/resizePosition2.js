if (document.querySelector(".statusMessage p")) {
  const element = document.querySelector(".statusMessage p");
  const viewportWidth = window.innerWidth;
  const elementWidth = element.offsetWidth;

    const leftPosition = (viewportWidth - elementWidth) / 2;
    element.style.left = `${leftPosition}px`;
    element.style.visibility = 'visible';

    }


    if(document.querySelector('.validationSucess p')){

        const element = document.querySelector('.validationSucess p');
        const viewportWidth = window.innerWidth;
        const elementWidth = element.offsetWidth;
    
        const leftPosition = (viewportWidth - elementWidth) / 2;
        element.style.left = `${leftPosition}px`;
        element.style.visibility = 'visible';
    
        }


