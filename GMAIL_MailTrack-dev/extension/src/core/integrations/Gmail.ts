import util from "../util/Util";
import Tag from "../classes/Tag";
import Logo from "../classes/Logo";
import SideBar from "../classes/SideBar";
import AnalyticButton from "../classes/AnalyticButton";
import AnalyticPage from "../classes/AnalyticPage";
import CatchupButton from "../classes/CatchupButton";
import CatchupInnerButton from "../classes/CatchupInnerButton";


export default class GmailIntegration {
  // Bases
  name = "gmail";
  loaded_selector = "body";
  init() {
    let analytic_page: any = null;

    // Routing service
    window.addEventListener("hashchange", async (event: HashChangeEvent) => {
      console.log("hashchanged");
      switch (window.location.hash) {
        case "#analytic":
          analytic_page = new AnalyticPage();
        // console.log("analytic page gmail");
          util.create_window_api(analytic_page);

          analytic_page.init();
          await analytic_page.inject();
          break;
          
        default:
          if (analytic_page) {
            analytic_page.destroy();
          }
      }
    });
  }

  async detect_dom(index: number) {
    // console.log(11,"has entered detect dom");
    const email_title = document.querySelector("table[id] tr td:nth-child(4)");

    // Tag
    if (email_title && !email_title.getAttribute("data-extension-detected")) {
      email_title.setAttribute("data-extension-detected", "true");

      const tag: any = new Tag(email_title, "afterend");
      tag.init();
    }

    // Logo
    const settings = document.querySelector("[data-ogsr-up]");
    if (settings && !settings.getAttribute("data-extension-detected")) {
      settings.setAttribute("data-extension-detected", "true");
      
      const logo: any = new Logo(settings, "afterbegin");
      
      logo.init();
    }
    
    // SideBar
    const email_detail = document.querySelector("[role='main'][jsaction*='CLIENT']");
    // console.log("email_detail", email_detail);
    if (email_detail && !email_detail.getAttribute("data-extension-detected")) {
      email_detail.setAttribute("data-extension-detected", "true");
      const sidebar = new SideBar({root: email_detail,width: 320});
      // console.log("gmail sidebar1")
      util.create_window_api(sidebar);
      // console.log("gmail sidebar2")
      
      sidebar.init();
      // console.log("gmail sidebar3")
      await sidebar.inject();
    }
    

    //Analytic button
    let navigator = document.querySelector("[role='navigation'] [aria-labelledby]");
    
    if (!navigator)
      navigator = document.querySelector(
        "[role='navigation'] + div [aria-labelledby]"
      );
    
    if (navigator && !navigator.getAttribute("data-extension-detected")) {
      navigator.setAttribute("data-extension-detected", "true");
      const analytic_button = new AnalyticButton(navigator, "beforeend");
      // console.log("analytic btn")
      analytic_button.init();
    }

    //catchup button
    const catch_selectors = document.querySelector("[role='navigation'] [aria-labelledby]");
    if (catch_selectors) {
        const bylDiv = catch_selectors.querySelector(".byl");
        if (bylDiv) {
            const tkDiv = bylDiv.querySelector(".TK");
            if (tkDiv) {
              const firstDivInsideTk = tkDiv.querySelector("div:first-child");
              if (firstDivInsideTk) {
                // console.log("First div insideTK", firstDivInsideTk);
                if(firstDivInsideTk && !firstDivInsideTk.getAttribute("data-extension-detected")) {
                  firstDivInsideTk.setAttribute("data-extension-detected", "true");
                  
                  const catch_up_button=new CatchupButton(firstDivInsideTk,"beforeend");
                  catch_up_button.init();
                }
              }
            }
          }
        }


        //catchup button alternative
  //   const catch_selector= document.querySelector("[role='navigation'] #\\:kz > div:first-child .TK > div:first-child");
  //   console.log("catchup", catch_selector);
  //   if(catch_selector && !catch_selector.getAttribute("data-extension-detected")) {
  //     catch_selector.setAttribute("data-extension-detected", "true");

  // const catch_up_button=new CatchupButton(catch_selector,"beforeend");
  // catch_up_button.init();
  //   }


    //catchup inner button
const catchup_inner_selector=document.querySelector("[role='main'][jsaction*='CLIENT'] [jsaction='JIbuQc:.CLIENT'] div:first-child");
// console.log("catchup_inner:" , catchup_inner_selector);
if(catchup_inner_selector && !catchup_inner_selector.getAttribute("data-extension-detected")) {
  catchup_inner_selector.setAttribute("data-extension-detected", "true");

  const catchup_inner_button=new CatchupInnerButton(catchup_inner_selector,"afterbegin");
  catchup_inner_button.init();
}
  }
}
