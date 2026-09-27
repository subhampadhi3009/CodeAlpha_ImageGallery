let images = document.querySelectorAll(".image-card img");
let lightbox = document.querySelector(".lightbox");
let lightboxImage = document.querySelector(".lightbox-image");
let closeButton = document.querySelector(".lightbox-close");
let currentIndex = 0;
let visibleImages = [];
let prevButton = document.querySelector(".lightbox-prev");
let nextButton = document.querySelector(".lightbox-next");
let categories = document.querySelectorAll(".part");

visibleImages = Array.from(images);
categories[0].classList.add("active");

categories.forEach((category) => {
    category.addEventListener("click", () => {
        let selectedCategory = category.querySelector(".photo-name").innerText;
        categories.forEach((item) => {
            item.classList.remove("active");
        });
        category.classList.add("active");
        images.forEach((image) => {        
            if(selectedCategory === "All Photos"){
                image.parentElement.style.display = "block";
            }else if(image.classList.contains(selectedCategory.toLowerCase())){
                image.parentElement.style.display = "block";
            }else{
                image.parentElement.style.display = "none";
            }
        });
        visibleImages = Array.from(images).filter((image) => {
            return image.parentElement.style.display !== "none";
        });
        currentIndex = 0;
    });
});

images.forEach((image) => {
    image.parentElement.addEventListener("click", () => {
        currentIndex = visibleImages.indexOf(image);
        lightboxImage.src = image.src;
        lightbox.style.opacity = "1";
        lightbox.style.visibility = "visible";
    });
});

closeButton.addEventListener("click", () => {
    lightbox.style.opacity= "0";
    lightbox.style.visibility= "hidden";
});


nextButton.addEventListener("click", () => {
    currentIndex++;
    if(currentIndex >= visibleImages.length){
        currentIndex = 0;
    }
    lightboxImage.src = visibleImages[currentIndex].src;
});

prevButton.addEventListener("click", () => {
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = visibleImages.length - 1;
    }
    lightboxImage.src = visibleImages[currentIndex].src;
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        lightbox.style.opacity= "0";
        lightbox.style.visibility= "hidden";
    }else if(e.key === "ArrowRight"){
        nextButton.click();
    }else if(e.key === "ArrowLeft"){
        prevButton.click();
    }
});

lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox){
        lightbox.style.opacity = "0";
        lightbox.style.visibility = "hidden";
    }
});