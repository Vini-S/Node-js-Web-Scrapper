const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

let SICCodeData = [];

const getSICCode = () => {
  return new Promise(async (resolve, reject) => {

  })
}


const searchCompany = () => {
    return new Promise(async (resolve, reject) => {
      await axios.get('https://companycheck.co.uk/search?term=dual+energy').then((htmlData) => {
        setTimeout(() => {
          const companyDataDOM = new JSDOM(htmlData.data);
          let companyDataList = companyDataDOM.window.document.getElementsByClassName('search-section');
          if(companyDataList){
            let companyCode = companyDataList[0].querySelector('.result__number').textContent;
            let companyName = companyDataList[0].querySelector('[itemprop="legalName"]').textContent.trim().split(' ').join('-');
            SICCodeData.push({companyCode: companyCode, companyName: companyName});
            resolve(SICCodeData)
          }else{
            reject("No data found")
          }

        }, Math.random() * (10 - 2 + 1) + 2);
      }).catch((err) => {
        console.log("error while searching company---------", err);
        reject(err)
      });
    })
}


(async () => {

    searchCompany().then((companyData) => {
      console.log("in callback=======", companyData,);
      // console.log("cmpanydata=========", companyData);
    }).catch((err) => {
      console.log("catch the error in main----", err);
    });

//     const htmlHit2 =  await axios.get(`https://companycheck.co.uk/company/${companyCode}/${companyName}/companies-house-data`);
//     const dom2 = new JSDOM(htmlHit2.data);
//     let sicCode = dom2.window.document.getElementsByClassName('Summary__right')[0].getElementsByClassName('Summary__detail')[0].getElementsByTagName('P')[0].textContent.replace(/\s+/g, ' ').trim();

//     console.log("sic code =", sicCode.trim())
//     // console.log(dom2.window.document.getElementsByClassName('Summary__right')[0].getElementsByClassName('Summary__detail')[0].innerHTML);
  

})();


