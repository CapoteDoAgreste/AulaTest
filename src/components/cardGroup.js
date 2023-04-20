function CardGroup(digimon01, digimon02, digimon03, digimon04, digimon05) {
  return (
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
  );
}

export default CardGroup;
