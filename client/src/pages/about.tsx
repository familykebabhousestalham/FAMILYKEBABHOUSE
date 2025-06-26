import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, Star, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-poppins text-5xl font-bold mb-6 flex items-center justify-center gap-3">
            🏛️ About Family Kebab House 🏛️
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto flex items-center justify-center gap-2">
            🥙 Norwich & Stalham's Premier Kebab & Pizza Shop - Serving authentic Mediterranean cuisine for over 20 years 🍕
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-white text-primary px-4 py-2 text-lg">
              <Award className="mr-2 h-5 w-5" />
              20+ Years Experience
            </Badge>
            <Badge className="bg-white text-primary px-4 py-2 text-lg">
              <Star className="mr-2 h-5 w-5" />
              100% Fresh Daily
            </Badge>
            <Badge className="bg-white text-primary px-4 py-2 text-lg">
              <Users className="mr-2 h-5 w-5" />
              Family Run
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-poppins text-3xl font-bold text-charcoal mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                For over 20 years, Family Kebab House has stood proud on 79 High Street, Stalham NR12 9BB—your go-to Norwich kebab shop, Stalham kebab house and Norwich premier kebab shop. We're family-run, serving 100% fresh daily dough, premium halal meats and crisp salads.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Whether you're hunting for a late-night bite in Norwich city or picking up party platters in Stalham, we've got you covered. Our commitment to quality and authentic flavors has made us a local legend, celebrating two decades with loyal fans from Norwich, Aylsham Road, Magdalen Street and beyond.
              </p>
              <a href="tel:01692584100">
                <Button className="bg-primary hover:bg-red-700 text-white px-8 py-3 text-lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 01692 584100
                </Button>
              </a>
            </div>
            <div className="relative">
              <img 
                src="/Family-kebab-house/attached_assets/FAMILY KEBAB HOUSE STALHAM LOGO_1750363798831.jpg"
                alt="Family Kebab House Logo"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-4 rounded-2xl shadow-lg">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm">Years Serving</div>
              </div>
            </div>
          </div>

          {/* Why We Rank #1 */}
          <div className="mb-16">
            <h2 className="font-poppins text-3xl font-bold text-charcoal text-center mb-12">Why We Rank #1 for "Kebab Shop Near Me"</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mb-3">Local Legends</h3>
                  <p className="text-gray-600">Celebrating two decades with loyal fans from Norwich, Aylsham Road, Magdalen Street and beyond.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mb-3">Always Fresh</h3>
                  <p className="text-gray-600">Our artisan flatbreads are hand-stretched each morning; all proteins and produce are never frozen.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mb-3">Natural Ingredients</h3>
                  <p className="text-gray-600">Hormone-free chicken, prime lamb, seasonal veggies—nothing artificial.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mb-3">Party Orders Welcome</h3>
                  <p className="text-gray-600">Large gatherings love our Kebab Feast, Family Deal platters and lunchtime combos.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mb-3">Extended Hours</h3>
                  <p className="text-gray-600">Open 7 days a week with convenient hours to serve you when you need us most.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mb-3">Perfect Location</h3>
                  <p className="text-gray-600">Conveniently located on High Street, Stalham - easy to find and visit.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Signature Menu Highlights */}
          <div className="mb-16">
            <h2 className="font-poppins text-3xl font-bold text-charcoal text-center mb-12">Our Signature Menu Highlights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-primary mb-3">Doner Kebab</h3>
                  <p className="text-gray-600">Thinly sliced lamb, seasoned & spit-roasted, wrapped in warm pitta.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-primary mb-3">Shish Kebab</h3>
                  <p className="text-gray-600">Oriental-herb-marinated lamb fillet cubes, flame-grilled to juicy perfection.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-primary mb-3">Chicken Kebab</h3>
                  <p className="text-gray-600">Breast of chicken, marinated and char-grilled for that signature smoky edge.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-primary mb-3">Kofte Kebab</h3>
                  <p className="text-gray-600">Hand-crafted lamb patties with parsley & spices, barbecued over an open flame.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-primary mb-3">Arda Mix</h3>
                  <p className="text-gray-600">A generous platter of Doner, Shish, Chicken & Kofte—ideal for sharing.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-primary mb-3">Gourmet Pizzas</h3>
                  <p className="text-gray-600">10″ & 12″ pizzas on 100% daily-fresh dough. From Margherita to our signature Doner Pizza.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-16">
            <h2 className="font-poppins text-3xl font-bold text-charcoal text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-primary mb-3">Do you deliver?</h3>
                  <p className="text-gray-600">We do not offer delivery—our focus is on fastest takeaway & in-house service.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-primary mb-3">Are your salads gluten-free?</h3>
                  <p className="text-gray-600">Yes, all salads are naturally gluten-free; full allergen info is available on request.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-primary mb-3">What are your opening hours?</h3>
                  <p className="text-gray-600">Mon–Thu & Sun: 12:00–22:30 | Fri–Sat: 12:00–23:00. Closed only Christmas Day and Boxing Day.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-primary mb-3">Can I order party platters?</h3>
                  <p className="text-gray-600">Absolutely—call us at 01692 584 100 to arrange your Kebab Feast or Family Deal.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-accent to-orange-600 rounded-2xl p-12 text-center text-white">
            <h2 className="font-poppins text-3xl font-bold mb-4">Ready to Dig In?</h2>
            <p className="text-xl text-orange-100 mb-8">Experience Norwich & Stalham's premier kebab shop today!</p>
            <div className="grid md:grid-cols-3 gap-6">
              <a href="tel:01692584100">
                <Button className="bg-white text-accent hover:bg-gray-100 w-full py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  01692 584 100
                </Button>
              </a>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span className="font-semibold">Visit Us</span>
                </div>
                <p>79 High St, Stalham NR12 9BB</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="mr-2 h-5 w-5" />
                  <span className="font-semibold">Order Ready</span>
                </div>
                <p>In just 15 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}