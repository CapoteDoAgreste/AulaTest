import { Digimon } from "./Digimon.js";
import { useState } from "react";
var digimon = new Digimon();
var ID = 289;

function DigimonProfile() {
  const [digimonID, setDigimonID] = useState(289);

  function increase() {
    var btn = document.getElementById("rightButton");
    console.log("right");
    if (!btn.disabled) {
      ID += 1;
      setDigimonID(digimonID + 1);
      refreshDigimon(btn);
      btn.disabled = true;
    }
  }

  function decrease() {
    var btn = document.getElementById("leftButton");
    console.log("left");
    if (!btn.disabled) {
      ID -= 1;
      btn.disabled = true;
      setDigimonID(digimonID - 1);
      refreshDigimon(btn);
    }
  }

  function refreshDigimon(button) {
    fetch("https://www.digi-api.com/api/v1/digimon/" + ID)
      .then((response) => response.json())
      .then((data) => {
        const updatedDigimon = {
          name: data.name,
          image: data.images[0].href,
          description:
            data.descriptions[0]?.description || "without description",
        };
        data.descriptions.forEach((element) => {
          if (element.language === "en_us") {
            updatedDigimon.description = element.description;
          }
        });
        setDigimonID(digimonID);
        digimon = updatedDigimon;
        console.log(digimon);
        button.disabled = false;
      })
      .catch((error) => {
        console.error(error);
        button.disabled = false;
      });
  }

  return (
    <div class="mb3 digimonProfile rounded-4">
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
