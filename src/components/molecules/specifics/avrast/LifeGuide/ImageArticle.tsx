import Image from 'next/image';
import { BASE_URL } from '@/utils/baseUrl';

export const ImageArtikel: React.FC<{ data: Record<string, string>[] }> = ({
  data
}) => {
  const { imageUrl, altText } = data[0];
  if (imageUrl !== 'no-image') {
    return (
      <div className="flex flex-col py-3">
        <Image
          src={`${BASE_URL.image}/${imageUrl}`}
          alt={altText ?? ''}
          width={238}
          height={172}
          className="w-full"
        />
      </div>
    );
  }
};
