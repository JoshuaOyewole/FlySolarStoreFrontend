import Container from "../../../components/Container";
import CarouselCard1 from "../../../components/carousel-cards/carousel-card-1";

// LOCAL CUSTOM COMPONENT
import CarouselBanner from "./carousel-banner";
import carouselData from "../../../data/market-1/data";
// API FUNCTIONS

export default async function Section1() {
  /* 
  const response = await fetch("http://localhost:5001/api/landing-page", {
    cache: "force-cache",
  });
  const res = await response.json();

  const carouselss = res.data.carousels; 
console.log("Carousel Data:", carouselss); 
*/
  const carousels = carouselData.carouselData;

  if (!carousels || carousels.length === 0) return null;

  return (
    <Container>
      <CarouselBanner>
        {carousels.map((item, ind) => (
          <CarouselCard1
            key={ind}
            title={item.title}
            imgUrl={item.imgUrl}
            buttonLink={item.buttonLink}
            buttonText={item.buttonText}
            description={item.description}
          />
        ))}
      </CarouselBanner>
    </Container>
  );
}
