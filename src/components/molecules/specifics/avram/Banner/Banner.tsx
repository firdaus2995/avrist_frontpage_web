import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '@/components/atoms/Button/Button';

interface IBanner {
  data: { category: string; title: string; btn: string; img: string }[];
}

const sliderSettings = {
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: true,
  pauseOnHover: true,
  speed: 1000,
  autoplaySpeed: 4500,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (
    dots:
      | string
      | number
      | boolean
      | React.ReactElement<
          unknown,
          string | React.JSXElementConstructor<unknown>
        >
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | React.PromiseLikeOfReactNode
      | null
      | undefined
  ) => (
    <div
      style={{
        position: 'absolute',
        left: 36,
        width: 150,
        bottom: 16
      }}
    >
      <ul style={{ margin: '0px' }}> {dots} </ul>
    </div>
  )
};

const Banner = ({ data }: IBanner) => {
  return (
    <Slider {...sliderSettings}>
      {data.map((data, index) => (
        <div key={index}>
          <div
            className="xs:h-[60vh] md:h-[40vh] bg-cover"
            style={{ backgroundImage: `url(${data.img})` }}
          >
            <div className="flex flex-col md:w-[30%] md:p-20 xs:p-10 gap-4">
              <p className="text-3xl text-bright-purple whitespace-nowrap xs:mt-20 md:mt-0">
                {data.category}
              </p>
              <p className="text-3xl font-black">{data.title}</p>
              <div>
                <Button
                  title={data.btn}
                  onClick={() => console.log('Button Clicked')}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
