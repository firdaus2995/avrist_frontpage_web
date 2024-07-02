import React from 'react';
import Button from '@/components/atoms/Button/Button';

interface IDownloadFileButton {
  title: string;
  fileType: string;
  bgColor?: string;
  filePath?: string;
}

const DownloadFileButton: React.FC<IDownloadFileButton> = ({
  title,
  fileType = 'PDF',
  bgColor,
  filePath
}) => {
  const handleClickUnduh = () => {
    window.open(filePath, '_blank');
    // filePath && handleDownload(filePath);
  };

  return (
    <div
      className={`flex xs:flex-col md:flex-row items-center gap-[24px] justify-between border border-gray_light rounded-xl p-6 ${bgColor ?? 'bg-white'}`}
    >
      <div className="flex flex-row sm:gap-4 xs:gap-0 sm:items-center w-full ">
        <h1 className="font-bold 2xl:text-2xl min-w-[90%]">
          {title === '-' ? '' : title}
        </h1>
        <p className="bg-purple_superlight text-purple_dark text-xs 2xl:text-sm p-1 font-semibold xs:max-h-[30px]">
          {fileType}
        </p>
      </div>
      <div className="xs:w-full md:w-auto">
        <Button
          title="Unduh"
          customButtonClass="bg-purple_dark rounded-lg px-6 py-1"
          customTextClass="text-white text-[16px] font-semibold leading-[23.68px] font-opensans"
          onClick={handleClickUnduh}
        />
      </div>
    </div>
  );
};

export default DownloadFileButton;
