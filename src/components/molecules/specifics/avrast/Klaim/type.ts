export interface dataKlaim {
  titleImageUrl: string;
  titleAltText: string;
  bannerImageUrl: string;
  bannerAltText: string;
  footerInfoImageUrl: string;
  footerInfoAltText: string;
}

export interface IDataKlaim extends dataKlaim {
  file: string;
  popUpImage1: string;
  popUpImage2: string;
}
