'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainCard from '../../Klaim/PanduanKlaim/components/VideoCards/MainCard';
import VideoPlayer from '../../Klaim/VideoPlayer';
import { IVideoData } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import { getYouTubeId } from '@/utils/helpers';
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
        <VideoPlayer
          url={getYouTubeId(pageVideoData['body-video'].value) as string}
          color="purple_dark"
          mute
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
