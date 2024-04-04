import { ReactNode } from 'react';

interface BannerFooterProps {
  imageUrl?: string;
  children: ReactNode;
}

export const BannerFooter: React.FC<BannerFooterProps> = (props) => {
  const { imageUrl, children } = props;
  return (
    <div className="flex flex-col self-stretch items-center justify-center py-32 gap-16 bg-avrast_product_bg">
      <div className="w-full flex items-center justify-center gap-4 px-[136px]">
        <div
          className={`w-full md:h-[35vh] xs:h-[65vh] flex mb-10 md:flex-row xs:flex-col gap-4 rounded-xl bg-white items-center justify-center text-center`}
        >
          <div
            className={`md:w-1/2 xs:w-full flex h-full flex-col md:items-start`}
          >
            {children}
          </div>
          <div
            className={`md:w-1/2 xs:w-full h-full md:rounded-r-xl md:rounded-bl-none xs:rounded-b-xl flex flex-col items-end justify-end overflow-hidden relative`}
          >
            <img
              className="bg-purple_dark w-full h-full object-cover absolute md:top-0 xs:bottom-0 object-bottom"
              src={imageUrl}
              alt="banner-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
