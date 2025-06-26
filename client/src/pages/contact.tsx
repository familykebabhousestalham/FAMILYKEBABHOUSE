import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, AlertTriangle, Users, CreditCard, Heart } from "lucide-react";

export default function Contact() {
  const openingHours = [
    { day: "Monday - Sunday", hours: "Call for current hours" },
    { day: "Lunch Offers", hours: "12:00 - 14:30", special: true }
  ];

  const importantNotes = [
    {
      icon: <CreditCard className="h-5 w-5 text-primary" />,
      title: "Cash Payment Only",
      description: "We currently accept cash payments only for all orders."
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Party Orders Welcome",
      description: "Call ahead for large orders - we're happy to cater for your special events."
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      title: "Food Allergies & Intolerances",
      description: "Please speak to our staff about any food allergies and intolerances in your meal when making your order."
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Quick Service",
      description: "Your order will be ready in 15 minutes - perfect for busy schedules."
    }
  ];

  const searchTerms = [
    "kebab shop near me",
    "Norwich kebab",
    "best kebab shop", 
    "fresh pizza",
    "doner kebab",
    "takeaway stalham"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-poppins text-5xl font-bold text-charcoal mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to satisfy your cravings? Contact us for orders, inquiries, or just to say hello!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-poppins text-2xl font-bold text-charcoal mb-6 flex items-center">
                    <Phone className="text-primary mr-3 h-6 w-6" />
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                        <a href="tel:01692584100" className="text-primary font-bold text-2xl hover:underline">
                          01692 584100
                        </a>
                        <p className="text-gray-600 text-sm mt-1">Your order will be ready in 15 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">Address</h3>
                        <p className="text-gray-700 leading-relaxed">
                          79 High Street<br />
                          Stalham, Norwich<br />
                          NR12 9BB
                        </p>
                        <a 
                          href="https://maps.google.com/maps?q=79+High+Street,+Stalham,+Norwich+NR12+9BB"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:underline text-sm mt-2 inline-block"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">Opening Hours</h3>
                        <div className="space-y-2">
                          {openingHours.map((schedule) => (
                            <div key={schedule.day} className={`flex justify-between items-center ${schedule.special ? 'text-accent font-semibold' : 'text-gray-700'}`}>
                              <span>{schedule.day}:</span>
                              <span>{schedule.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-8">
                  <h3 className="font-poppins text-xl font-bold text-charcoal mb-6 flex items-center">
                    <AlertTriangle className="text-accent mr-3 h-5 w-5" />
                    Important Information
                  </h3>
                  <div className="grid gap-4">
                    {importantNotes.map((note) => (
                      <div key={note.title} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {note.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal text-sm">{note.title}</h4>
                          <p className="text-gray-600 text-sm">{note.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map and Quick Order */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-semibold">Interactive Map</p>
                      <p className="text-sm">79 High Street, Stalham, Norwich NR12 9BB</p>
                      <a 
                        href="https://maps.google.com/maps?q=79+High+Street,+Stalham,+Norwich+NR12+9BB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm mt-2 inline-block"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Order Card */}
              <Card className="bg-gradient-to-br from-accent to-orange-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="font-poppins text-2xl font-bold mb-4">Ready to Order?</h3>
                  <p className="mb-6 text-orange-100">
                    Call us now and your delicious meal will be ready in just 15 minutes!
                  </p>
                  <a href="tel:01692584100">
                    <Button size="lg" className="bg-white text-accent hover:bg-gray-100 w-full">
                      <Phone className="mr-3 h-5 w-5" />
                      Call 01692 584100
                    </Button>
                  </a>
                  
                  <div className="mt-6 pt-6 border-t border-orange-300">
                    <p className="text-orange-100 text-sm">
                      <strong>Average preparation time:</strong> 15 minutes<br />
                      <strong>Service:</strong> Dine-in & Takeaway
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Find Us Online */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-poppins text-xl font-bold text-charcoal mb-4 flex items-center">
                    <Heart className="text-primary mr-3 h-5 w-5" />
                    Find Us Online
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Searching for the best kebab shop in Norwich? You've found us! 
                    We're the closest and most trusted choice for authentic flavors.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {searchTerms.map((term) => (
                      <Badge key={term} variant="secondary" className="text-xs">
                        #{term.replace(/\s+/g, '')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Special Hours Notice */}
      <section className="py-16 bg-gradient-to-r from-secondary to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-4xl font-bold text-white mb-4">
            <Clock className="inline mr-3 h-8 w-8" />
            Lunch Time Special Hours
          </h2>
          <p className="text-green-100 text-xl mb-8">
            Don't miss our special lunch offers available every day from 12:00 to 14:30
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-5xl font-bold text-white mb-4">12:00 - 14:30</div>
            <p className="text-green-100 text-lg mb-6">
              Perfect for a quick lunch break with special pricing on selected menu items. 
              Call us during these hours for the best deals!
            </p>
            <a href="tel:01692584100">
              <Button className="bg-white text-secondary hover:bg-gray-100">
                <Phone className="mr-2 h-4 w-4" />
                Call for Lunch Specials
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
