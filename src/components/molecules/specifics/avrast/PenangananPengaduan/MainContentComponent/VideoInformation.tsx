'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import YouTube from 'react-youtube';
import MainCard from '../../Klaim/PanduanKlaim/components/VideoCards/MainCard';
import { IVideoData } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import { contentStringTransformer } from '@/utils/responseTransformer';

const MOCK_VIDEO = (video: any) => ({
  id: 'sample-vid-1',
  videoUrl: contentStringTransformer(video['body-video']),
  videoThumbnail: '',
  type: 'Penanganan Pengaduan',
  color: 'purple_dark'
});

export const VideoInformation = ({
  pageVideoData
}: {
  pageVideoData: IVideoData;
}) => {
  const getVideoId = (url: string) => {
    if (!url) return '';
    const splittedUrl = url.split('/');
    const lastPiece = splittedUrl.at(-1);

    if (lastPiece && lastPiece.includes('watch')) {
      const anotherSplitted = lastPiece.split('?v=');
      return anotherSplitted.at(-1) ?? '';
    } else if (lastPiece && lastPiece.includes('?si=')) {
      const anotherSplitted = lastPiece.split('?si=');
      return anotherSplitted.at(0);
    } else if (lastPiece && lastPiece.includes('?')) {
      const videoIdParam = lastPiece.split('?')[0];
      return videoIdParam ?? '';
    }
    return lastPiece ?? '';
  };

  return (
    <div className="w-full">
      <div className="w-full m-auto flex flex-col gap-4">
        <div
          className={`transition-all hidden sm:grid rounded-xl visible opacity-100 overflow-hidden`}
        >
          <MainCard item={MOCK_VIDEO(pageVideoData)} />
        </div>
      </div>
      <div className="w-full sm:hidden h-[13rem] flex flex-col items-center justify-center">
        <YouTube
          videoId={getVideoId(
            contentStringTransformer(pageVideoData['body-video'])
          )}
          className="w-[100%] flex items-center justify-center"
          iframeClassName="-z-1 w-[100%] h-full rounded-t-xl"
        />
        <div className="flex w-[100%] items-center justify-center">
          <div
            className={`p-[0.75rem] w-[100%] bg-purple_dark rounded-b-xl text-white font-bold md:text-2xl font-karla flex flex-row justify-between`}
          >
            Penanganan Pengaduan
          </div>
        </div>
      </div>
    </div>
  );
};
