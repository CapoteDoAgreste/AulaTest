/* eslint-disable jsx-a11y/anchor-is-valid */
import DigimonProfile from "./DigimonProfile.js";
import { Digimon } from "./Digimon.js";
import React, { Component, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
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

var rowDigimon = <RowPageRow />;

function RowPageRow() {
  const leftButton = useRef(null);
  const rightButton = useRef(null);
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
    leftButton.current.disabled = false;
    rightButton.current.disabled = false;
  }

  useEffect(() => {
    initDigimon();
  }, []);

  function previousPage() {
    leftButton.current.disabled = true;
    rightButton.current.disabled = true;

    page -= 1;
    initDigimon();
  }

  function nextPage() {
    leftButton.current.disabled = true;
    rightButton.current.disabled = true;

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
          var digiName = element.name;
          newDiv.onclick = () => {
            makeDigimon(digiName, nBody);
          };
        });
      });
  }

  async function makeDigimon(name, body) {
    fetch(`https://www.digi-api.com/api/v1/digimon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        const pDigimon = {
          name: data.name,
          image: data.images[0].href,
          description: data.descriptions[0].description,
        };
        const profile = React.createElement(loadProfile, {
          nDigimon: pDigimon,
        });
        ReactDOM.render(profile, body);
      });
  }

  function loadProfile(props) {
    searching = true;
    pageOnScreen = true;
    return (
      <div className="profile">
        <Profile nDigimon={props.nDigimon} />
      </div>
    );
  }
  function searchkey(event) {
    if (event) {
      if (event.key == "Enter") {
        search();
      }
    }
  }

  function search() {
    const nBody = document.getElementById("newBody");

    var value = document.getElementById("searchbar").value;
    const searchCards = document.getElementById("searchCardGroup");
    if (searchCards != null) {
      console.log("deleted");
      document.getElementById("searchCardGroup").remove();
      if (value !== "") {
        const searchResult = initSearch(value);
      }
    }

    if (value !== "") {
      searching = true;
    } else {
      searching = false;
    }

    if (value == "" && !pageOnScreen) {
      console.log("test");
    }
    if (searching && value !== "" && pageOnScreen) {
      pageOnScreen = false;
      if (document.getElementById("cardGroup") != null) {
        document.getElementById("cardGroup").style.visibility = "hidden";
        document.getElementById("cardGroup").style.position = "absolute";
      } else {
        document.getElementsByClassName("digimonProfile")[0].style.visibility =
          "hidden";
        document.getElementsByClassName("digimonProfile")[0].style.position =
          "absolute";
      }
      const searchResult = initSearch(value);
      console.log(searchResult);
    }
  }

  function Profile(props) {
    return (
      /*<div className="card">
        <h2>{props.nDigimon.name}</h2>
        <img src={props.nDigimon.image} alt={props.nDigimon.name} />
        <p>{props.nDigimon.description}</p>
      </div>*/
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand p-3" href="./public/">
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
                onKeyUp={searchkey}
              ></input>
              <button
                type="button"
                class="btn btn-outline-primary input-group-prepend"
                onClick={() => {
                  search();
                }}
                ref={leftButton}
              >
                Search
              </button>
            </div>
          </div>
        </nav>
        <div class="mb3 digimonProfile rounded-4">
          <div class="digiItem profileNameImage" id="imageTitle">
            <img
              src={props.nDigimon.image}
              class="rounded-4"
              id="profileImage"
            />
            <h2>
              <span id="digimonName">{props.nDigimon.name}</span>
            </h2>
          </div>
          <div class="digiItem" id="description">
            <h6>
              <span id="digimonDescription">{props.nDigimon.description}</span>
            </h6>
          </div>
        </div>
      </div>
    );
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
              onKeyUp={searchkey}
            ></input>
            <button
              type="button"
              class="btn btn-outline-primary input-group-prepend"
              onClick={search}
              ref={leftButton}
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      <div id="cardGroup">
        <button
          type="button"
          class="btn btn-primary pageBtn"
          onClick={previousPage}
        >
          Antes
        </button>
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

        <button
          type="button"
          class="btn btn-primary pageBtn"
          onClick={nextPage}
          ref={rightButton}
        >
          Depois
        </button>
      </div>
    </div>
  );
}

export default RowPageRow;
