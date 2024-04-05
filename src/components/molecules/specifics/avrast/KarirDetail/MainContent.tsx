import Image from 'next/image';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';
import Icon from '@/components/atoms/Icon';

export const MainContent = () => {
  return (
    <div className=" w-full flex flex-col  relative bottom-[70px]">
      <div className="bg-white rounded-t-[80px] w-full min-h-[60px]">
        <div className="px-[136px] py-[100px]">
          <div className="ml-[48px]">
            <p className="font-karla font-bold text-[56px]">
              Marketing Manager
            </p>
            <div className="mt-[16px] flex justify-between">
              <div className="flex font-opensans font-normal text-[18px] text-gray_body">
                <div className="flex mr-[16px]">
                  <Icon
                    name="mapsPin"
                    color="purple_verylight"
                    height={24}
                    width={24}
                  />
                  <p className="ml-[8px]">Jakarta, Indonesia</p>
                </div>
                <div className="flex mr-[16px]">
                  <Icon
                    name="briefcase"
                    color="purple_verylight"
                    height={24}
                    width={24}
                  />
                  <p className="ml-[8px]">Full time</p>
                </div>
                <div className="flex mr-[16px]">
                  <Icon
                    name="clock"
                    color="purple_verylight"
                    height={24}
                    width={24}
                  />
                  <p className="ml-[8px]">6 hari lalu</p>
                </div>
              </div>
              <button className="flex flex-col items-center">
                <Icon
                  name="share"
                  color="purple_verylight"
                  height={24}
                  width={24}
                />
                <p className="font-bold">Share</p>
              </button>
            </div>
            <p className="font-karla font-bold text-[36px] text-purple_dark mt-[24px]">
              Definisi Pekerjaan
            </p>
            <p className="font-opensans font-normal text-[20px] text-gray_body mt-[24px]">
              Lorem ipsum dolor sit amet consectetur. Nec in ipsum est vitae
              libero non placerat integer nunc. Nulla tincidunt enim luctus id
              in. Risus fames integer diam tristique. Nunc at suscipit ornare
              tortor ut eleifend lectus lorem malesuada. Quam non augue sit quis
              pretium placerat. Nisi leo id volutpat faucibus nec vitae
              elementum. Integer eu vitae faucibus sed mi arcu. Vitae arcu
              lectus faucibus orci in potenti ut nulla. Nisl viverra morbi purus
              purus blandit nulla. Tincidunt ipsum ut scelerisque donec nibh
              faucibus tortor. Enim ut facilisi elementum facilisis lorem et
              felis. Lacus eget id quis vel gravida eget. Et purus pellentesque
              a pretium mauris. Consequat vitae dolor praesent dignissim. Tortor
              faucibus quis lacinia nunc id. Faucibus odio pharetra adipiscing
              maecenas ac suspendisse sed dictum. Ut mi netus in rhoncus mollis.
              Malesuada consequat tempus ut porttitor nibh nulla accumsan turpis
              nam. Dis id felis nisi sed lectus varius nullam vulputate at.
              Vitae venenatis libero mus congue turpis. Penatibus congue viverra
              suspendisse consequat dignissim purus sed nunc suspendisse.
              Aliquam mi enim malesuada nunc turpis enim. Molestie id amet
              facilisi pretium ac. Proin sit et amet id id consectetur quis mi.
              Purus dignissim condimentum tortor sed auctor at. Eget neque lorem
              turpis elit arcu tristique. Tortor laoreet nibh faucibus ipsum
              elementum. Libero sed feugiat est sem vel sagittis. Ullamcorper
              sit pellentesque sed viverra sed mauris praesent imperdiet. Diam
              tortor est felis eget sed. Mus ornare duis purus amet proin ut ut.
              Tellus ut urna egestas velit augue. Natoque accumsan pellentesque
              nec quisque praesent nunc .
            </p>
            <button className="mt-[48px] w-[252px] h-[52px] px-10 py-3 bg-purple_dark rounded-lg justify-center items-center gap-2 inline-flex">
              <span className="text-center text-white text-xl font-semibold font-opensans leading-7">
                Apply For This Job
              </span>
            </button>
            <div className="mt-[48px] w-full h-[88px] p-6 bg-white rounded-xl shadow border border-neutral-300 justify-start items-center gap-6 inline-flex">
              <div className="grow shrink basis-0 h-[30px] justify-start items-start gap-3 flex">
                <div className="text-purple_dark text-2xl font-bold font-['Source Sans Pro']">
                  Belum tertarik dengan lowongan ini?
                </div>
              </div>
              <button className="h-10 px-5 py-2 bg-purple_dark rounded-md justify-center items-center gap-2 flex">
                <span className="text-center text-white text-base font-semibold font-opensans leading-normal">
                  List Lowongan
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Image
        alt="border-bottom"
        className="w-full h-auto"
        src={ROUNDED_FRAME_BOTTOM}
        style={{ userSelect: 'none' }}
      />
    </div>
  );
};
