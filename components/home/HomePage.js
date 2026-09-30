import Seo from '../Seo';
import HomeHero from './HomeHero';
import { StepsStrip, AppBento, FoundSplit, PointsRow, PlaySplit, PlusOffer, PromiseBlock, TogetherCards, DownloadBand } from './sections';

export default function HomePage() {
  return (
    <>
      <Seo />
      <div className="home page page-home">
        <HomeHero />
        <StepsStrip />
        <AppBento />
        <FoundSplit />
        <PointsRow />
        <PlaySplit />
        <PlusOffer />
        <PromiseBlock />
        <TogetherCards />
        <DownloadBand />
      </div>
    </>
  );
}
