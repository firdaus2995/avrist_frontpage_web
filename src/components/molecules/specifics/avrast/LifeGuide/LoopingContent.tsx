import React, { Key } from 'react';
import VideoPlayer from '../Klaim/VideoPlayer';
import { ImageArtikel } from './ImageArticle';
import { Paragraph } from './Paragraph';
import { SubJudul } from './SubJudul';

type ParamProps = {
  data: Record<string, unknown>[];
};

export const LoopingContent: React.FC<ParamProps> = ({ data }: ParamProps) => {
  return (
    <>
      {!!data &&
        data?.map((artikel: any, idx: Key) => {
          return (
            <div key={idx}>
              {artikel?.details?.map((item: any) => {
                const { id, fieldId, value } = item;

                if (
                  !!value &&
                  JSON.stringify(value) !== '"-"' &&
                  JSON.stringify(value) !== '"<p>-</p>"'
                ) {
                  switch (fieldId) {
                    case 'subjudul':
                      return <SubJudul title={value} key={`${idx}_${id}`} />;
                    case 'paragraf-satu':
                      return <Paragraph data={value} key={`${idx}_${id}`} />;
                    case 'paragraf-dua':
                      return <Paragraph data={value} key={`${idx}_${id}`} />;
                    case 'paragraf-tiga':
                      return <Paragraph data={value} key={`${idx}_${id}`} />;
                    case 'artikel-image':
                      return (
                        <ImageArtikel
                          data={JSON.parse(value)}
                          key={`${idx}_${id}`}
                        />
                      );
                    case 'artikel-video':
                      return (
                        <div
                          key={`${idx}_${id}`}
                          className="w-full h-[650px] mb-10"
                        >
                          <VideoPlayer
                            thumbnail=""
                            url={value}
                            color="purple_dark"
                          />
                        </div>
                      );
                    default:
                      return null;
                  }
                }
              })}
            </div>
          );
        })}
    </>
  );
};
