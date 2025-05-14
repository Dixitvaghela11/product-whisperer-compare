
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    image: '/placeholder.svg',
    rating: 4.8,
    price: 999,
    highlights: ['A17 Pro chip', '48MP camera', 'Titanium design']
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    image: '/placeholder.svg',
    rating: 4.7,
    price: 1199,
    highlights: ['Snapdragon 8 Gen 3', '200MP camera', 'S Pen included']
  },
  {
    id: 3,
    name: 'MacBook Pro M3',
    brand: 'Apple',
    category: 'Laptops',
    image: '/placeholder.svg',
    rating: 4.9,
    price: 1599,
    highlights: ['M3 Pro chip', 'Up to 22 hours battery', 'Liquid Retina XDR display']
  },
  {
    id: 4,
    name: 'Dell XPS 15',
    brand: 'Dell',
    category: 'Laptops',
    image: '/placeholder.svg',
    rating: 4.6,
    price: 1499,
    highlights: ['Intel Core i9', 'NVIDIA RTX 4070', 'OLED display']
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Headphones',
    image: '/placeholder.svg',
    rating: 4.7,
    price: 399,
    highlights: ['Industry-leading ANC', 'Up to 30 hours battery', 'LDAC support']
  },
  {
    id: 6,
    name: 'Bose QuietComfort Ultra',
    brand: 'Bose',
    category: 'Headphones',
    image: '/placeholder.svg',
    rating: 4.6,
    price: 429,
    highlights: ['Spatial audio', 'Advanced noise cancellation', 'Comfortable design']
  },
  {
    id: 7,
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'Smartphones',
    image: '/placeholder.svg',
    rating: 4.6,
    price: 899,
    highlights: ['Tensor G3', 'AI-powered features', '50MP camera']
  },
  {
    id: 8,
    name: 'Apple iPad Pro',
    brand: 'Apple',
    category: 'Tablets',
    image: '/placeholder.svg',
    rating: 4.8,
    price: 799,
    highlights: ['M2 chip', 'Liquid Retina display', 'Apple Pencil support']
  },
];

// Available brands and categories
const brands = [...new Set(sampleProducts.map(p => p.brand))];
const categories = [...new Set(sampleProducts.map(p => p.category))];

// Price ranges
const priceRanges = [
  { label: 'Under $500', min: 0, max: 499 },
  { label: '$500 - $999', min: 500, max: 999 },
  { label: '$1000 - $1499', min: 1000, max: 1499 },
  { label: '$1500 and above', min: 1500, max: Infinity }
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof sampleProducts>([]);

  useEffect(() => {
    // Simulate search API call
    const results = sampleProducts.filter(product => {
      const matchesQuery = query
        ? product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.highlights.some(h => h.toLowerCase().includes(query.toLowerCase()))
        : true;

      const matchesBrand = selectedBrands.length > 0 
        ? selectedBrands.includes(product.brand) 
        : true;

      const matchesCategory = selectedCategories.length > 0 
        ? selectedCategories.includes(product.category) 
        : true;

      const matchesPriceRange = selectedPriceRanges.length > 0
        ? selectedPriceRanges.some(index => {
            const range = priceRanges[index];
            return product.price >= range.min && product.price <= range.max;
          })
        : true;

      return matchesQuery && matchesBrand && matchesCategory && matchesPriceRange;
    });

    // Sort results
    const sortedResults = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default: // relevance
          if (query) {
            // Simple relevance - products with query in name are more relevant
            const aInName = a.name.toLowerCase().includes(query.toLowerCase());
            const bInName = b.name.toLowerCase().includes(query.toLowerCase());
            
            if (aInName && !bInName) return -1;
            if (!aInName && bInName) return 1;
          }
          return 0;
      }
    });

    setSearchResults(sortedResults);
  }, [query, selectedBrands, selectedCategories, selectedPriceRanges, sortBy]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (index: number) => {
    setSelectedPriceRanges(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          {searchResults.length} results found {query ? `for "${query}"` : ''}
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
                <SelectItem value="relevance">Relevance</SelectItem>
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
                setSelectedCategories([]);
                setSelectedPriceRanges([]);
              }}>
                Reset
              </Button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label 
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
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

        {/* Results Grid */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing {searchResults.length} results
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <Card key={product.id} className="overflow-hidden h-full">
                  <div className="aspect-square bg-secondary relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs py-1 px-2 rounded">
                      {product.category}
                    </span>
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
              <p className="text-muted-foreground mb-2">No products match your search criteria.</p>
              {query && (
                <p className="text-sm text-muted-foreground mb-4">
                  Try using different keywords or filters.
                </p>
              )}
              <Button 
                variant="link" 
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
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

export default SearchPage;
