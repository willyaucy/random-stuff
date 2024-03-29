(async () => {
  function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(() => resolve(), milliseconds));
  }

  for (let button of document.querySelectorAll('[data-locator-id="merchantOffer"] button.offer-cta[title="Add to Card"]')) {
    button.click();
    await sleep(1000);
  }
})();
