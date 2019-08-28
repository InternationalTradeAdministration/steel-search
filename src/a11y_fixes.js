/* eslint-disable no-console */

function fix_aria_roles() {
  let nodeArr = document.getElementsByClassName('Select-control');
  // console.log(' 🌶 number of nodes:', nodeArr.length);
  for (let el of nodeArr) {
    el.setAttribute('role', 'listbox');
  }
}

function add_iframe_titles() {
  let nodeArr = document.getElementsByClassName('chartjs-hidden-iframe');
  // console.log(' 📊 number of iframes:', nodeArr.length);
  for (let el of nodeArr) {
    el.setAttribute('title', 'data chart');
  }
}

export { fix_aria_roles, add_iframe_titles };