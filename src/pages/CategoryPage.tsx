
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    image: '/placeholder.svg',
    rating: 4.8,
    price: 999,
    highlights: ['A17 Pro chip', '48MP camera', 'Titanium design']
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    image: '/placeholder.svg',
    rating: 4.7,
    price: 1199,
    highlights: ['Snapdragon 8 Gen 3', '200MP camera', 'S Pen included']
  },
  {
    id: 3,
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    image: '/placeholder.svg',
    rating: 4.6,
    price: 899,
    highlights: ['Tensor G3', 'AI-powered features', '50MP camera']
  },
  {
    id: 4,
    name: 'OnePlus 12',
    brand: 'OnePlus',
    image: '/placeholder.svg',
    rating: 4.5,
    price: 799,
    highlights: ['Snapdragon 8 Gen 3', '50MP camera', '100W charging']
  },
  {
    id: 5,
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    image: '/placeholder.svg',
    rating: 4.5,
    price: 899,
    highlights: ['Snapdragon 8 Gen 3', 'Leica cameras', '5000mAh battery']
  },
  {
    id: 6,
    name: 'iPhone 15',
    brand: 'Apple',
    image: '/placeholder.svg',
    rating: 4.6,
    price: 799,
    highlights: ['A16 Bionic', '48MP camera', 'Dynamic Island']
  }
];

// Available brands
const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'];

// Price ranges
const priceRanges = [
  { label: 'Under $500', min: 0, max: 499 },
  { label: '$500 - $799', min: 500, max: 799 },
  { label: '$800 - $999', min: 800, max: 999 },
  { label: '$1000 and above', min: 1000, max: Infinity }
];

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryName = categoryId?.split('-').slice(1).join(' ') || 'Smartphones';
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const handlePriceRangeChange = (index: number) => {
    setSelectedPriceRanges(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const filteredProducts = sampleProducts.filter(product => {
    // Filter by brand
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      const inPriceRange = selectedPriceRanges.some(index => {
        const range = priceRanges[index];
        return product.price >= range.min && product.price <= range.max;
      });
      if (!inPriceRange) return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // popular
        return 0; // Assume default order is by popularity
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground">
          Browse and compare {categoryName.toLowerCase()} from top brands.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Mobile Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          <div className="flex-1 max-w-[180px] ml-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Filters - Sidebar */}
        <div className={`
          ${showFilters ? 'block' : 'hidden'} 
          lg:block w-full lg:w-64 sticky top-20 self-start
        `}>
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h2 className="font-medium">Filters</h2>
              <Button variant="link" size="sm" className="h-auto p-0" onClick={() => {
                setSelectedBrands([]);
                setSelectedPriceRanges([]);
              }}>
                Reset
              </Button>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <Label 
                      htmlFor={`brand-${brand}`}
                      className="text-sm cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Price</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`price-${index}`} 
                      checked={selectedPriceRanges.includes(index)}
                      onCheckedChange={() => handlePriceRangeChange(index)}
                    />
                    <Label 
                      htmlFor={`price-${index}`}
                      className="text-sm cursor-pointer"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:hidden">
              <Button className="w-full" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing {sortedProducts.length} products
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden h-full">
                  <div className="aspect-square bg-secondary relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                        ★ {product.rating}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="font-semibold text-lg">${product.price}</p>
                    </div>
                    
                    <ul className="text-sm space-y-1 mb-4">
                      {product.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-primary mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" asChild className="flex-1">
                        <Link to={`/product/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button variant="default" asChild className="flex-1">
                        <Link to={`/compare?products=${product.id}`}>
                          Compare
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No products match your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedPriceRanges([]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
