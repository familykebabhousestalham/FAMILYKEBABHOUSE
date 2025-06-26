import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  foodImage: string;
  favoriteOrder: string;
  emoji: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Norwich",
    rating: 5,
    text: "Absolutely amazing! The doner kebab is the best I've ever had. Fresh ingredients, perfectly seasoned meat, and the staff are so friendly. Been coming here for 3 years and it never disappoints!",
    foodImage: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    favoriteOrder: "Large Doner Kebab",
    emoji: "😍"
  },
  {
    id: "2",
    name: "Mike Thompson",
    location: "Stalham",
    rating: 5,
    text: "Family Kebab House is our go-to for Friday night takeaway! The pizza dough is made fresh daily and you can really taste the difference. The family deals are great value too.",
    foodImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    favoriteOrder: "12\" Pepperoni Pizza",
    emoji: "🤤"
  },
  {
    id: "3",
    name: "Emma Davies",
    location: "Aylsham Road",
    rating: 5,
    text: "The chicken burger is incredible! Juicy, flavorful, and served with perfectly crispy chips. Always ready in exactly 15 minutes as promised. Highly recommend!",
    foodImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    favoriteOrder: "Chicken Fillet Burger & Chips",
    emoji: "🔥"
  },
  {
    id: "4",
    name: "James Wilson",
    location: "Magdalen Street",
    rating: 5,
    text: "Been ordering from here for over 10 years! The quality has always been consistent and the portions are generous. The spicy wings are addictive - you have to try them!",
    foodImage: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    favoriteOrder: "8 pcs Spicy Wings",
    emoji: "🌶️"
  },
  {
    id: "5",
    name: "Lisa Brown",
    location: "Norwich City Centre",
    rating: 5,
    text: "Perfect for lunch breaks! The lunch offers are amazing value and the food is always fresh. The staff remember my order now - that's real customer service!",
    foodImage: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    favoriteOrder: "Chicken Wrap & Drink",
    emoji: "💯"
  },
  {
    id: "6",
    name: "David Martinez",
    location: "Stalham",
    rating: 5,
    text: "Family-run business that really cares about their customers. The mixed kebab is a feast! Fresh salad, tender meat, and their special sauce is the secret ingredient.",
    foodImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    favoriteOrder: "Mixed Kebab",
    emoji: "👨‍👩‍👧‍👦"
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
            💬 What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Real reviews from real customers who love our authentic food
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Food Image */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={currentData.foodImage}
                    alt={currentData.favoriteOrder}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-1">{currentData.emoji}</div>
                    <p className="font-semibold">{currentData.favoriteOrder}</p>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="p-8 flex flex-col justify-center">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    "{currentData.text}"
                  </p>

                  <div className="flex items-center mb-4">
                    {[...Array(currentData.rating)].map((_, i) => (
                      <Star key={`${currentData.id}-star-${i}`} className="h-5 w-5 text-accent-gold fill-current" />
                    ))}
                  </div>

                  <div>
                    <p className="font-bold text-charcoal text-lg">{currentData.name}</p>
                    <p className="text-gray-600">{currentData.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-primary hover:bg-red-700 text-white p-3 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={testimonials[index].id}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-primary' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="bg-primary hover:bg-red-700 text-white p-3 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Quick Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentTestimonial(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="text-xl mr-2">{testimonial.emoji}</div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`${testimonial.id}-star-${i}`} className="h-4 w-4 text-accent-gold fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                  "{testimonial.text}"
                </p>
                <div className="text-xs">
                  <p className="font-semibold text-charcoal">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
