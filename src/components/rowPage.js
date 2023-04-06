/* eslint-disable jsx-a11y/anchor-is-valid */
import { Digimon } from "./Digimon.js";
import React, { useEffect } from "react";
import { useState } from "react";

var digimon01 = new Digimon();
var digimon02 = new Digimon();
var digimon03 = new Digimon();
var digimon04 = new Digimon();
var digimon05 = new Digimon();
var page = 6;
var url = "https://www.digi-api.com/api/v1/digimon?page=";
var pageRow = null;
var searching = false;
var pageOnScreen = true;

function RowPage() {
  const [refresh, refreshDigimon] = useState(0);

  async function getDescription(name) {
    fetch("https://www.digi-api.com/api/v1/digimon/" + name)
      .then((response) => response.json())
      .then((data) => {
        var description = "";

        return description;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function initDigimon() {
    var index = 0;

    for (index = 0; index < 5; index++) {
      await fetch("https://www.digi-api.com/api/v1/digimon?page=" + page)
        .then((response) => response.json())
        // eslint-disable-next-line no-loop-func
        .then((data) => {
          const req = data.content[index];

          const nDigimon = {
            name: req.name,
            image: req.image,
            //description: getDescription(req.name),
          };
          // eslint-disable-next-line default-case
          switch (index) {
            case 0:
              digimon01 = nDigimon;
              break;
            case 1:
              digimon02 = nDigimon;
              break;
            case 2:
              digimon03 = nDigimon;
              console.log(digimon03);
              break;
            case 3:
              digimon04 = nDigimon;
              break;
            case 4:
              digimon05 = nDigimon;
              break;
          }
        });
    }

    refreshDigimon(refresh + 1);
  }

  useEffect(() => {
    initDigimon();
  }, []);

  function previousPage() {
    page -= 1;
    initDigimon();
  }

  function nextPage() {
    page += 1;
    initDigimon();
  }

  async function initSearch(string) {
    await fetch("https://www.digi-api.com/api/v1/digimon?pageSize=1422")
      .then((response) => response.json())
      .then((data) => {
        const req = data.content;
        const result = req.filter((digimon) => digimon.name.includes(string));
        const nBody = document.getElementById("newBody");
        const cardGroup = document.createElement("div");
        cardGroup.id += "searchCardGroup";
        nBody.appendChild(cardGroup);

        return result.forEach((element) => {
          /*<div class="card searchedCard">
            <img src={element.image} class="searchedImage" />
            <span class="searchedName">{element.name}</span>
            <div>
              <a href="#" class="btn btn-primary searchedBtn">
                Enter in Profile
              </a>
            </div>
          </div>;*/
          const newDiv = document.createElement("div");
          newDiv.className += "card searchedCard";
          const newImage = document.createElement("img");
          newImage.src = element.image;
          newImage.className += "searchedImage";
          const newName = document.createElement("span");
          newName.innerText = element.name;
          newName.className += "searchedName";
          const newDivButton = document.createElement("div");
          const newButton = document.createElement("searchedBtn");
          cardGroup.appendChild(newDiv);
          newDiv.appendChild(newImage);
          newDiv.appendChild(newName);
          newDivButton.appendChild(newButton);
          newDiv.appendChild(newDivButton);
        });
      });
  }

  function search() {
    var value = document.getElementById("searchbar").value;
    const searchCards = document.getElementById("searchCardGroup");
    if (searchCards != null) {
      console.log("deleted");
      document.getElementById("searchCardGroup").remove();
      if (value !== "") {
        const searchResult = initSearch(value);
      }
    }
    if (pageRow == null) {
      pageRow = document.getElementById("cardGroup").cloneNode(true);
    }

    const nBody = document.getElementById("newBody");
    if (value !== "") {
      searching = true;
    } else {
      searching = false;
    }

    if (value == "" && !pageOnScreen) {
      nBody.appendChild(pageRow);
      pageOnScreen = true;
    }
    if (searching && value !== "" && pageOnScreen) {
      pageOnScreen = false;
      document.getElementById("cardGroup").remove();
      const searchResult = initSearch(value);
      console.log(searchResult);
    }
  }

  return (
    <div id="newBody">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand p-3" href="#">
          Digimon Profile
        </a>
        <button
          class="navbar-toggler"
          typea-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item mt-4">
              <h5>Level:</h5>
            </li>
            <li class="nav-item dropdown p-3">
              <select class="form-control">
                <option>None</option>
                <option>Baby I-</option>
                <option>Baby II</option>
                <option>Child</option>
                <option>Adult</option>
                <option>Ultimate</option>
                <option>Perfect</option>
                <option>Armor</option>
                <option>Hybrid</option>
                <option>Unknown</option>
              </select>
            </li>
          </ul>
          <div class="input-group input-group-sm p-3 w-30 searchdiv">
            <input
              class="form-control input-group-prepend"
              id="searchbar"
            ></input>
            <button
              type="button"
              class="btn btn-outline-primary input-group-prepend"
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      <div id="cardGroup">
        <div class="card digiCards">
          <img
            class="card-img-center"
            src={digimon01.image}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon01.name}</h5>
            <br></br>
            <a href="#" class="btn btn-primary digimonBtn">
              Enter in Profile
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center"
            src={digimon02.image}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon02.name}</h5>
            <a href="#" class="btn btn-primary digimonBtn">
              Enter in Profile
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center"
            src={digimon03.image}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon03.name}</h5>
            <a href="#" class="btn btn-primary digimonBtn">
              Enter in Profile
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center"
            src={digimon04.image}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon04.name}</h5>
            <a href="#" class="btn btn-primary digimonBtn">
              Enter in Profile
            </a>
          </div>
        </div>

        <div class="card digiCards">
          <img
            class="card-img-center"
            src={digimon05.image}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{digimon05.name}</h5>
            <div>
              <a href="#" class="btn btn-primary digimonBtn">
                Enter in Profile
              </a>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary leftBtn"
            onClick={previousPage}
          >
            Antes
          </button>

          <button
            type="button"
            class="btn btn-primary rightBtn"
            onClick={nextPage}
          >
            Depois
          </button>
        </div>
      </div>
    </div>
  );
}

export default RowPage;
