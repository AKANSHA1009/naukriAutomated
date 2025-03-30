const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const { exec } = require('child_process'); // Ensure exec is required for running AutoIT
require('dotenv').config();

const username = process.env.MYUSERNAME;
const password = process.env.MYPASSWORD;


let options = new chrome.Options();
options.addArguments('start-maximized'); // Start Chrome maximized
options.addArguments('disable-infobars'); // Disable Chrome info bars

async function naukriLogin() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Navigate to the Naukri login page
    await driver.get('https://www.naukri.com/nlogin/login');

    // Wait for the login form to be visible
    await driver.wait(until.elementLocated(By.id('login_Layer')), 10000);

    await driver.findElement(By.id('usernameField')).sendKeys(`${username}`, Key.RETURN); // Replace with your email

    await driver.findElement(By.id('passwordField')).sendKeys(`${password}`);

    // Click the login button
    await driver.findElement(By.xpath('//button[@type="submit"]')).click();

    // Wait for a successful login (e.g., home page or any element that appears after login)
    await driver.wait(until.elementLocated(By.linkText('View profile')), 10000); // Change this as needed to match an element on the home page

    console.log('Login successful!');

    // 2. Navigate to the "Profile" page (where you can upload the resume)
    await driver.get('https://www.naukri.com/mnjuser/profile'); // The URL may differ; update it accordingly
    await driver.wait(until.elementLocated(By.className('hdn')), 10000); // Ensure the profile page loads

    console.log('Navigated to Profile Page.');

    // 3. Find the "Upload Resume" button or file input element
    const uploadButton = await driver.findElement(By.className('secondary-content typ-14Bold')); // You need to check the exact class of the button
    await uploadButton.click(); // Click the "Upload Resume" button

    // 4. Upload the new resume
    console.log(__dirname);
    const resumeInput = await driver.findElement(By.css('input[type="file"]'));
    
    const { exec } = require('child_process');
    const path = require('path');
    
    // Path to your AutoIT script (update this to the correct location of the AutoIT script)
    const autoITScriptPath = path.resolve('C:\\Users\\Acer\\Desktop\\uploadFile1.exe');  // Correctly set the path
    
    // Run the AutoIT script
    exec(autoITScriptPath, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing AutoIT script:', err);
        return;
      }
    
      console.log('AutoIT script executed successfully!');
      
      if (stderr) {
        console.error('stderr:', stderr);
      }
      
      console.log('stdout:', stdout);
    });
    
    // Wait for confirmation message after upload
    await driver.wait(until.elementLocated(By.xpath('//div[text()="Resume uploaded successfully"]')), 20000); // Check for confirmation message
    console.log('Resume uploaded successfully!');

  } catch (err) {
    console.log('Error:', err);
  } finally {
    // Quit the driver after completing the task
    await driver.quit();
  }
}

naukriLogin();
