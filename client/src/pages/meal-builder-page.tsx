import MealBuilder from '@/components/meal-builder';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MealBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/menu">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-charcoal">Build Your Perfect Meal</h1>
          <p className="text-gray-600 mt-2">
            Create a custom meal with your favorite items from our menu. Mix and match to create your perfect combination!
          </p>
        </div>
        
        <MealBuilder />
      </div>
    </div>
  );
}