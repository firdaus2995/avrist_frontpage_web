import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import NODE_SELECTED from '@/assets/images/node-selected.svg';
import NODE from '@/assets/images/node.svg';

interface IDataHistory {
  year: string;
  data: {
    title: string;
    desc: string;
  }[];
}

interface IFooterInformation {
  data: IDataHistory[];
}

const Timeline = ({ data }: IFooterInformation) => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemClick = (item: React.SetStateAction<string>) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    setSelectedItem(data[0].year);
  }, []);

  const settings = {
    focusOnSelect: true,
    infinite: false,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
    speed: 500
  };

  return (
    <ol className="items-center flex flex-col">
      <div className="flex justify-center items-center p-10">
        <p className="text-[56px] font-bold text-purple_dark">Sejarah</p>
      </div>
      <div className="flex flex-row w-full h-full items-center justify-center pb-1">
        {/* {data.map((val, idx) => (
          <li key={idx} className="relative mb-10 sm:mb-0 w-full">
            <div className="flex items-center">
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              {selectedItem === val.year ? (
                <div className="z-10 flex items-center justify-center w-7 h-7 bg-purple_dark rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              ) : (
                <div
                  role="button"
                  onClick={() => handleItemClick(val.year)}
                  className="z-10 flex items-center justify-center w-3 h-3 bg-purple_dark rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"
                >
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                </div>
              )}
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div
              role="button"
              onClick={() => handleItemClick(val.year)}
              className="w-full relative mt-10 flex justify-center"
            >
              <div
                className={`p-4 border rounded-xl ${selectedItem === val.year ? 'bg-purple_dark text-white' : 'border-purple_dark text-purple_dark'}`}
              >
                {val.year === '' ? '-' : val.year}
              </div>
            </div>
          </li>
        ))} */}
        <div className="w-full relative overflow-hidden">
          <div className="w-full absolute bg-purple_verylight h-[2px] mt-[1.375rem]" />
          <Slider {...settings}>
            {data.map((val, idx) => (
              <div
                key={idx}
                onFocus={() => handleItemClick(val.year)}
                className="pb-1"
              >
                <span className="flex flex-col items-center justify-center h-full gap-[1.5rem]">
                  <span className="w-[3rem] h-[3rem] flex items-center justify-center">
                    {selectedItem === val.year ? (
                      <Image
                        alt="timeline"
                        src={NODE_SELECTED}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <Image alt="timeline" src={NODE} width={16} height={16} />
                    )}
                  </span>
                  <button
                    className={`${selectedItem === val.year ? 'bg-purple_dark text-white' : 'bg-white border border-purple_dark text-purple_dark'} xs:p-[0.5rem] md:px-[2.5rem] md:py-[0.75rem] md:text-[1.25rem] rounded-lg`}
                  >
                    {val.year === '' ? '-' : val.year}
                  </button>
                </span>
              </div>
            ))}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Slider>
        </div>
      </div>
      <div className="w-full px-[2rem] md:px-[8.5rem] mt-10">
        <div className="mt-3 w-full flex flex-col gap-8 rounded-xl p-5 shadow-xl">
          {data
            .filter((val) => val.year === selectedItem)[0]
            .data.map((val, idx) => (
              <div className="flex flex-col gap-4 " key={idx}>
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                  {val.title}
                </h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400 font-opensans">
                  {val.desc}
                </p>
              </div>
            ))}
        </div>
      </div>
    </ol>
  );
};

export default Timeline;
