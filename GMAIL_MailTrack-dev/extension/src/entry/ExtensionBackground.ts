import Util from "../core/util/Util";
import { APP_URL } from "../../../shared/config";

async function main() {
  // chrome.runtime.onInstalled.addListener(async () => {
  //   const current_tab: any = await Util.tab_create({
  //     url: REDIRECT_URL_AFTER_EXTENSION_DOWNLOAD,
  //     active: true,
  //   });

  //   await Util.runtime_send_message(current_tab.id, {
  //     action: "click-action",
  //     data: null,
  //   });
  // });
console.log("start")
  chrome.action.onClicked.addListener(async (tab) => {
    console.log("start1");
    const tab_url = new URL(tab.url);
    let current_tab: any = null;

    // if (tab_url.protocol === "chrome:") {
    //   current_tab = await Util.tab_create({
    //     url: APP_URL,
    //     active: true,
    //   });
    // }

    const tabs_other = await chrome.tabs.query({
      active: false,
    });
    for (let tab of tabs_other) {
      await Util.runtime_send_message(tab.id, {
        action: "iframe-destroy",
        data: null,
      });
    }

    if (!current_tab) {
      [current_tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
    }
    // Sends a "click-action" message to the active tab's content script, initiating actions there.
    await Util.runtime_send_message(current_tab.id, {
      action: "click-action",
      data: null,
    });
  });
}

main();
