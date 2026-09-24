import {chromium} from 'playwright'

const baseUrl='http://127.0.0.1:4173/Ashu-s_Portfolio/'
const browser=await chromium.launch({headless:true})
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

try{
  await page.goto(baseUrl,{waitUntil:'networkidle',timeout:30000})
  await page.waitForSelector('.preloader',{state:'detached',timeout:15000})
  await page.waitForTimeout(500)

  const before=await page.locator('canvas').screenshot()
  const box=await page.locator('canvas').boundingBox()
  if(!box||box.width<10||box.height<10) throw new Error('Canvas is missing or has no usable size.')

  await page.mouse.click(box.x+box.width/2,box.y+box.height*.52)
  await page.waitForTimeout(2500)

  const after=await page.locator('canvas').screenshot()
  const result=await page.evaluate(()=>{
    const canvas=document.querySelector('canvas')
    const gl=canvas?.getContext('webgl2')||canvas?.getContext('webgl')
    return {
      canvas:!!canvas,
      width:canvas?.width||0,
      height:canvas?.height||0,
      contextLost:gl?gl.isContextLost():null
    }
  })

  console.log(JSON.stringify({result,beforeBytes:before.length,afterBytes:after.length,consoleErrors,pageErrors,failedRequests},null,2))

  if(pageErrors.length) throw new Error('Browser pageerror detected.')
  if(consoleErrors.length) throw new Error('Browser console errors detected.')
  if(failedRequests.some(x=>/\.js(?:\?|$)|\.css(?:\?|$)/.test(x))) {
    throw new Error('A critical JS/CSS request failed.')
  }
  if(!result.canvas||!result.width||!result.height||result.contextLost) {
    throw new Error('WebGL canvas is not healthy after the entrance click.')
  }

  console.log('SMOKE PASS: entrance click completed without browser/runtime errors.')
}finally{
  await browser.close()
}