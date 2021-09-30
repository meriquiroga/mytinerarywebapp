import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
  } from 'reactstrap';

const items = [
  [
    {src: './assets/buenos_aires.jpg', altText: 'Argentina', caption: 'Buenos Aires'},
    {src: './assets/dubai.jpg', altText: 'United Arab Emirates', caption: 'Dubai'},
    {src: './assets/amsterdam.jpg', altText: 'Netherlands', caption: 'Amsterdam'},
    {src: './assets/estambul.jpg', altText: 'Turkey', caption: 'Istanbul'},
  ],
  [
    {src: './assets/london.jpg', altText: 'United Kingdom', caption: 'London'},
    {src: './assets/new_york.jpg', altText: 'U.S.A.', caption: 'New York'},
    {src: './assets/rome.jpg', altText: 'Italy', caption: 'Rome'},
    {src: './assets/sidney.jpg', altText: 'Australia', caption: 'Sydney'},
  ],
  [
    {src: './assets/tokio.jpg', altText: 'Japan', caption: 'Tokio'},
    {src: './assets/madrid.jpg', altText: 'Spain', caption: 'Madrid'},
    {src: './assets/new_delhi.jpg', altText: 'India', caption: 'New Delhi'},
    {src: './assets/paris.jpg', altText: 'France', caption: 'Paris'},
  ]
];

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item, index) => {               
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        
        <div className="slide-container">
        {item.map((city) => (
          <div key={city.caption} className="city_img" style = {{backgroundImage:`url('${city.src}')`}}>
            <div>
              <h4 className="hSlides">{city.caption}</h4>
              <p className="pSlides">{city.altText}</p>           
            </div>
          </div>
        )
        )}
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel className='myCarousel'
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText=" " onClickHandler={previous} />
      <CarouselControl direction="next" directionText=" " onClickHandler={next} />
    </Carousel>
  );
}

export default MyCarousel;