
const parentValue = opener.document.getElementById("search__value").value;
const sectionTag = document.querySelector('section');
const movieList = document.querySelector(".movieList")
let movieId = new Array;
let movieNames = new Array;
let openDate;
async function tmdbFnc() {
    const tmdbKey = `?api_key=41f75eb2a340b43d08889b0cf8f98a89`;
    const korea = `&language=ko-KR`;
    const movieQuery = `&query=${parentValue}`;
    let moveLankingUrl = `https://api.themoviedb.org/3/search/movie${tmdbKey}${korea}${movieQuery}`;
    const response = await fetch(moveLankingUrl);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.results.length; i++) {
        movieId.push(data.results[i].id);
        movieNames.push(data.results[i].title);
        const movieListLi = document.createElement('li');
        const posterTag = document.createElement('img');
        const titleTag = document.createElement('h2');
        const plotTag = document.createElement('p');
        const movieArt = document.createElement("div");
        movieArt.classList.add("movieArt");
        const moviePoster = document.createElement('div');
        posterTag.src = `https://www.themoviedb.org/t/p/original${data.results[i].poster_path}`;
        titleTag.innerText = data.results[i].title;
        plotTag.innerText = data.results[i].overview;
        
        // console.log(data.results[i]);
        // console.log(data.results[i].overview);
        if (data.results[i].overview === "") {
            plotTag.innerText = `해당 영화 줄거리를 찾을 수 없습니다.`;
        }
        moviePoster.appendChild(posterTag);
        movieListLi.appendChild(moviePoster);
        movieArt.appendChild(titleTag);
        movieArt.appendChild(plotTag);
        movieListLi.appendChild(movieArt);
        movieList.appendChild(movieListLi);
        
    }
}
// tmdbFnc();

async function TmdbDetailFnc(movieId) {
    const tmdbKey = `?api_key=41f75eb2a340b43d08889b0cf8f98a89`;
    const korea = `&language=ko-KR`;
    const rating = `&append_to_response=release_dates`;
    let moveLankingUrl = `https://api.themoviedb.org/3/movie/${tmdbKey}${korea}${movieQuery}${rating}`;

    const response = await fetch(moveLankingUrl);
    const data = await response.json();
    console.log(data);
}






async function idTmdbFnc(movieId) {
    const tmdbKey = `?api_key=41f75eb2a340b43d08889b0cf8f98a89`;
    let moveLankingUrl = `https://api.themoviedb.org/3/movie/${movieId}/release_dates${tmdbKey}`;
    const response = await fetch(moveLankingUrl);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].iso_3166_1 === "KR") {
            openDate = data.results[i].release_dates[0].release_date.slice(0, 10).replace(/-/gi, "");
            break;
        }
    }
}

const movieNameLi = document.querySelector(".movie__name strong");
const openingDateLi = document.querySelector(".open__date");
const rankingLi = document.querySelector(".ranking");
const directorNmLi = document.querySelector(".director__name");
const actorNmLi = document.querySelector(".actor__name");
const genreSpan = document.querySelector(".genre");
const nationSpan = document.querySelector(".nation");
const ratingSpan = document.querySelector(".rating");
const runtimeSpan = document.querySelector(".runtime");
const countTag = document.querySelector(".counting");
const companyLi = document.querySelector(".company");
const plotLi = document.querySelector(".plot");

async function kmdbFn(movieNm, open) {
    let moviePosterValue = {
        key: `?ServiceKey=RKHFT107IUJ283GC7UPM`,
        collection: `&collection=kmdb_new2`,
        title: `&title=${movieNm}`,
        openDay: `&releaseDts=${open}`,
    };
    let url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp${moviePosterValue.key}${moviePosterValue.collection}${moviePosterValue.title}${moviePosterValue.openDay}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    const dataResult = data.Data[0].Result[0];
    actorNmLi.innerText = "";
    let actor = dataResult.actors.actor;
    // let posters = dataResult.posters;
    // let mainPoster = posters.split("|")[0]; //여러개 이미지를 |를 기준으로 잘라서 첫번째 배열을 가져오기
    // dataResult.poster = mainPoster;
    // dataResult.openingDate = dataResult.repRlsDate;
    for (let i = 0; i < actor.length; i++) {
        if (actor.length >= 10) {
            // 배우 최대 10명만 출력
            if (i < 9) {
                actorTextnode = document.createTextNode(
                    actor[i].actorNm + ", "
                );
            } else if (i === 9) {
                actorTextnode = document.createTextNode(
                    actor[9].actorNm
                );
            }
        } else {
            if (i < actor.length - 1) {
                actorTextnode = document.createTextNode(
                    actor[i].actorNm + ", "
                );
            } else {
                actorTextnode = document.createTextNode(
                    actor[i].actorNm
                );
            }
        }
        actorNmLi.appendChild(actorTextnode);
    }
    directorNmLi.innerText =
        dataResult.directors.director[0].directorNm;
    // actorNmLi.innerText = dataResult.actors.actor;
    runtimeSpan.innerText = dataResult.runtime;
    genreSpan.innerText = dataResult.genre;
    ratingSpan.innerText = dataResult.rating;
    nationSpan.innerText = dataResult.nation;
    plotLi.innerText = dataResult.plots.plot[0].plotText;
    companyLi.innerText = dataResult.company;
    console.log(data.Data[0].Result);
}
// const posterImg = document.querySelectorAll(".swiper-slide img");
// const posterP = document.querySelectorAll(".swiper-slide p");
// const posterLi = document.querySelectorAll(".swiper-slide");





const body = document.querySelector('body');
const modal = document.querySelector('.modal');
// const btnOpenPopup = document.querySelector('.btn-open-popup');

// btnOpenPopup.addEventListener('click', () => {
//     modal.classList.toggle('show');

//     if (modal.classList.contains('show')) {
//         body.style.overflow = 'hidden';
//     }
// });

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.toggle('show');

        if (!modal.classList.contains('show')) {
            body.style.overflow = 'auto';
        }
    }
});




function titleClick() {
    const li = document.querySelectorAll('.movieList li');
    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener("click", async function() {
            modal.classList.toggle('show');

            if (modal.classList.contains('show')) {
                body.style.overflow = 'hidden';
            }
            console.log(i);
            await idTmdbFnc(movieId[i]);
            await kmdbFn(movieNames[i], openDate);
            // console.log(movieNames[i]);
            // console.log(openDate);
        })
    }
}


async function start() {
    await tmdbFnc();
    await titleClick();
}
start();




// async function abc(){
//     let moviePosterValue = {
//       key: `?ServiceKey=RKHFT107IUJ283GC7UPM`,
//       collection: `&collection=kmdb_new2`,
//       title: `&title=${parentValue}`,
//     };
//     let url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp${moviePosterValue.key}${moviePosterValue.collection}${moviePosterValue.title}&sort=prodYear,1`;
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data.Data[0].Result);
//     for(let i = 0; i < data.Data[0].Result.length; i++){
//         let title = data.Data[0].Result[i].title;
//         title = title.replace(/\!HS/g, "");
//         title = title.replace(/\!HE/g, "");
//         title = title.replace(/^\s+|\s+$/g, "");
//         title = title.replace(/ +/g, " ");
//         const poster = data.Data[0].Result[i].posters.split("|")[0];
//     const posterTag = document.createElement('img');
//     const titleTag = document.createElement('h2');
//     const plotTag = document.createElement('p');
//     posterTag.src = poster;
//     titleTag.innerText = title;
//     plotTag.innerText = data.Data[0].Result[i].plots.plot[0].plotText;

//     sectionTag.appendChild(posterTag);
//     sectionTag.appendChild(titleTag);
//     sectionTag.appendChild(plotTag);

// }
// }
// abc();





