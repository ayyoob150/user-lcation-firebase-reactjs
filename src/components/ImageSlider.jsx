// ImageSlider.js
import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const images = ['https://www.tourmyindia.com/blog//wp-content/uploads/2018/08/Kerala-Flood-Relief.jpg',
'https://www.oxfamindia.org/themes/custom/oxfamfrontend/css/newpage/images/banner2.jpg',
'https://www.thehitavada.com/Encyc/2019/8/17/2_09_59_43_City-s-BJP-MLAs-contribute-Rs-2-lakh-each-for-flood-hit_1_H@@IGHT_445_W@@IDTH_704.jpg',
'https://c.ndtvimg.com/2019-08/1q2qhcns_maharashtra-floods-pti_625x300_14_August_19.jpg',
'https://images.moneycontrol.com/static-mcnews/2019/08/PTI8_12_2019_000172B.jpg?impolicy=website&width=1600&height=900'
];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);
  return (
    <div>
      <img className="slider1" src={images[currentImage]} alt="Slider" />
    </div>
  );
};

export default ImageSlider;