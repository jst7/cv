/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */

+(function () {
  const author = "Jorge Segovia Tormo";
  console.log(`Bienvenidos al cv de ${author}`);

  var btnNavbar = document.getElementById("closeNav");
  var navbar = document.getElementById("navbar");
  var showNavBar = document.getElementById("openNav");

  btnNavbar.addEventListener('click', () => {
    navbar.className = "hide";
    showNavBar.className = "navbar__opciones--show icon-menu";
  })

  showNavBar.addEventListener('click', () => {
    navbar.className = "navbar__opciones--show navbar__opciones opentransition";
    showNavBar.className = "hide";
  })


})();


