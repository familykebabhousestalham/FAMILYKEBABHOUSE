import { Button } from '@/components/ui/button';

export default function SkipNavigation() {
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skipToMenu = () => {
    const menuSection = document.getElementById('menu-content');
    if (menuSection) {
      menuSection.focus();
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-50" aria-label="Skip navigation links">
      <div className="flex space-x-2 bg-white p-4 rounded-lg shadow-lg border-2 border-primary">
        <Button
          onClick={skipToMain}
          className="bg-primary text-white hover:bg-red-700"
          size="sm"
        >
          Skip to main content
        </Button>
        <Button
          onClick={skipToMenu}
          className="bg-primary text-white hover:bg-red-700"
          size="sm"
        >
          Skip to menu
        </Button>
      </div>
    </nav>
  );
}