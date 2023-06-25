const {Builder, By, Key, until} = require('selenium-webdriver'); 
const schedule = require('node-schedule');

async function selectTime(driver, timeId) {
    await driver.switchTo().defaultContent();
        await driver.switchTo().frame('time_list');
    try {
      const select = await driver.findElement(By.xpath('//*[@id="r_time_'+timeId+'"]'));//*[@id="r_time_11"]
      await select.click();
      await select.findElement(By.xpath('//*[@id="r_time_'+timeId+'"]/option[2]')).click();//*[@id="r_time_11"]/option[2]
      console.log(`${timeId}시 선택완료`)
      return true; // 선택 성공
    } catch (error) {
      console.log(`${timeId}시 마감`);
      return false; // 선택 실패
    }
  }

async function example() { 
    let driver = await new Builder() 
    .forBrowser('chrome') 
    .build(); 
    
    try{
        await driver.get('https://www.evermedi.com/welcome.do'); 

        await driver.findElement(By.xpath('//*[@id="id"]')).sendKeys("ID");
        await driver.findElement(By.xpath('//*[@id="pw"]')).sendKeys("PW");

        await driver.findElement(By.xpath('//*[@id="center"]/div[1]/div/div[1]/form[2]/div[2]/span[2]/input')).sendKeys(Key.ENTER);


        await driver.findElement(By.xpath('//*[@id="center"]/div/div[1]/form/div[1]/ul/li[3]/a')).sendKeys(Key.ENTER);
        // await driver.findElement(By.xpath('//*[@id="center"]/div/div[2]/form/div/div[3]/table/tbody/tr[1]/td[2]/span/input')).sendKeys(Key.ENTER);
        await driver.findElement(By.xpath('//*[@id="center"]/div/div[2]/form/div/div[3]/table/tbody/tr/td[2]/span/input')).sendKeys(Key.ENTER);

        await driver.sleep(500); 
        const mainHandle = await driver.getWindowHandle();
        await driver.sleep(500); 
        const allHandles = await driver.getAllWindowHandles();
    
        for (const handle of allHandles) {
        if (handle !== mainHandle) {
            await driver.switchTo().window(handle);
            //  await driver.findElement(By.xpath('/html/body/div[3]/form/input[1]')).sendKeys(Key.ENTER);
            
            await driver.close();
        }
        }
    
        await driver.sleep(1500); 
        await driver.switchTo().window(mainHandle);
        
        await driver.switchTo().defaultContent();

        // const select1 = await driver.findElement(By.xpath('//*[@id="r_type_info"]'));
        // await select1.click();
        // await select1.findElement(By.xpath('//*[@id="r_type_info"]/option[2]')).click(); 


        await driver.switchTo().frame('reserv_calendar');
        await driver.executeScript("setYoil('4');parent.reSetDayFromCalendar('28')");

        await driver.switchTo().defaultContent();
        await driver.executeScript("doctorSet('D20170622124602995','한솔','1')");

        await driver.switchTo().frame('time_list');
        await driver.findElement(By.xpath('//*[@id="re_text"]')).sendKeys('척추관 협착증');

        await driver.switchTo().defaultContent();
        await driver.switchTo().frame('time_list');
        const timeIds = [17, 10, 11, 12, 14, 15, 16, 18];

        for (const timeId of timeIds) {
            if (await selectTime(driver, timeId)) {
                break; 
            }
        }

        await driver.switchTo().defaultContent();
        await driver.findElement(By.xpath('//*[@id="reserv"]')).sendKeys(Key.ENTER); 
        
        let alert;
        try {
            alert = await driver.switchTo().alert();
        } catch (error) {
            
        }
        if (alert) {
            console.log('==========================코드 재실행=========================='); 
          driver.quit();
        }else{
            console.log('성공!');
            process.exit();
        }
        
    }
    catch{
        driver.quit();
        // console.log(error);
    }

};

function main(){
    example();
};

const job3 = schedule.scheduleJob('56 * * * * *', function() {
    const now = new Date();
    console.log(now);    
    main();
  });

const job4 = schedule.scheduleJob('57 * * * * *', function() {
    const now = new Date();
    console.log(now);    
    main();
  });

const job = schedule.scheduleJob('58 * * * * *', function() {
    const now = new Date();
    console.log(now);    
    main();
  });

  const job1 = schedule.scheduleJob('59 * * * * *', function() {
    const now = new Date();
    console.log(now);    
    main();
  });

  const job2 = schedule.scheduleJob('* * * * *', function() {
    const now = new Date();
    console.log(now);    
    main();
  });