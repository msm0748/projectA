const form = document.querySelector("#search__form");
const searchContents = document.querySelector(".search__contents");
let searchValue;
let movieNames = new Array();
let openDate = new Array();
let movieListLiIndex;
// function formSubmit(){

const ani = document.querySelector(".search__contents .inner");

const contentArrow = searchContents.querySelector(".content__arrow");
contentArrow.addEventListener("click", function () {
  ani.style.animationName = "none";
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchContents.style.display = "block";
  searchValue = document.getElementById("search__value").value;
  searchValue = encodeURIComponent(searchValue);
  movieSearchFnc(searchValue);
});
const movieList = document.querySelector(".search__detail");

let searchMovieArray = new Array();

async function movieSearchFnc(movieName) {
  searchMovieArray = [];
  let moviePosterValue = {
    key: `?ServiceKey=RKHFT107IUJ283GC7UPM`,
    collection: `&collection=kmdb_new2`,
    title: `&title=${movieName}`,
    sort: `&sort=prodYear,1`,
  };
  let url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp${moviePosterValue.key}${moviePosterValue.collection}${moviePosterValue.title}${moviePosterValue.sort}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  while (movieList.hasChildNodes()) {
    movieList.removeChild(movieList.firstChild);
  } //이미 movieList가 있는경우 초기화(쌓이는거 방지)
  const dataResult = data.Data[0].Result;
  let searchMovieObj = {};
  for (let i = 0; i < dataResult.length; i++) {
    let posters = dataResult[i].posters;
    let mainPoster = posters.split("|")[0]; //여러개 이미지를 |를 기준으로 잘라서 첫번째 배열을 가져오기
    const openingDate = dataResult[i].repRlsDate;
    const directorNm = dataResult[i].directors.director[0].directorNm;
    const actor = dataResult[i].actors.actor;
    const runtime = dataResult[i].runtime;
    const genre = dataResult[i].genre.replace(/,/g, ", ");
    const rating = dataResult[i].rating;
    const nation = dataResult[i].nation;
    const plots = dataResult[i].plots.plot[0].plotText;
    const company = dataResult[i].company;
    let title = dataResult[i].title;
    title = title.replace(/\!HS/g, "");
    title = title.replace(/\!HE/g, "");
    title = title.replace(/^\s+|\s+$/g, "");
    title = title.replace(/ +/g, " ");
    if (
      title &&
      mainPoster &&
      openingDate &&
      directorNm &&
      actor &&
      runtime &&
      genre &&
      rating &&
      nation &&
      plots &&
      company
    ) {
      const movieListLi = document.createElement("li");
      const posterTag = document.createElement("img");
      const titleTag = document.createElement("p");
      const titleStrongTag = document.createElement("strong");
      const plotTag = document.createElement("p");
      const ratingTag = document.createElement("p");
      const genreTag = document.createElement("p");
      const openingDateTag = document.createElement("p");
      const movieArt = document.createElement("div");
      movieArt.classList.add("movieArt");
      const moviePoster = document.createElement("div");
      posterTag.src = mainPoster;
      titleStrongTag.innerText = title;
      openingDateTag.innerText = openingDate.slice(0, 4);
      genreTag.innerText = genre;
      ratingTag.innerText = rating;
      plotTag.innerText = plots;
      titleTag.appendChild(titleStrongTag);
      moviePoster.appendChild(posterTag);
      movieListLi.appendChild(moviePoster);
      movieArt.appendChild(titleTag);
      movieArt.appendChild(openingDateTag);
      movieArt.appendChild(genreTag);
      movieArt.appendChild(ratingTag);
      movieArt.appendChild(plotTag);
      movieListLi.appendChild(movieArt);
      movieList.appendChild(movieListLi);

      searchMovieObj = {
        title: title,
        poster: mainPoster,
        openingDate: openingDate,
        directorNm: directorNm,
        actor: actor,
        runtime: runtime,
        genre: genre,
        rating: rating,
        nation: nation,
        plots: plots,
        company: company,
      };
      searchMovieArray.push(searchMovieObj);
    }
  }
  movieClick();
  console.log(searchMovieArray);
}

function movieClick() {
  movieListLiIndex = movieList.querySelectorAll("li");
  if (movieListLiIndex) {
    for (let i = 0; i < movieListLiIndex.length; i++) {
      movieListLiIndex[i].addEventListener("click", function () {
        modal.classList.toggle("show");
        if (modal.classList.contains("show")) {
          body.style.overflow = "hidden";
        }
        const title = searchMovieArray[i].title;
        const poster = searchMovieArray[i].poster;
        const openingDate = searchMovieArray[i].openingDate;
        const directorNm = searchMovieArray[i].directorNm;
        const actor = searchMovieArray[i].actor;
        const runtime = searchMovieArray[i].runtime;
        const genre = searchMovieArray[i].genre;
        const rating = searchMovieArray[i].rating;
        const nation = searchMovieArray[i].nation;
        const plots = searchMovieArray[i].plots;
        const company = searchMovieArray[i].company;
        kmdbFn(
          title,
          poster,
          openingDate,
          directorNm,
          actor,
          runtime,
          genre,
          rating,
          nation,
          plots,
          company
        );
      });
    }
  }
}

const body = document.querySelector("body");

body.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show");

    if (!modal.classList.contains("show")) {
      body.style.overflow = "auto";
    }
  }
});

const modal = document.querySelector(".modal");
const modalPosterImg = modal.querySelector(".poster img");
const modalMovieNameLi = modal.querySelector(".movie__name strong");
const modalOpeningDateLi = modal.querySelector(".open__date");
const modalDirectorNmLi = modal.querySelector(".director__name");
const modalActorNmLi = modal.querySelector(".actor__name");
const modalGenreSpan = modal.querySelector(".genre");
const modalNationSpan = modal.querySelector(".nation");
const modalRatingSpan = modal.querySelector(".rating");
const modalRuntimeSpan = modal.querySelector(".runtime");
const modalCompanyLi = modal.querySelector(".company");
const modalPlotLi = modal.querySelector(".plot");

function kmdbFn(
  title,
  poster,
  openingDate,
  directorNm,
  actor,
  runtime,
  genre,
  rating,
  nation,
  plots,
  company
) {
  let actorTextnode = "배우 : ";
  modalMovieNameLi.innerText = title;
  modalPosterImg.src = poster;
  modalOpeningDateLi.innerText = openingDate;
  modalDirectorNmLi.innerText = directorNm;
  modalActorNmLi.innerText = "";
  if (actor.length > 1) {
    for (let i = 0; i < actor.length; i++) {
      if (actor.length >= 5) {
        // 배우 최대 10명만 출력
        if (i <= 5) {
          actorTextnode += `${actor[i].actorNm}, `;
        }
      } else {
        actorTextnode += `${actor[i].actorNm}, `;
      }
    }
  }
  actorTextnode = actorTextnode.slice(0, -2);
  console.log(actorTextnode);
  modalActorNmLi.innerText = actorTextnode;
  modalRuntimeSpan.innerText = runtime;
  modalGenreSpan.innerText = genre;
  modalRatingSpan.innerText = rating;
  modalNationSpan.innerText = nation;
  modalPlotLi.innerText = plots;
  modalCompanyLi.innerText = company;
}
