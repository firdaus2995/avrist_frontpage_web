import React from 'react';
import Button from '@/components/atoms/Button/Button';

interface IDownloadFileButton {
  title: string;
  fileType: string;
}

const DownloadFileButton: React.FC<IDownloadFileButton> = ({
  title,
  fileType
}) => {
  return (
    <div className="flex flex-row gap-4 justify-between border border-gray_light rounded-xl p-4">
      <div className="flex flex-row gap-4 items-center">
        <h1 className="font-bold text-xl 2xl:text-2xl">{title}</h1>
        <p className="bg-purple_superlight text-purple_dark text-xs 2xl:text-sm p-1 font-semibold">
          {fileType}
        </p>
      </div>
      <Button
        title="Unduh"
        customButtonClass="bg-purple_dark rounded-lg"
        customTextClass="text-white"
      />
    </div>
  );
};

export default DownloadFileButton;
