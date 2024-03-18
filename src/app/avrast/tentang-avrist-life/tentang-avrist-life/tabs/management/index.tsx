import People1 from '@/assets/images/avrast/management-1.svg';
import People2 from '@/assets/images/avrast/management-2.svg';
import People3 from '@/assets/images/avrast/management-3.svg';
import People4 from '@/assets/images/avrast/management-4.svg';
import People5 from '@/assets/images/avrast/management-5.svg';
import Button from '@/components/atoms/Button/Button';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import PersonCard from '@/components/molecules/specifics/avrast/Cards/PersonCard';

const Manajemen = () => {
  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <div className="flex flex-col gap-4 px-[32px] py-[50px] sm:px-[136px] sm:py-[72px]">
        <PersonCard
          heading="Presiden Direktur"
          cards={[
            {
              name: 'Simon Imanto',
              role: 'Presiden Direktur',
              image: People1
            }
          ]}
          roleClassname="text-purple_dark"
        />
        <PersonCard
          heading="Dewan Direksi"
          cards={[
            {
              name: 'Ian F. Natapradja',
              role: 'Direktur',
              image: People2
            },
            {
              name: 'Jos C. Irawan',
              role: 'Direktur',
              image: People3
            }
          ]}
          roleClassname="text-purple_dark"
        />
        <PersonCard
          heading="Dewan Komisaris"
          cards={[
            {
              name: 'Jannes H.',
              role: 'Komisaris Independen',
              image: People4
            },
            {
              name: 'Angela A. Kalim',
              role: 'Komisaris Independen',
              image: People5
            },
            {
              name: 'Angela A. Kalim',
              role: 'Komisaris Independen',
              image: People5
            }
          ]}
          roleClassname="text-purple_dark"
        />
        <div className="flex flex-col gap-4 items-center justify-center w-full p-10">
          <div className="flex justify-center items-center p-10">
            <p className="text-[56px] font-bold text-purple_dark">
              Struktur Organisasi
            </p>
          </div>
          <div className="w-full flex flex-row justify-between items-center p-4 border rounded-xl">
            <p className="font-bold">
              Komitmen Kami untuk memberikan solusi investasi berkualitas.
            </p>
            <Button
              title="Lihat"
              customButtonClass="bg-purple_dark rounded-lg"
              customTextClass="text-white font-bold"
            />
          </div>
        </div>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default Manajemen;
