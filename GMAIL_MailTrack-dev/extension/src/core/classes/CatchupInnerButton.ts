import Component from "../bases/Component";

export default class CatchupInnerButton extends Component {
    component_class_selector = "catchup-innerbutton-root-div";

    mounted() {
      console.log("catchupbtn mounted");
      this.component_el.addEventListener("click", (event: MouseEvent) => {
    
      });
    }
  
    template() {
        return /*html*/ `
    <button class="catchup-innerbutton-root" title="Add to catchup">
      <span class="catchup-innerbutton-root__icon">
        <img src="${chrome.runtime.getURL("assets/catchup.svg")}" alt="catchup innerbutton">
      </span>
      <p>Catch up later</p>
      
    </button>

    <!-- Style -->
    <style>
    .catchup-innerbutton-root-div{
        height:27px !important;
        width:135px ;
        display:flex;
        justify-content: center;
        align-items: center;
        border:1px solid;
      }
      
      p{
        // width:80px;
        // height:15px;
        margin-left:10px;
      }
      .catchup-innerbutton-root {
        cursor: pointer;
        display: flex;
        align-items: center;
        width:135px;
        height:27px;
        border:none;
        transition-duration: 200ms;
        margin: 0 10px 0 0;
        background-color: rgb(255,255,255);
      }

      .catchup-innerbutton-root__icon {
      }
    </style>
  `;
    }
}