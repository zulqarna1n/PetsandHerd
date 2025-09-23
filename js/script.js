const arrayImages = [
    { name: "image1", src: "./assets/hero-img1.jpg" },
    { name: "image2", src: "./assets/hero-img2.jpg" },
    { name: "image3", src: "./assets/hero-img3.jpg" }
  ];
  
  const imageHero = document.getElementById("hero-image");
  const radios = [
    document.getElementById("radio1"),
    document.getElementById("radio2"),
    document.getElementById("radio3"),
  ];
  
  let currentIndex = 0;
  
  function changeImage(index) {
    imageHero.src = arrayImages[index].src;
  
    // update radios
    radios.forEach((radio, i) => {
      radio.checked = i === index;
    });
  }
  
  function changeImageAuto() {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % arrayImages.length;
      changeImage(currentIndex);
    }, 5000);
  }
  
  // allow manual radio change
  radios.forEach((radio, index) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        currentIndex = index;
        changeImage(currentIndex);
      }
    });
  });
  
  changeImage(currentIndex); // load first image
  changeImageAuto(); // start auto cycle
  