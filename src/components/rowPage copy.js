import { Digimon } from "./Digimon.js";
import React, { useEffect } from "react";
import { useState } from "react";

function RowPage() {
  const [digimons, setDigimons] = useState([]);
  var digimon01 = new Digimon();
  var digimon02 = new Digimon();
  var digimon03 = new Digimon();
  var digimon04 = new Digimon();
  var digimon05 = new Digimon();

  var page = 0;

  async function newDigimon(index) {
    fetch("https://www.digi-api.com/api/v1/digimon?page=" + page)
      .then((response) => response.json())
      .then((data) => {
        const req = data.content[index];

        const nDigimon = {
          name: req.name,
          image: req.image,
        };
        console.log(nDigimon);
        digimon01 = nDigimon;
        const aux = [nDigimon];
        setDigimons([...digimons, ...aux]);
        digimon01 = digimons[0];
      });
  }

  useEffect(() => {
    newDigimon(0);
  }, []);
  return (
    <div>
      <nav class="navbar navbar-light bg-light align-middle">
        <span class="navbar-brand mb-0 p-3 h1">DigimonProfile</span>
        <div class="input-group input-group-sm p-3 w-30">
          <input class="form-control input-group-prepend"></input>
          <button
            type="button"
            class="btn btn-outline-primary input-group-prepend"
          >
            Search
          </button>
        </div>
      </nav>

      <div id="cardGroup">
        <div class="card digiCards">
          <img
            class="card-img-center w-50"
            src="./images/agumon.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon01.name}</h5>
            <p class="card-text">{digimon01.description}</p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center w-50"
            src="./images/agumon.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon02.name}</h5>
            <p class="card-text">{digimon02.description}</p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center w-50"
            src="./images/agumon.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon03.name}</h5>
            <p class="card-text">{digimon03.description}</p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center w-50"
            src="./images/agumon.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon04.name}</h5>
            <p class="card-text">{digimon04.description}</p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center w-50"
            src="./images/agumon.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon05.name}</h5>
            <p class="card-text">{digimon05.description}</p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowPage;
