var swiper=new Swiper(".team-slider", {
    loop:true,
    grabCursor:true,
    spaceBetween:20,
    breakpoints: {
        o: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 1,
        },
    }
});