'use client';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import Slider from 'react-slick';

interface CategoryPillsProps {
  buttonTitle: string[];
  selectedCategory?: string;
  buttonActiveClassname?: string;
  buttonInactiveClassname?: string;
  buttonActiveTextClassname?: string;
  buttonInactiveTextClassname?: string;
  links?: Record<string, string>;
}

const CategoryPills: React.FC<CategoryPillsProps> = ({
  buttonTitle,
  selectedCategory,
  buttonActiveClassname,
  buttonInactiveClassname,
  buttonActiveTextClassname,
  buttonInactiveTextClassname,
  links
}) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <div className="xs:hidden md:block">
        <div className="flex xs:flex-wrap sm:flex-nowrap w-full justify-between gap-[12px] items-stretch">
          {buttonTitle.map((item, index) => {
            const link = links?.[item] || '';
            return link.startsWith('/') ? (
              <div className="w-full min-h-full items-stretch">
                <Link href={link}>
                  <button
                    key={index}
                    className={`${selectedCategory === item ? buttonActiveClassname : buttonInactiveClassname} w-full min-h-full border-1 rounded-lg px-[20px] py-[8px] cursor-pointer`}
                  >
                    <span
                      className={`${selectedCategory === item ? buttonActiveTextClassname : buttonInactiveTextClassname} font-semibold text-[16px] font-opensans`}
                    >
                      {item}
                    </span>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="w-full min-h-full items-stretch">
                <ScrollLink
                  activeClass="active"
                  to={link}
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  <button
                    key={index}
                    className={`${selectedCategory === item ? buttonActiveClassname : buttonInactiveClassname} w-full h-full border-1 rounded-lg px-[15px] py-[8px] cursor-pointer`}
                  >
                    <span
                      className={`${selectedCategory === item ? buttonActiveTextClassname : buttonInactiveTextClassname} font-semibold text-[16px]`}
                    >
                      {item}
                    </span>
                  </button>
                </ScrollLink>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full">
        <Slider {...sliderSettings} className="slick-slider-gap">
          {buttonTitle.map((item, index) => {
            const link = links?.[item] || '';
            return link.startsWith('/') ? (
              <div className="px-1">
                <Link href={link}>
                  <button
                    key={index}
                    className={`${selectedCategory === item ? buttonActiveClassname : buttonInactiveClassname} w-full min-h-full border-1 rounded-lg py-[8px] cursor-pointer`}
                  >
                    <span
                      className={`${selectedCategory === item ? buttonActiveTextClassname : buttonInactiveTextClassname} font-semibold text-[16px] font-opensans`}
                    >
                      {item}
                    </span>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="w-full min-h-full items-stretch">
                <ScrollLink
                  activeClass="active"
                  to={link}
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  <button
                    key={index}
                    className={`${selectedCategory === item ? buttonActiveClassname : buttonInactiveClassname} w-full h-full border-1 rounded-lg cursor-pointer`}
                  >
                    <span
                      className={`${selectedCategory === item ? buttonActiveTextClassname : buttonInactiveTextClassname} font-semibold text-[16px]`}
                    >
                      {item}
                    </span>
                  </button>
                </ScrollLink>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default CategoryPills;
