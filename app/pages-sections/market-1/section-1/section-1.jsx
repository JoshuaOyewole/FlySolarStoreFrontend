import Container from "../../../components/Container";
import CarouselCard1 from "../../../components/carousel-cards/carousel-card-1";

// LOCAL CUSTOM COMPONENT
import CarouselBanner from "./carousel-banner";
//import carouselData from "../../../data/market-1/data";
// API FUNCTIONS

export default async function Section1() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/homepage/hero-banners`);
  const res = await response.json();

  const carousels = res.data;

  if (!carousels || carousels.length === 0) return null;

  return (
    <Container>
      <CarouselBanner>
        {carousels.map((item) => (
          <CarouselCard1
            key={item._id}
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
