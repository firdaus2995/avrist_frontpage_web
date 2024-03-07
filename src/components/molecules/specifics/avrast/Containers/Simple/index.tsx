import React from "react"

interface ISimpleContainer {
  children: React.ReactNode,
  bgColor?: string,
}

const SimpleContainer = ({
  children,
  bgColor = 'white',
}: ISimpleContainer) => {
  return (
    <div className={`flex flex-col justify-center px-[136px] py-[72px] gap-[64px] bg-${bgColor}`}>
      {children}
    </div>
  )
};

export default SimpleContainer;
