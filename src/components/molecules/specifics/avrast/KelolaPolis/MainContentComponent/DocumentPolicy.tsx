import { CardMenuChildren, CardMenuDownload, CardMenuLink } from './CardMenu';
import { PolicyContent } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import { handleDownload } from '@/utils/helpers';
import { contentStringTransformer, singleImageTransformer } from '@/utils/responseTransformer';

export const DocumentPolicy = ({ policyContentData }: PolicyContent) => {
  const handleClickDownload = async (fileUrl: string, fileName: string) => {
   await handleDownload(fileUrl, fileName);
  }

  return (
    <div>
      <CardMenuLink
        desc="Panduan Pembayaran Premi"
        href="panduan-pembayaran-premi"
      />
      <div className="mt-[24px]">
        {Object.keys(policyContentData).map((category, index) => (
          <div key={index} className='mt-4'>
            <CardMenuChildren desc={category}>
            <div className="mt-[24px]">
              {policyContentData[category].map((item: any, itemIndex: number) => (
                <CardMenuDownload
                  key={itemIndex}
                  desc={contentStringTransformer(item.content['panduanpolis-namaformulir'])}
                  href={singleImageTransformer(item.content['panduanpolis-formulir']).imageUrl}
                  onDownload={handleClickDownload}          
                />
              ))}
            </div>
          </CardMenuChildren>
          </div>
        ))}
      </div>
      <div className="mt-[24px]">
        <CardMenuLink desc="Masuk untuk mengetahui informasi polis Anda" href='https://my.avrist.com/welcome'/>
      </div>
    </div>
  );
};
