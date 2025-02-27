export interface iPhoneLandingPageProps {
  imagePath: string;
  imagePath2?:string;
  imagePath3?:string
  rightBanner?: string;
  leftBanner?: string;
  mainBanner?: string;
}
export interface LayoutProps {
  children: React.ReactNode;
  logoPath: string;
}