import puppeteer from "puppeteer";

async function login(page, subdomain, username, password) {
  const usernameInput = "#pseudonym_session_unique_id";
  const passwordInput = "#pseudonym_session_password";
  const submitButton = "button[type=submit]";

  // go to the canvas login and input the login and password
  await page.goto(`https://${subdomain}.instructure.com/login/canvas`, {
    waitUntil: ["load", "domcontentloaded"],
  });
  await page.waitForSelector(usernameInput);
  await page.type(usernameInput, username);
  await page.type(passwordInput, password);

  await Promise.all([
    page.click(submitButton),
    page.waitForSelector(".ic-Dashboard-header__title"),
  ]);
  return page;
}

async function getToken(page, subdomain, purpose, expires) {
  const newTokenButton = ".add_access_token_link";
  const tokenPurpose = "#access_token_purpose";
  const tokenExpires = "#access_token_permanent_expires_at";
  const generateButton = ".btn.btn-primary.submit_button.button_type_submit";
  const tokenDiv = "#token_details_dialog .visible_token";

  await page.goto(`https://${subdomain}.instructure.com/profile/settings`, {
    waitUntil: ["load", "domcontentloaded"],
  });
  await page.waitForSelector(newTokenButton).then(() => {
    page.click(newTokenButton);
  });
  await page.waitForSelector(generateButton, { visible: true });
  await page.type(tokenPurpose, purpose);
  await page.type(tokenExpires, expires);
  await page.click(generateButton);
  await page.waitForSelector(tokenDiv, { visible: true });
  var token = await page.$eval(tokenDiv, (element) => element.innerText);

  return token;
}

export default async function runPuppeteer(
  username,
  password,
  subdomain,
  purpose,
  expires,
  isTest = false
) {
  var browser;
  var page;

  try {
    /* SETUP PUPPETEER */
    // set the view window for puppeteer
    browser = await puppeteer.launch({
      headless: !isTest, // run !headless if in dev-mode
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: ["--start-maximized"],
    });
    page = await browser.newPage();
    page.setDefaultTimeout(6500);

    /* LOGIN */
    page = await login(page, subdomain, username, password);
  } catch (err) {
    console.error(err);
    await browser.close();
    throw "Login failed. Please check your username and password are correct.";
  }

  try {
    /* FETCH TOKEN */
    var token = await getToken(page, subdomain, purpose, expires);
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await browser.close();
  }
}
