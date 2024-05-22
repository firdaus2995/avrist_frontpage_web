import React from "react";
import Image from "next/image";
import { FacebookShareButton, LinkedinShareButton, EmailShareButton } from "react-share";
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import Email from '@/assets/images/common/email_color.svg';
import Facebook from '@/assets/images/common/facebook_color.svg';
import Linkedin from '@/assets/images/common/linkedin_color.svg';
import Whatsapp from '@/assets/images/common/wa.svg';
import Icon from '@/components/atoms/Icon';

interface ContentPopoverProps {
    isOpenPopover: boolean,
    message: any,
    setIsOPenPopover?: any;
}

const ContentPopover: React.FC<ContentPopoverProps> = ({isOpenPopover, setIsOPenPopover, message}) => {
    
    const shareWa = () => {
        const messageFormat = message?.split('<p>')?.join('')?.split('</p>')?.join(' ')
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageFormat)}%20${encodeURIComponent(window?.location.href)}`;
        window?.open(shareUrl, '_blank')
    };

    return (
        <UncontrolledPopover
            placement="right"
            target="PopoverFocus"
            trigger="focus"
            isOpen={isOpenPopover}
            toggle={() => setIsOPenPopover(false)}
        >
            <PopoverBody className="absolute right-0 mt-[30px] z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2 lg:min-w-[350px]">
            <div className="py-1 flex flex-row gap-5 xs:max-md:flex-wrap" role="none">
                <div className="flex flex-col gap-1 items-center xs:max-md:m-auto" onClick={() => window?.open('https://api.whatsapp.com/send?text=BMKG:%20Kelembapan%20Kota%20Padang%20Diprediksi%2075-95%%20(Senin,%2020%20Mei%202024%20hingga%20Minggu,%2026%20Mei%202024)%20https://databoks.katadata.co.id/datapublish/2024/05/20/bmkg-kelembapan-kota-padang-diprediksi-75-95-senin-20-mei-2024-hingga-minggu-26-mei-2024-', '_blank')}>
                    <Image
                        role="button"
                        onClick={shareWa}
                        className="h-auto w-5"
                        src={Whatsapp}
                        alt="whatsapp"
                    />
                    <div className="text-xs font-bold cursor-pointer">Whatsapp</div>
                </div>
                <EmailShareButton className="flex flex-col gap-1 items-center xs:max-md:m-auto" url={encodeURIComponent(window?.location.href)}>
                    <Image
                        role="button"
                        // onClick={() => setIsVisible(!isVisible)}
                        className="h-auto w-5"
                        src={Email}
                        alt="email"
                    />
                    <div className="text-xs font-bold cursor-pointer">Email</div>
                </EmailShareButton>
                <LinkedinShareButton className="flex flex-col gap-1 items-center xs:max-md:m-auto" url={encodeURIComponent(window?.location.href)}>
                    <Image
                        role="button"
                        // onClick={() => setIsVisible(!isVisible)}
                        className="h-auto w-5"
                        src={Linkedin}
                        alt="linkedin"
                    />
                    <div className="text-xs font-bold cursor-pointer">LinkedIn</div>
                </LinkedinShareButton>
                <FacebookShareButton className="flex flex-col gap-1 items-center xs:max-md:m-auto" url={encodeURIComponent(window?.location.href)}>
                    <Image
                        role="button"
                        // onClick={() => setIsVisible(!isVisible)}
                        className="h-auto w-5"
                        src={Facebook}
                        alt="facebook"
                    />
                    <div className="text-xs font-bold cursor-pointer">Facebook</div>
                </FacebookShareButton>
                <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                <div
                    role="button"
                    className="items-center"
                    // onClick={() => setIsVisible(!isVisible)}
                >
                    <Icon
                    width={18}
                    height={18}
                    name="copyUrl"
                    color="purple_verylight"
                    />
                </div>
                <div className="text-xs font-bold cursor-pointer">Copy URL</div>
                </div>
            </div>
            </PopoverBody>
        </UncontrolledPopover>
    )
};

export default ContentPopover;
