/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 */
const navbar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

// build the nav
function addSectionstonav() {
  for (let item of sections) {
      let section = document.createElement('li');
      section.className = 'menu__link';
      section.dataset.nav = item.id;
      section.innerText = item.dataset.nav;
      navbar.appendChild(section);
  };
};
// add section to nav
addSectionstonav();

//-------------------------------------------------------------------

 /* <event-target>.addEventListener(<event-to-listen-for>,
  <function-to-run-when-an-event-happens>);
*/

// Scroll to ID using event
function scrollToClickedSection() {
    navbar.addEventListener('click', function (event) {
       const clicked = document.querySelector('#' + event.target.dataset.nav)
       clicked.scrollIntoView();
    });
};
// Scroll to section on link click
scrollToClickedSection();

//.....................................................
//using getBoundingClientRect to get the position relative to the viewport
function getActiveElem() {
  maxSectionVal = sections[0];
  minVal = 1000;   //you can change the no. as long as it's in your range
  for (item of sections) {
      let bounding = item.getBoundingClientRect();
      // using top/y-axis position
      if (bounding.top > -200 & bounding.top < minVal) {
          minVal = bounding.top;
          maxSectionVal = item;
      };
  };
  return maxSectionVal;
};

// Add class 'active' to section when near top of viewport
function setActive () {
  window.addEventListener('scroll', function (event) {
      let section = getActiveElem();
      section.classList.add('your-active-class');
      // set other sections as inactive
      for (let item of sections) {
          if (item.id != section.id & item.classList.contains('your-active-class')) {
              item.classList.remove('your-active-class');
          }
      }
      // set corresponding header style
      const active = document.querySelector('li[data-nav="' + section.id + '"]');
      active.classList.add('active__link');
      // add style background when active
      active.style.cssText=('background-color:#eded41');

      // remove from other headers
      const headers = document.querySelectorAll('.menu__link');
      for (let item of headers) {
          console.log(item);
          if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) {
              item.classList.remove('active__link');
              item.style.cssText=('color:black');
          }
      };
  });
};

// Set sections as active
setActive();

//...................................................................................................
//Get the button: scroll to  top
mybutton = document.getElementById("totopBtn");

// When user scrolls down 30px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When clicks on the button, scroll to the top of the document
function totopFunction() {
  document.documentElement.scrollTop = 0; 
}
  