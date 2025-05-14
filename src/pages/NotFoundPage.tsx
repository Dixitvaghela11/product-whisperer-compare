
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Try searching for something:</h3>
          <SearchBar />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild>
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/categories">
              Browse Categories
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
