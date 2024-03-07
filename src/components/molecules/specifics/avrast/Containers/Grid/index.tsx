import React from "react"

interface IGridContainer {
  children: React.ReactNode,
  gridCols: number,
  bgColor?: string,
}

const GridContainer = ({
  children,
  gridCols,
  bgColor = 'white',
}: IGridContainer) => {
  return (
    <div className={`grid grid-cols-${gridCols} px-[136px] py-[72px] gap-[64px] bg-${bgColor}`}>
      {children}
    </div>
  )
};

export default GridContainer;
