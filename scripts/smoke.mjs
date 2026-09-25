import {chromium} from 'playwright'
import fs from 'node:fs'

const baseUrl='http://127.0.0.1:4173/Ashu-s_Portfolio/'
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader']})
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1})

const consoleErrors=[]
const pageErrors=[]
const failedRequests=[]

page.on('console',msg=>{
  if(msg.type()==='error') consoleErrors.push(msg.text())
})
page.on('pageerror',error=>pageErrors.push(error.stack||error.message))
page.on('requestfailed',request=>{
  failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText||'failed'}`)
})

fs.mkdirSync('smoke-artifacts',{recursive:true})

try{
  await page.goto(baseUrl,{waitUntil:'domcontentloaded',timeout:15000})
  await page.waitForTimeout(1500)

  await page.screenshot({path:'smoke-artifacts/01-loaded.png',fullPage:false})

  const preloader=page.locator('.preloader')
  if(await preloader.count()){
    await preloader.waitFor({state:'hidden',timeout:15000})
  }

  const canvas=page.locator('canvas')
  await canvas.waitFor({state:'visible',timeout:10000})
  const box=await canvas.boundingBox()
  if(!box||box.width<10||box.height<10) throw new Error('Canvas is missing or has no usable size.')

  await canvas.screenshot({path:'smoke-artifacts/02-before-gate.png'})
  await page.mouse.click(box.x+box.width/2,box.y+box.height*.52)
  await page.waitForTimeout(2500)
  await canvas.screenshot({path:'smoke-artifacts/03-after-gate.png'})
  await page.screenshot({path:'smoke-artifacts/04-after-gate-full.png',fullPage:false})

  const result=await page.evaluate(()=>{
    const canvas=document.querySelector('canvas')
    const gl=canvas?.getContext('webgl2')||canvas?.getContext('webgl')
    const pre=document.querySelector('.preloader')
    return {
      canvas:!!canvas,
      width:canvas?.width||0,
      height:canvas?.height||0,
      contextLost:gl?gl.isContextLost():null,
      preloaderVisible:pre?getComputedStyle(pre).display!=='none'&&getComputedStyle(pre).visibility!=='hidden':false
    }
  })

  console.log(JSON.stringify({result,consoleErrors,pageErrors,failedRequests},null,2))

  if(pageErrors.length) throw new Error('Browser pageerror detected.')
  if(consoleErrors.length) throw new Error('Browser console errors detected.')
  if(failedRequests.some(x=>/\.js(?:\\?|$)|\.css(?:\\?|$)/.test(x))) {
    throw new Error('A critical JS/CSS request failed.')
  }
  if(!result.canvas||!result.width||!result.height||result.contextLost) {
    throw new Error('WebGL canvas is not healthy after the entrance click.')
  }
  console.log('SMOKE PASS: page loaded, entrance was clicked, and WebGL remained healthy.')
}catch(error){
  await page.screenshot({path:'smoke-artifacts/99-failure.png',fullPage:false}).catch(()=>{})
  console.error(JSON.stringify({error:String(error),consoleErrors,pageErrors,failedRequests},null,2))
  throw error
}finally{
  await browser.close()
}