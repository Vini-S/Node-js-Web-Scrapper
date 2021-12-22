const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

let SICCodeData = [];

(async () => {
 const htmlHit1 = await axios.get('https://companycheck.co.uk/search?term=dual+energy');
 const dom1 = new JSDOM(htmlHit1.data);

 const listContainers = dom1.window.document.getElementsByClassName('search-section');
 if (listContainers) {
  //  console.log(listContainers[0].innerHTML);
  // for(let i=0; i< listContainers.length; i++){
    // console.log(listContainers[0].querySelector('.result__number').textContent);
    let companyCode = listContainers[0].querySelector('.result__number').textContent;
    let companyName = listContainers[0].querySelector('[itemprop="legalName"]').textContent.trim().split(' ').join('-');
    console.log("companyName===========", companyName, companyCode)
    const htmlHit2 =  await axios.get(`https://companycheck.co.uk/company/${companyCode}/${companyName}/companies-house-data`);
    const dom2 = new JSDOM(htmlHit2.data);
    let sicCode = dom2.window.document.getElementsByClassName('Summary__right')[0].getElementsByClassName('Summary__detail')[0].getElementsByTagName('P')[0].textContent.replace(/\s+/g, ' ').trim();

    console.log("sic code =", sicCode.trim())
    // console.log(dom2.window.document.getElementsByClassName('Summary__right')[0].getElementsByClassName('Summary__detail')[0].innerHTML);
  // }
  
 }
})();