import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Star, Heart, Check, ChevronLeft, ChevronRight, ChefHat } from "lucide-react";
import Testimonials from "@/components/testimonials";
import FoodGallery from "@/components/food-gallery";
import FoodRecommendation from "@/components/food-recommendation";
import AIRecommendationPopup from "@/components/ai-recommendation-popup";
import FloatingAIButton from "@/components/floating-ai-button";

import AddToBasketButton from "@/components/add-to-basket-button";
import { useScreenReaderAnnouncements } from "@/components/screen-reader-announcements";
import { useGlobalVoiceControl } from "@/hooks/use-global-voice-control";
import "./home-hero-bg.css";

interface HomeProps {
  // Props interface kept for future extensibility
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [hasVisitedAI, setHasVisitedAI] = useState(false);
  const { announce } = useScreenReaderAnnouncements();
  useGlobalVoiceControl();

  const foodSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      title: "🥙 Authentic Doner Kebabs",
      description: "Tender lamb, perfectly seasoned and slow-cooked on our traditional spit",
      emoji: "🤤",
      price: "From £8.50"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      title: "🍕 Fresh Daily Pizza",
      description: "Hand-stretched dough made fresh every morning with premium toppings",
      emoji: "😋",
      price: "From £7.70"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      title: "🍔 Quarter Pounder",
      description: "¼ Pounder with cheese and your choice of fresh salad",
      emoji: "🔥",
      price: "£5.50"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      title: "🔥 Spicy Wings",
      description: "Crispy wings with our secret blend of spices that'll make you crave more",
      emoji: "🌶️",
      price: "From £4.70"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      title: "🌯 Fresh Wraps",
      description: "Packed with flavor and fresh ingredients in our warm tortillas",
      emoji: "🤗",
      price: "From £8.50"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodSlides.length);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, [foodSlides.length]);

  useEffect(() => {
    // Show AI popup after 10 seconds if user hasn't interacted with AI recommendations
    const popupTimer = setTimeout(() => {
      if (!hasVisitedAI) {
        setShowAIPopup(true);
      }
    }, 10000);

    return () => clearInterval(popupTimer);
  }, [hasVisitedAI]);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % foodSlides.length;
    setCurrentSlide(nextIndex);
    announce(`Showing slide ${nextIndex + 1} of ${foodSlides.length}: ${foodSlides[nextIndex].title}`);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + foodSlides.length) % foodSlides.length;
    setCurrentSlide(prevIndex);
    announce(`Showing slide ${prevIndex + 1} of ${foodSlides.length}: ${foodSlides[prevIndex].title}`);
  };

  const handleAIRecommendationsClick = () => {
    setHasVisitedAI(true);
    setShowAIPopup(false);
    
    // Scroll to AI recommendations section
    const aiSection = document.getElementById('ai-recommendations');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClosePopup = () => {
    setShowAIPopup(false);
  };

  const specialOffers = [
    {
      id: "lunch-chicken-burger",
      name: "Lunch Special",
      description: "Chicken Burger + Chips & Drink",
      price: 7.90,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "family-deal-12", 
      name: "Family Deal (12\" Pizza)",
      description: "12\" Pizza + 6 Nuggets + Chicken Burger + 2 Fried Chicken + 2 Chips + Drink",
      price: 28.90,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "kebab-feast",
      name: "Kebab Feast", 
      description: "Doner + Shish + Chicken + Kofte Kebabs + Salad + 3 Pitta + 2 Sauces + Large Chips",
      price: 30.00,
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat home-hero-bg"
        />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-6">
              <Badge className="bg-accent-gold text-charcoal px-4 py-2 text-sm font-semibold">
                <Star className="mr-2 h-4 w-4" />
                NATURAL FOOD • FRESH DAILY 100%
              </Badge>
            </div>
            
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
              Family <span className="text-accent-gold">Kebab</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-200 leading-relaxed font-semibold">
              Kebab & Pizza
            </p>
            
            <p className="text-lg mb-2 text-accent-gold font-bold">
              PARTY ORDER WELCOME
            </p>
            
            <p className="text-base mb-8 text-gray-200">
              CASH PAYMENT ONLY • YOUR ORDER WILL BE READY IN 15 MIN
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <a href="tel:01692584100" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-brand-primary text-white hover:bg-red-700 transform hover:scale-105 transition-all font-semibold">
                  <Phone className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  01692 584 100
                </Button>
              </a>
              <Link to="/menu" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-accent-gold text-charcoal hover:bg-yellow-600 font-semibold">
                  View Full Menu
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center text-xs sm:text-sm px-4">
              <div className="flex items-center text-center">
                <MapPin className="text-accent-gold mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="font-semibold">79 HIGH STREET, STALHAM NR12 9BB</span>
              </div>
              <div className="text-center">
                <p className="text-accent-gold font-bold mb-2">WE ARE OPEN 7 DAYS WEEK</p>
                <p className="text-white mb-2">ONLY CLOSED CHRISTMAS DAY AND BOXING DAY</p>
                <div className="space-y-1">
                  <p className="text-white"><strong>MON-THU-SUN:</strong> 12noon to 10:30pm</p>
                  <p className="text-white"><strong>FRI-SAT:</strong> 12noon to 11pm</p>
                </div>
              </div>
              <div className="flex items-center text-center">
                <Clock className="text-accent-gold mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-accent-gold font-bold">LUNCH TIME OFFERS: 12 NOON TO 2:30PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Slideshow Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12 px-4">
            🤤 Craving Something Delicious? 🤤
          </h2>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Main Slideshow */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {foodSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="max-w-2xl">
                      <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-2 sm:mb-4 animate-bounce">
                        {slide.emoji}
                      </div>
                      <h3 className="font-poppins text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 transform animate-slide-up">
                        {slide.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-3 sm:mb-6 transform animate-slide-up animation-delay-200">
                        {slide.description}
                      </p>
                      <div className="space-y-2 sm:space-y-4 transform animate-slide-up animation-delay-400">
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent-gold">
                          {slide.price}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <AddToBasketButton 
                            item={{
                              id: `slideshow-${slide.id}`,
                              name: slide.title,
                              category: 'featured',
                              singlePrice: parseFloat(slide.price.replace(/[£From ]/g, '')) || 0,
                              description: slide.description
                            }}
                            className="flex-1 bg-accent-gold text-charcoal hover:bg-yellow-600 text-sm sm:text-base"
                          />
                          <a href="tel:01692584100" className="flex-1 sm:flex-none">
                            <Button size="sm" variant="outline" className="w-full bg-white/90 hover:bg-white text-charcoal font-bold px-4 py-2 sm:px-6 sm:py-4 transition-all duration-300 text-sm sm:text-base">
                              <Phone className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                              Call Now
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              title="Previous Slide"
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={nextSlide}
              title="Next Slide"
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
              {foodSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  title={`Go to slide ${index + 1}`}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-accent-gold scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Preview */}
          <div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4 px-4">
            {foodSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                title={`Preview ${slide.title}`}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-2 sm:ring-4 ring-accent-gold scale-110' 
                    : 'ring-1 sm:ring-2 ring-white/30 hover:ring-white/60 hover:scale-105'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Hunger-Inducing Call to Action */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <div className="bg-gradient-to-r from-primary to-accent p-4 sm:p-6 md:p-8 rounded-2xl max-w-3xl mx-auto">
              <h3 className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                🤤 Can't Decide? We Don't Blame You! 🤤
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-100 mb-4 sm:mb-6">
                Every dish is prepared with love and the freshest ingredients. Call now and treat yourself to something amazing!
              </p>
              <a href="tel:01692584100">
                <Button size="lg" className="w-full sm:w-auto bg-accent-gold text-charcoal hover:bg-yellow-600 font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  🍽️ I'm Hungry - Call Now!
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-primary to-red-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Special Offers</h2>
              <p className="text-red-100 text-sm sm:text-base md:text-lg">Fresh ingredients • Unbeatable value • Ready in 15 minutes</p>
            </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {specialOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden transform hover:scale-105 transition-transform h-full flex flex-col">
                <img 
                  src={offer.image} 
                  alt={offer.name}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                />
                <CardContent className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                  <h3 className="font-poppins text-lg sm:text-xl font-bold text-charcoal mb-2">{offer.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base flex-grow">{offer.description}</p>
                  <div className="space-y-2 sm:space-y-3 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-primary">£{offer.price.toFixed(2)}</span>
                    </div>
                    <AddToBasketButton 
                      item={{
                        id: `home-offer-${offer.id}`,
                        name: offer.name,
                        category: 'special-offers',
                        singlePrice: offer.price,
                        description: offer.description
                      }}
                      className="w-full text-sm sm:text-base"
                    />
                    <a href="tel:01692584100" aria-label={`Order ${offer.name} now by calling 01692 584 100`}>
                      <Button variant="outline" className="w-full text-sm sm:text-base">
                        Call to Order
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-poppins text-5xl font-bold text-charcoal mb-6">About Family Kebab</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  For over <strong className="text-brand-primary">20 years</strong>, Family Kebab House has been Stalham's premier kebab and pizza destination, serving authentic Mediterranean cuisine with pride.
                </p>
                <p>
                  We use only <strong className="text-accent-gold">100% fresh daily ingredients</strong> and natural cooking methods. All orders are prepared fresh and ready in just 15 minutes!
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary mb-2">20+</div>
                  <div className="text-gray-600">Years Serving</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-gold mb-2">100%</div>
                  <div className="text-gray-600">Fresh Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary mb-2">15</div>
                  <div className="text-gray-600">Minutes Ready</div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button className="bg-accent-gold text-charcoal hover:bg-yellow-600 font-semibold">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Family restaurant kitchen with fresh food preparation" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-poppins text-xl font-bold text-charcoal mb-4 flex items-center">
                    <Heart className="text-brand-primary mr-3 h-5 w-5" />
                    Why Choose Family Kebab?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <Check className="text-accent-gold mr-3 h-4 w-4" />
                      100% fresh daily natural food
                    </li>
                    <li className="flex items-center">
                      <Check className="text-accent-gold mr-3 h-4 w-4" />
                      Orders ready in just 15 minutes
                    </li>
                    <li className="flex items-center">
                      <Check className="text-accent-gold mr-3 h-4 w-4" />
                      Party orders welcome
                    </li>
                    <li className="flex items-center">
                      <Check className="text-accent-gold mr-3 h-4 w-4" />
                      Open 7 days a week
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Food Allergies Notice */}
      <section className="py-16 bg-gradient-to-r from-accent-gold to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
            Food Allergies & Intolerances
          </h2>
          <p className="text-gray-800 text-xl mb-8">Please speak to our staff about the ingredients in your meal when making your order. Thank You.</p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="text-3xl font-bold text-charcoal mb-4">100% DAILY FRESH DOUGH</div>
            <div className="grid md:grid-cols-2 gap-6 text-charcoal">
              <div>
                <h3 className="font-bold mb-2">Opening Hours:</h3>
                <p>MON-THU-SUN: 12noon to 10:30pm</p>
                <p>FRI-SAT: 12noon to 11pm</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Lunch Time Offers:</h3>
                <p className="font-semibold">12 NOON TO 2:30PM</p>
                <p>Available 7 days a week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Resolution Food Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
              📸 Our Delicious Food Gallery
            </h2>
            <p className="text-lg text-gray-600">
              Feast your eyes on our mouth-watering dishes - all made fresh daily with authentic ingredients
            </p>
          </div>
          <FoodGallery />
        </div>
      </section>

      <div id="ai-recommendations">
        <FoodRecommendation />
      </div>
      
      <Testimonials />

      {/* Quick Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-8">Ready to Order?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Call us now and your delicious meal will be ready in just 15 minutes! 
            We're located at 79 High Street, Stalham NR12 9BB. <strong>Cash payment only.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/meal-builder">
              <Button size="lg" className="bg-accent text-charcoal hover:bg-yellow-600 font-semibold">
                <ChefHat className="mr-3 h-5 w-5" />
                Build Your Meal
              </Button>
            </Link>
            <a href="tel:01692584100">
              <Button size="lg" className="bg-brand-primary text-white hover:bg-red-700 font-semibold">
                <Phone className="mr-3 h-5 w-5" />
                01692 584 100
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="bg-gray-600 text-white hover:bg-gray-700 font-semibold">
                <MapPin className="mr-3 h-5 w-5" />
                Get Directions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Recommendation Popup */}
      {showAIPopup && (
        <AIRecommendationPopup
          onClose={handleClosePopup}
          onGetRecommendations={handleAIRecommendationsClick}
        />
      )}

      {/* Floating AI Button */}
      <FloatingAIButton onClick={handleAIRecommendationsClick} />
    </div>
  );
}
