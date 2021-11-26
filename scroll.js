function scrollMovieSize() {
    let iframeScrollState = true; //무한 실행을 막기 위한 상태값추가
    const iframeHeight = iframe.clientHeight;

    document.addEventListener("scroll", function() {
        if(document.documentElement.scrollTop > iframeHeight && iframeScrollState) {
            iframe.classList.add("small__size");
            iframeScrollState = false;
            console.log(iframeHeight);
        }else if(document.documentElement.scrollTop <= iframeHeight && !iframeScrollState){
            iframe.classList.remove("small__size");
            iframeScrollState = true;
        }
    });
}
scrollMovieSize(); // 동영상 재생 중 스크롤 랙걸리는 거 영상보다 스크롤 아래쪽으로 갔을 경우 iframe 크기를 축소해서 해결