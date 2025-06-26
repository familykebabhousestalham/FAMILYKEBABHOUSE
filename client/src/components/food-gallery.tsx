import { useState } from "react";
import { Card } from "@/components/ui/card"; // Removed CardContent
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, Phone } from "lucide-react";
import AddToBasketButton from "@/components/add-to-basket-button";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  price?: string;
  emoji: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "doner-kebab-1",
    src: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "Authentic Doner Kebab",
    category: "Kebabs",
    description: "Tender lamb, perfectly seasoned and slow-cooked on our traditional spit",
    price: "From £8.50",
    emoji: "🥙"
  },
  {
    id: "pizza-margherita",
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "Fresh Margherita Pizza",
    category: "Pizzas",
    description: "Hand-stretched dough made fresh daily with premium mozzarella",
    price: "From £8.00",
    emoji: "🍕"
  },
  {
    id: "2oz-burger",
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "2oz Burger",
    category: "Burgers",
    description: "2oz beef burger with cheese and your choice of fresh salad",
    price: "£3.50",
    emoji: "🍔"
  },
  {
    id: "spicy-wings",
    src: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "Spicy Wings",
    category: "Wings",
    description: "Crispy wings with our secret blend of spices",
    price: "From £4.40",
    emoji: "🔥"
  },
  {
    id: "chicken-wrap",
    src: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "Chicken Wrap",
    category: "Wraps",
    description: "Packed with flavor and fresh ingredients",
    price: "From £8.50",
    emoji: "🌯"
  },
  {
    id: "mixed-grill",
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "Mixed Grill",
    category: "Specials",
    description: "A feast of our finest meats grilled to perfection",
    price: "From £15.00",
    emoji: "🍽️"
  },
  {
    id: "fresh-salad",
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "Fresh Garden Salad",
    category: "Salads",
    description: "Crisp vegetables with our house dressing",
    price: "From £3.50",
    emoji: "🥗"
  },
  {
    id: "lamb-shish",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    title: "Lamb Shish Kebab",
    category: "Kebabs",
    description: "Marinated lamb cubes grilled over open flame",
    price: "From £9.50",
    emoji: "🍢"
  }
];

interface FoodGalleryProps {
  readonly selectedCategory?: string;
}

export default function FoodGallery({ selectedCategory: initialCategory = "all" }: FoodGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ["all", "kebabs", "pizzas", "burgers", "wings", "wraps", "specials", "salads"];

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "hover:bg-primary/10"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">No dishes found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        ) : (
          filteredImages.map((image) => (
          <Card
            key={image.id}
            className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                hoveredImage === image.id ? "opacity-100" : "opacity-0"
              }`}>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-2xl mb-2">{image.emoji}</div>
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200 mb-2">{image.description}</p>
                  {image.price && (
                    <div className="text-accent-gold font-bold">{image.price}</div>
                  )}
                </div>
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ZoomIn className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <Badge className="absolute top-3 left-3 bg-primary text-white">
                {image.category}
              </Badge>
            </div>
          </Card>
          ))
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              title="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid md:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-4">{selectedImage.emoji}</div>
                  <Badge className="mb-4 bg-primary text-white">
                    {selectedImage.category}
                  </Badge>
                  <h2 className="font-poppins text-3xl font-bold text-charcoal mb-4">
                    {selectedImage.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    {selectedImage.description}
                  </p>
                  {selectedImage.price && (
                    <div className="text-2xl font-bold text-primary mb-8">
                      {selectedImage.price}
                    </div>
                  )}
                </div>

                {/* Call to Action */}
                <div className="space-y-4">
                  <AddToBasketButton 
                    item={{
                      id: `gallery-${selectedImage.id}`,
                      name: selectedImage.title,
                      category: selectedImage.category.toLowerCase(),
                      singlePrice: parseFloat(selectedImage.price?.replace(/[£From ]/g, '') ?? '0') ?? 0,
                      description: selectedImage.description
                    }}
                    className="w-full"
                  />
                  <a href="tel:01692584100">
                    <Button size="lg" variant="outline" className="w-full py-4">
                      <Phone className="mr-2 h-5 w-5" />
                      Call to Order
                    </Button>
                  </a>
                  <p className="text-center text-sm text-gray-500">
                    Call 01692 584 100 - Ready in 15 minutes!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
