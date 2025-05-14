
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';

// Sample trending comparison data
const trendingComparisons = [
  { 
    id: 1, 
    title: 'iPhone 15 Pro vs Samsung Galaxy S24 Ultra', 
    category: 'Smartphones',
    image: '/placeholder.svg',
    views: 12453 
  },
  { 
    id: 2, 
    title: 'MacBook Pro M3 vs Dell XPS 15', 
    category: 'Laptops',
    image: '/placeholder.svg',
    views: 9876 
  },
  { 
    id: 3, 
    title: 'Sony WH-1000XM5 vs Bose QuietComfort Ultra', 
    category: 'Headphones',
    image: '/placeholder.svg',
    views: 8654 
  },
];

// Sample product categories
const productCategories = [
  { id: 1, name: 'Smartphones', count: 124, icon: '📱' },
  { id: 2, name: 'Laptops', count: 86, icon: '💻' },
  { id: 3, name: 'Headphones', count: 58, icon: '🎧' },
  { id: 4, name: 'Smartwatches', count: 42, icon: '⌚' },
  { id: 5, name: 'Cameras', count: 37, icon: '📷' },
  { id: 6, name: 'TVs', count: 65, icon: '📺' },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue/10 to-brand-indigo/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Compare Products. Make Smarter Decisions.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find the perfect product by comparing specs, prices, and reviews side-by-side.
            Our AI-powered insights help you make informed purchasing decisions.
          </p>
          
          <div className="max-w-lg mx-auto">
            <SearchBar />
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/categories">Browse Categories</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/trending">Trending Comparisons</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Comparisons */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Trending Comparisons</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/trending" className="flex items-center gap-1">
                See All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingComparisons.map((comparison) => (
              <Link
                key={comparison.id}
                to={`/compare/${comparison.id}`}
                className="group"
              >
                <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                  <div className="aspect-video bg-secondary relative">
                    <img 
                      src={comparison.image} 
                      alt={comparison.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs py-1 px-2 rounded">
                      {comparison.category}
                    </span>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                      {comparison.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {comparison.views.toLocaleString()} views
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Product Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {productCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}-${category.name.toLowerCase()}`}
                className="feature-card text-center group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.count} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Why Compare with Us?</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Our platform offers powerful tools to help you make the right purchasing decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Detailed Comparisons</h3>
              <p className="text-muted-foreground">
                Compare detailed specifications side-by-side to understand product differences.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 2a8 8 0 1 1-4.6 14.6"/>
                  <path d="M12 12V6"/>
                  <path d="M16 10l-4 2"/>
                  <path d="M19 22v-6"/>
                  <path d="M22 19l-3-3-3 3"/>
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Price Tracking</h3>
              <p className="text-muted-foreground">
                Find the best deals across multiple online retailers and track price changes.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">AI Recommendations</h3>
              <p className="text-muted-foreground">
                Get personalized advice and insights powered by AI to help you choose the right product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-brand-blue to-brand-indigo text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to make a smart purchase decision?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Start comparing products now and find the perfect match for your needs and budget.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/categories">Start Comparing</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
