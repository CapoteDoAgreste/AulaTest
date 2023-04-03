import { Digimon } from "./Digimon.js";
import { useState } from "react";
import React, { useEffect } from "react";

var digimon = new Digimon();
var ID = 8;
var url = "https://digimon-api.vercel.app/api/digimon/";
var levels = [
  "Fresh",
  "In training",
  "Rookie",
  "Champion",
  "Ultimate",
  "Mega",
  "Armor",
];
var len = 209;

function DigimonProfile() {
  const [digimonID, setDigimonID] = useState(len);

  useEffect(() => {
    const selector = document.getElementById("digiSelector");
    if (selector) {
      levels.forEach((element) => {
        var newOption = document.createElement("option");
        newOption.innerText = element;
        newOption.value = element;
        selector.appendChild(newOption);
      });
    }
  }, []);

  function increase() {
    var btn = document.getElementById("rightButton");
    console.log("right");

    if (!btn.disabled) {
      ID = ID + 1 <= len ? ID + 1 : ID;
      setDigimonID(digimonID + 1);
      refreshDigimon(btn);
      btn.disabled = true;
    }
  }

  function decrease() {
    var btn = document.getElementById("leftButton");
    console.log("left");
    if (!btn.disabled) {
      ID = ID - 1 >= 0 ? ID - 1 : ID;
      btn.disabled = true;
      setDigimonID(digimonID - 1);
      refreshDigimon(btn);
    }
  }

  async function getDescription(name, Digimon) {
    fetch(`https://www.digi-api.com/api/v1/digimon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        data.descriptions.forEach((element) => {
          if (element.language === "en_us") {
            Digimon.description = element.description;
          }
        });
        setDigimonID(digimonID);
        digimon = Digimon;
        console.log(digimon);
      });
  }

  async function refreshDigimon(button) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        len = data.length;
        console.log(len, ID);
        if (ID > len) {
          ID = len;
        }
        const req = data[ID];
        button.disabled = false;
        console.log(req);
        const updatedDigimon = {
          name: req.name,
          image: req.img,
          description: "",
        };
        const dName = req.name === "Biyomon" ? "Piyomon" : req.name;
        getDescription(dName, updatedDigimon);
        button.disabled = false;
      })
      .catch((error) => {
        console.error(error);
        button.disabled = false;
      });
  }

  async function filterDigimon() {
    const value = document.getElementById("digiSelector").value;
    console.log(value);
    if (value === "none") {
      url = "https://digimon-api.vercel.app/api/digimon/";
    } else {
      url = `https://digimon-api.vercel.app/api/digimon/level/${value}`;
    }
    ID = 0;
    setDigimonID(digimonID);
    refreshDigimon(document.getElementById("rightButton"));
  }

  return (
    <div class="mb3 digimonProfile rounded-4">
      <div>
        <select
          class="form-control rounded-4"
          id="digiSelector"
          onChange={filterDigimon}
        >
          <option selected value="none">
            Select Stage
          </option>
        </select>
      </div>
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
