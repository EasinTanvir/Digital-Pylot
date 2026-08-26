const photoBase = "https://images.unsplash.com";

export function getHeroContent() {
  return {
    eyebrow: "100% Trusted Car rental platform in the UK",
    title: "FAST AND EASY WAY TO RENT A CAR",
    description:
      "Our Car Rental online booking system designed to meet the specific needs of car rental businesses owners. The easy-to-use car rental software will let you manage your business.",
    bookingLabel: "Booking Now",
    fleetLabel: "See all cars",
    image: `${photoBase}/photo-1636881636420-e15142c0bf56?auto=format&fit=crop&w=1800&q=85`,
    imageAlt: "Black rental SUV parked beside trees",
  };
}

export function getFrontEndContent() {
  return {
    brand: "Drivo",
    navigation: ["How it works", "Our fleet", "Why Drivo", "Reviews"],
    hero: {
      eyebrow: "Premium car rental, made simple",
      title: "Find the perfect car for every journey.",
      description:
        "From city escapes to long weekends, book a vehicle you will love in just a few clicks.",
      image: `${photoBase}/photo-1636881636420-e15142c0bf56?auto=format&fit=crop&w=1800&q=85`,
    },
    searchFields: [
      { label: "Pick-up location", value: "London, United Kingdom" },
      { label: "Pick-up date", value: "12 Jun 2026" },
      { label: "Pick-up time", value: "10:00 AM" },
      { label: "Return date", value: "16 Jun 2026" },
    ],
    steps: [
      {
        number: "01",
        title: "Choose a location",
        description: "Pick from convenient locations across the country.",
      },
      {
        number: "02",
        title: "Select your dates",
        description: "Tell us when your adventure begins and ends.",
      },
      {
        number: "03",
        title: "Drive away happy",
        description: "Reserve your car and get on the road with confidence.",
      },
    ],
    categories: ["All vehicles", "SUV", "Luxury", "Electric"],
    vehicles: [
      {
        id: "velar",
        category: "SUV",
        name: "Range Rover Velar",
        type: "Automatic · 5 seats",
        price: 89,
        image: `${photoBase}/photo-1636881636420-e15142c0bf56?auto=format&fit=crop&w=900&q=80`,
      },
      {
        id: "model-y",
        category: "Electric",
        name: "Tesla Model Y",
        type: "Automatic · 5 seats",
        price: 79,
        image: `${photoBase}/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80`,
      },
      {
        id: "a5",
        category: "Luxury",
        name: "Audi A5 Sportback",
        type: "Automatic · 5 seats",
        price: 95,
        image: `${photoBase}/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80`,
      },
      {
        id: "xc60",
        category: "SUV",
        name: "Volvo XC60",
        type: "Automatic · 5 seats",
        price: 82,
        image: `${photoBase}/photo-1645791608306-6db92b84d498?auto=format&fit=crop&w=900&q=80`,
      },
    ],
    benefits: [
      {
        title: "24/7 customer support",
        description: "Friendly help whenever you need it, wherever you are.",
      },
      {
        title: "Best price guarantee",
        description:
          "Clear prices, no surprises, and excellent value every time.",
      },
      {
        title: "Flexible bookings",
        description: "Plans change. Update or cancel your booking with ease.",
      },
    ],
    testimonials: [
      {
        name: "Maya Thompson",
        role: "Weekend explorer",
        quote:
          "The whole experience was effortless. Our car was spotless and ready exactly when we arrived.",
      },
      {
        name: "James Wilson",
        role: "Business traveller",
        quote:
          "Great value, great service, and a genuinely easy booking process. I will definitely use Drivo again.",
      },
      {
        name: "Sofia Malik",
        role: "City break planner",
        quote:
          "The perfect car made our trip. The support team were brilliant from start to finish.",
      },
    ],
  };
}
