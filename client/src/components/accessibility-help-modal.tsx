import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Keyboard, Mic, Eye } from 'lucide-react';

export default function AccessibilityHelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        className="border-white text-white hover:bg-white hover:text-charcoal"
        aria-label="Accessibility help and instructions"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Help
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-lg p-6 m-4">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-primary">
              Accessibility Features Guide
            </DialogTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close help modal"
            >
              ×
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Keyboard Navigation */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Keyboard className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Keyboard Navigation</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Menu Navigation:</h4>
                <ul className="space-y-1 text-sm">
                  <li><Badge variant="outline" className="mr-2">↑ ↓</Badge>Navigate menu items</li>
                  <li><Badge variant="outline" className="mr-2">← →</Badge>Switch categories</li>
                  <li><Badge variant="outline" className="mr-2">Enter</Badge>Select/Order item</li>
                  <li><Badge variant="outline" className="mr-2">Home</Badge>First item</li>
                  <li><Badge variant="outline" className="mr-2">End</Badge>Last item</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Quick Actions:</h4>
                <ul className="space-y-1 text-sm">
                  <li><Badge variant="outline" className="mr-2">O</Badge>Quick order by phone</li>
                  <li><Badge variant="outline" className="mr-2">I</Badge>Show nutrition info</li>
                  <li><Badge variant="outline" className="mr-2">Esc</Badge>Close dialogs</li>
                  <li><Badge variant="outline" className="mr-2">Tab</Badge>Navigate interface</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Voice Control */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Mic className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Voice Control Commands</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Navigation Commands:</h4>
                <ul className="space-y-1 text-sm">
                  <li>"Show kebabs" - Go to kebabs menu</li>
                  <li>"Show pizzas" - Go to pizzas menu</li>
                  <li>"Show burgers" - Go to burgers menu</li>
                  <li>"Show chicken" - Go to chicken menu</li>
                  <li>"Show drinks" - Go to drinks menu</li>
                  <li>"Show lunch offers" - Go to lunch specials</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Action Commands:</h4>
                <ul className="space-y-1 text-sm">
                  <li>"Read menu" - Read current category</li>
                  <li>"Order now" - Call restaurant</li>
                  <li>"Show nutrition" - Nutrition info</li>
                  <li>"Help" - Voice command list</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Screen Reader */}
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Screen Reader Support</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• All menu items include descriptive labels and pricing information</li>
              <li>• Interactive elements have proper ARIA labels and roles</li>
              <li>• Keyboard focus is clearly indicated with visual highlights</li>
              <li>• Menu categories and items are properly structured for navigation</li>
              <li>• Nutritional information is accessible through tooltips and buttons</li>
            </ul>
          </div>

          {/* Getting Started */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
            <ol className="space-y-2 text-sm">
              <li>1. Enable "Keyboard Navigation" using the toggle at the top of the page</li>
              <li>2. Use the floating voice control button (bottom right) for voice commands</li>
              <li>3. Click "Read Menu" to hear the current category read aloud</li>
              <li>4. Use arrow keys to navigate and Enter to order</li>
              <li>5. Press 'O' for quick phone ordering of the focused item</li>
            </ol>
          </div>
        </div>
      </DialogContent>
        </div>
      )}
    </>
  );
}