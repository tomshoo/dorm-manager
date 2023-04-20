const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');
const btnPopup = document.querySelector('.btnLogin_popup');
const btnPop = document.querySelector('.btnRegister_popup');
const iconClose = document.querySelector('.icon-close');

signupLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// btnPop.addEventListener('click', () => {
//     wrapper.classList.add('active-popup');
// });

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// iconClose.addEventListener('click', () => {
//     wrapperreg.classList.remove('active-popup');
// });