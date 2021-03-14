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
  const university = "UOC";
  console.log(`Hello, ${university}!`);


  var btnNavbar = document.getElementById("closeNav");
  var navbar = document.getElementById("navbar");
  var showNavBar = document.getElementById("openNav");

  btnNavbar.addEventListener('click', () => {
    navbar.className = "hide";
    showNavBar.className = "show opennav";
  })

  showNavBar.addEventListener('click', () => {
    navbar.className = "show navigation opentransition";
    showNavBar.className = "hide";
  })


})();


