import Container from "../../../components/Container";
import CarouselCard1 from "../../../components/carousel-cards/carousel-card-1";

// LOCAL CUSTOM COMPONENT
import CarouselBanner from "./carousel-banner";

// API FUNCTIONS

export default async function Section1() {
  const response = await fetch("http://localhost:5001/api/landing-page", {
    cache: "force-cache",
  });
  const res = await response.json();

  const carousels = res.data.carousels;

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
