import React from "react";

import News from "@/components/molecules/News/News";
import ReksaDanaUnggulan from "@/components/molecules/specifics/avram/ReksaDanaUnggulan";


const Avram = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ReksaDanaUnggulan />
      <News />
    </div>
  );
};

export default Avram;
