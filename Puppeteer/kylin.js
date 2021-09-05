let puppeteer = require('puppeteer')
// let axios = require('axios')

let httpUrl = 'https://testqlinyun.back.qlinyun.com/';
let kdtUrl = 'https://testqlinyun.back.qlinyun.com/shopMaster';
(async function() {
  let debugOptions = {
    //设置视窗的宽高
    defaultViewport:{
        width:1600,
        height:900
    },
    //设置为有界面，如果为true，即为无界面
    headless:false,
    // 每个步骤操作放慢
    slowMo: 100
  }
  
  let options = {headless:true}
  let browser = await puppeteer.launch(debugOptions)

  async function auto () {
    let page = await browser.newPage()
    await page.goto(httpUrl)

    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('.no-login span:first-child'), // 点击该链接将间接导致导航(跳转)
    ]);

    let inputUsername = await page.$("#username")
    let inputPassword = await page.$("#password")
    
    await inputUsername.focus()
    await page.keyboard.type('13045970746')
    await inputPassword.focus()
    await page.keyboard.type('12345678')


    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('.btn-submit'), // 点击该链接将间接导致导航(跳转)
    ]);

    await page.goto(kdtUrl)
    
  
    await page.focus("form .companyName input")
    await page.keyboard.type('自动输入企业名称')

    await page.focus("form .name input")
    await page.keyboard.type('自动输入联系人')

    await page.focus("form .mainProduct input")
    await page.keyboard.type('自动输入主营产品')

    await page.focus("form .intentionPlat input")
    await page.keyboard.type('自动输入意向平台')


    await page.focus("form .detailAddress input")
    await page.keyboard.type('自动输入详细地址')

    let element  = await page.$("form .area input")
    let box = await element.boundingBox()
    console.log(box)
    const x = box.x + (box.width/2);
    const y = box.y + (box.height/2);
    await page.mouse.click(x,y)
    await page.mouse.click((x-50),(y+110))
    await page.mouse.click(x,(y+100))
    await page.mouse.click((x+170),(y+90))

  }

  auto()
})()