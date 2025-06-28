import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Info, AlertTriangle, Zap, Activity } from "lucide-react";
import { MenuItem } from "../../../shared/schema";
import { useGlobalVoiceControl } from "@/hooks/use-global-voice-control";

interface NutritionalInfoProps {}

export default function NutritionalInfo(props: NutritionalInfoProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useGlobalVoiceControl();

  // Fetch menu items with nutritional data
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/menu`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
        setFilteredItems(data);
        setLoading(false);
      } catch (err) {
        let message = 'Failed to load nutritional information';
        if (err instanceof Error) {
          message = err.message || message;
        }
        setError(message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = menuItems;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item: MenuItem) => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((item: MenuItem) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, menuItems]);

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(menuItems.map((item: MenuItem) => item.category)))];

  // Helper function to format allergens
  const formatAllergens = (allergens: string | string[] | null) => {
    if (!allergens) return "None specified";
    if (Array.isArray(allergens)) {
      return allergens.join(", ");
    }
    if (typeof allergens === 'string') {
      // Handle PostgreSQL array strings like "{Gluten,Dairy,Soy}"
      if (allergens.startsWith('{') && allergens.endsWith('}')) {
        return allergens.slice(1, -1).split(',').join(', ');
      }
      return allergens.includes(',') ? allergens.split(",").map(a => a.trim()).join(", ") : allergens;
    }
    return "None specified";
  };

  // Helper function to get nutritional completeness
  const getNutritionalCompleteness = (item: MenuItem) => {
    const fields = [item.calories, item.protein, item.carbs, item.fat, item.fiber, item.sodium];
    const completed = fields.filter(field => field !== null && field !== undefined).length;
    return (completed / fields.length) * 100;
  };

  // Calculate daily value percentages (based on 2000 calorie diet)
  const getDailyValuePercent = (nutrient: string, value: number | null) => {
    if (!value) return 0;
    
    const dailyValues: { [key: string]: number } = {
      fat: 65, // grams
      sodium: 2300, // mg
      carbs: 300, // grams
      fiber: 25, // grams
      protein: 50 // grams
    };

    if (dailyValues[nutrient]) {
      return Math.round((value / dailyValues[nutrient]) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading nutritional information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-poppins text-5xl font-bold mb-4">Nutritional Information</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Complete nutritional breakdown for all our menu items. Make informed choices for your health and dietary needs.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "all" ? "All Categories" : category.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nutritional Information Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredItems.map((item) => {
                const completeness = getNutritionalCompleteness(item);
                
                return (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold text-charcoal">{item.name}</CardTitle>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                          <Badge variant="secondary" className="mt-2 capitalize">
                            {item.category.replace("-", " ")}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-orange-500" />
                            <span className="text-2xl font-bold text-orange-600">
                              {item.calories ?? "N/A"} 
                            </span>
                            <span className="text-sm text-gray-500">cal</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Data: {completeness.toFixed(0)}% complete
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <Tabs defaultValue="macros" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="macros">Macronutrients</TabsTrigger>
                          <TabsTrigger value="details">Detailed Info</TabsTrigger>
                          <TabsTrigger value="allergens">Allergens</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="macros" className="mt-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {item.protein ?? "N/A"}g
                              </div>
                              <div className="text-sm text-gray-600">Protein</div>
                              {item.protein && (
                                <div className="text-xs text-blue-500 mt-1">
                                  {getDailyValuePercent("protein", item.protein)}% DV
                                </div>
                              )}
                            </div>
                            
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                {item.carbs ?? "N/A"}g
                              </div>
                              <div className="text-sm text-gray-600">Carbs</div>
                              {item.carbs && (
                                <div className="text-xs text-green-500 mt-1">
                                  {getDailyValuePercent("carbs", item.carbs)}% DV
                                </div>
                              )}
                            </div>
                            
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                              <div className="text-2xl font-bold text-orange-600">
                                {item.fat ?? "N/A"}g
                              </div>
                              <div className="text-sm text-gray-600">Fat</div>
                              {item.fat && (
                                <div className="text-xs text-orange-500 mt-1">
                                  {getDailyValuePercent("fat", item.fat)}% DV
                                </div>
                              )}
                            </div>
                            
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">
                                {item.fiber ?? "N/A"}g
                              </div>
                              <div className="text-sm text-gray-600">Fiber</div>
                              {item.fiber && (
                                <div className="text-xs text-purple-500 mt-1">
                                  {getDailyValuePercent("fiber", item.fiber)}% DV
                                </div>
                              )}
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="details" className="mt-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-gray-800">Nutritional Breakdown</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Calories:</span>
                                  <span className="font-medium">{item.calories ?? "Not specified"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Protein:</span>
                                  <span className="font-medium">{item.protein ? `${item.protein}g` : "Not specified"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Carbohydrates:</span>
                                  <span className="font-medium">{item.carbs ? `${item.carbs}g` : "Not specified"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Fat:</span>
                                  <span className="font-medium">{item.fat ? `${item.fat}g` : "Not specified"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Fiber:</span>
                                  <span className="font-medium">{item.fiber ? `${item.fiber}g` : "Not specified"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Sodium:</span>
                                  <span className="font-medium">{item.sodium ? `${item.sodium}mg` : "Not specified"}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-3 text-gray-800">Ingredients</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {item.ingredients ?? "Ingredient information not available. Please ask our staff for detailed ingredient lists."}
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="allergens" className="mt-6">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-yellow-800 mb-2">Allergen Information</h4>
                                <p className="text-sm text-yellow-700 mb-3">
                                  <strong>Known Allergens:</strong> {formatAllergens(item.allergens)}
                                </p>
                                <p className="text-xs text-yellow-600">
                                  Please inform our staff of any allergies or dietary requirements when ordering. 
                                  We cannot guarantee that any of our products are completely free from allergens 
                                  due to the risk of cross-contamination in our kitchen.
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer Notice */}
      <section className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-semibold mb-2">Important Nutritional Information</h3>
          <p className="text-gray-300 text-sm max-w-4xl mx-auto">
            Nutritional information is calculated based on standard recipes and serving sizes. 
            Actual values may vary due to preparation methods, portion sizes, and ingredient substitutions. 
            Daily Value percentages are based on a 2,000 calorie diet. Please consult with our staff 
            for the most current information and to discuss any dietary concerns or allergies.
          </p>
        </div>
      </section>
    </div>
  );
}
