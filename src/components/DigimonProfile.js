import { Digimon } from "./Digimon.js";
import { useState } from "react";
var digimon = new Digimon();
var ID = 289;

function DigimonProfile() {
  const [digimonID, setDigimonID] = useState(289);

  function increase() {
    var btn = document.getElementById("rightButton");
    if (!btn.disable) {
      ID += 1;
      setDigimonID(digimonID + 1);
      refreshDigimon(btn);
      btn.disable = true;
    }
  }

  function decrease() {
    var btn = document.getElementById("leftButton");
    if (!btn.disable) {
      ID -= 1;
      setDigimonID(digimonID - 1);
      refreshDigimon(btn);
      btn.disable = true;
    }
  }

  function refreshDigimon(button) {
    fetch("https://www.digi-api.com/api/v1/digimon/" + ID)
      .then((response) => response.json())
      .then((data) => {
        digimon.name = data.name;
        digimon.image = data.images[0].href;
        digimon.description = data.descriptions[0].description;
        data.descriptions.forEach((element) => {
          if (element.language == "en_us") {
            digimon.description = element.description;
          }
          if (element.description == undefined) {
            digimon.description = "without description";
          }
          button.disable = false;
        });
      })
      .catch((error) => (button.disable = false));
  }

  return (
    <div class="mb3 digimonProfile rounded-4" onLoad={refreshDigimon}>
      <div></div>
      <div class="digiItem" id="imageTitle">
        <img src={digimon.image} class="rounded-4" id="image" />
        <h2>
          <span id="digimonName">{digimon.name}</span>
        </h2>

        <button
          type="button"
          class="btn btn-light"
          id="leftButton"
          onClick={decrease}
        >
          Left
        </button>
        <button
          type="button"
          class="btn btn-light"
          onClick={increase}
          id="rightButton"
        >
          Right
        </button>
      </div>
      <div class="digiItem" id="description">
        <h6>
          <span id="digimonDescription">{digimon.description}</span>
        </h6>
      </div>
    </div>
  );
}
export default DigimonProfile;
