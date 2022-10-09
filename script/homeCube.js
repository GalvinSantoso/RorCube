// aquare button

const squareButton = document.querySelector('.square-button');
const navResponsive = document.querySelector('.nav-responsive');

let buttonOn = false;
squareButton.addEventListener('click', function () {
  if (buttonOn === false) {
    squareButton.style.borderRadius = '100%';
    squareButton.style.backgroundColor = '#bf53ff';
    squareButton.style.position = 'fixed';
    navResponsive.style.display = 'flex';
    navResponsive.style.animation = 'slideIn 1s forwards';
    buttonOn = true;
  } else {
    squareButton.style.borderRadius = '0';
    squareButton.style.backgroundColor = '#ff6600';
    squareButton.style.position = 'absolute';
    navResponsive.style.animation = 'slideOut 1s forwards';
    setTimeout(() => {
      navResponsive.style.display = 'none';
    }, 1000);
    buttonOn = false;
  }
});

// card
$('.carousel').owlCarousel({
  margin: 75,
  stagePadding: 15,
  loop: true,
  autoplay: true,
  autoplayTimeOut: 3000,
  autoplayHoverPause: true,
  mouseDrag: false,
  dots: true,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    768: {
      items: 2,
      nav: false,
    },
    1000: {
      items: 3,
      nav: false,
    },
  },
});

// cubeInfo

const cubeInfoDetails = document.querySelector('.cube-info-details');

$('.carousel').on('click', '.cube-info', function (e) {
  const card = e.target.parentElement.parentElement;
  const cubeJudul = card.querySelector('.card-bawah h5').textContent;
  const cubePrice = card.querySelector('.cube-price').textContent;
  const cubeImg = cubeInfoDetails.querySelector('.cube-info-details-isi .info-details-isi-img img');
  const cubeImgSrc = card.querySelector('.card-atas img').getAttribute('src');
  const infoDetailsIsiText = cubeInfoDetails.querySelector('.info-details-isi-text');
  console.log(infoDetailsIsiText);
  cubeImg.setAttribute('src', cubeImgSrc);
  infoDetailsIsiText.innerHTML = `            <h3>${cubeJudul}</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis enim veritatis dicta fugiat ex aperiam laborum, id qui? Voluptate, explicabo.</p>
  <div class="info-detail-price">${cubePrice}</div>
  <ul>
    <li><span>Type:</span> 3x3</li>
    <li><span>Magnets:</span> Available</li>
    <li><span>Size:</span> 56mm</li>
    <li><span>Weight:</span> 84g</li>
  </ul>
  <button class="info-details-shop">Shop Now</button>`;
  cubeInfoDetails.style.animation = 'fadeIn 1s forwards';
  cubeInfoDetails.style.display = 'flex';
});

const closeDetails = cubeInfoDetails.querySelector('.close-details');

closeDetails.addEventListener('click', function () {
  cubeInfoDetails.style.animation = 'fadeOut 0.8s forwards';
  setTimeout(() => {
    cubeInfoDetails.style.display = 'none';
  }, 1000);
});

// validation contact us

function Contact(id, name, email, phone, message) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.phone = phone;
  this.message = message;
}

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const id = Math.floor(Math.random() * 10000);
  const errorMessage = [];
  // name
  console.log(name.length);
  if (name.length <= 5) {
    errorMessage.push('name length must more than 5 characters');
  }
  // email
  if (email.startsWith('.') || email.startsWith('@')) {
    errorMessage.push('email cant start with . or @');
  } else if (!email.endsWith('.com')) {
    errorMessage.push('email must contain .com');
  }
  // phone
  if (!phone.startsWith('0')) {
    errorMessage.push('phone must start with 0');
  }

  const totalWordMessage = message.split(' ');
  // message
  if (totalWordMessage.length <= 6) {
    errorMessage.push('message must have 5 words or more');
  }

  if (errorMessage.length == 0) {
    const contactIsi = new Contact(id, name, email, phone, message);
    console.log(contactIsi);
    fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactIsi),
    })
      .then((response) => response.json())
      .then((data) => data);
  } else {
    const divError = document.querySelector('.error');
    const divErrIsi = divError.querySelector('.error-isi');
    const errorTampil = (value) => {
      return `<ol> 
        ${value.map((isi) => `<li>${isi}</li>`).join('')}
      </ol>`;
    };
    divErrIsi.innerHTML = errorTampil(errorMessage);
    divError.style.display = 'flex';
    divError.style.animation = 'slideIn 0.5s forwards';

    setTimeout(() => {
      divError.style.animation = 'slideOut 1s forwards';
      setTimeout(() => {
        divError.style.display = 'none';
      }, 1000);
    }, 5000);
  }
});

// animation on scroll
AOS.init();
