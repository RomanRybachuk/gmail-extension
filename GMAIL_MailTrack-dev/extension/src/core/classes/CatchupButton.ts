import Component from "../bases/Component"

export default class CatchupButton extends Component {
    component_class_selector="catchup-button-root";

    mounted(){
        this.component_el.addEventListener("click", (event: MouseEvent) => {
            window.location.hash = "#catchup";
          });
    }

    template() {
        return /*html*/ `
          <img class="catchup-button-root__icon" src="${chrome.runtime.getURL("../../assets/catchup.svg")}" alt="catchpup button">
          <div class="catchup-button-root__title">Catch up later</div>
    
          <!-- Style -->
          <style>

          .catchup-button-root {
            display: flex;
            align-items: center;
            height: 32px;
            padding: 0 0px 0 26px;
            cursor: pointer;
            border-radius: 0 16px 16px 0;
            transition-duration: 200ms;
            margin-top:0.5px;
          }

            .catchup-button-root:hover {
              background-color: rgba(32, 33, 36, 0.06);
            }
            .catchup-button-root__icon {
                width: 20px;
                margin-right: 18px;
              }
          </style>
        `;
      }
}