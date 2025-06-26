import { Link } from "react-router-dom";
import { Utensils, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
                <Utensils className="text-white h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h3 className="font-dancing text-lg sm:text-xl font-bold">Family Kebab House</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Norwich's premier kebab shop serving authentic flavors for over 20 years. 
              Fresh ingredients, traditional recipes, exceptional service.
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-300 hover:text-white transition-colors">Menu</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-3 sm:mb-4 text-sm sm:text-base">Popular Items</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Doner Kebab</li>
              <li>Chicken Kebab</li>
              <li>Fresh Pizzas</li>
              <li>Family Deals</li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-poppins font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="text-primary mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4" />
                <a href="tel:01692584100" className="text-gray-300 hover:text-white transition-colors">01692 584100</a>
              </div>
              <div className="flex items-start">
                <MapPin className="text-primary mr-3 h-4 w-4 mt-1" />
                <span>79 High Street<br />Stalham, Norwich NR12 9BB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Family Kebab House. All rights reserved. |{" "}
            <span className="text-primary">Norwich's Premier Kebab Shop</span> |{" "}
            Serving authentic flavors since 2004
          </p>
        </div>
      </div>
    </footer>
  );
}
