import { ReactElement, useState } from 'react';
import Image from 'next/image';
import PlayButton from '@/assets/images/play-button.svg';
import Button from '@/components/atoms/Button/Button';
import { VideoModal } from '@/components/molecules/specifics/avrast/Modal/VideoModal';
import { getYouTubeId } from '@/utils/helpers';

interface ISliderInformation {
  title: ReactElement;
  buttonTitle?: string;
  image: string;
  isVideo?: boolean;
  bgColor?: string;
  imageClassName?: string;
}

const SliderInformation = ({
  title,
  buttonTitle,
  image,
  isVideo,
  bgColor,
  imageClassName
}: ISliderInformation) => {
  const imageUrl = isVideo
    ? `https://img.youtube.com/vi/${getYouTubeId(image)}/hqdefault.jpg`
    : image;

  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex mx-auto container py-[72px] bg-white w-full">
        <div
          className={`grid sm:grid-cols-2 grid-cols-1 rounded-[24px] ${bgColor ? `bg-${bgColor}` : 'bg-white'} border`}
        >
           <div className="sm:order-first order-last flex flex-col gap-[24px] items-start justify-center p-[36px]">
            <div>{title}</div>
            {buttonTitle && <Button title={buttonTitle} />}
          </div>
          <div
            className={`flex relative ${isVideo && 'cursor-pointer'}`}
            onClick={() => isVideo && setShow(true)}
          >
            <Image
              height={0}
              width={0}
              alt="sliderInformationImage"
              className={`min-h-[400px] w-full object-cover ${imageClassName} rounded-r-3xl`}
              src={imageUrl}
            />
            {isVideo && (
              <div className="w-full h-full absolute flex items-center justify-center">
                <Image alt={'play-button'} className="w-16" src={PlayButton} />
              </div>
            )}
          </div>
        </div>
      </div>

      <VideoModal
        show={show}
        onClose={() => {
          setShow(!show);
        }}
        videoUrl={getYouTubeId(image) ?? ''}
      />
    </>
  );
};

export default SliderInformation;
