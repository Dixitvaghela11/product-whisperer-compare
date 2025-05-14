
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Trash, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    image: '/placeholder.svg',
    price: 999,
    specs: {
      display: '6.1-inch Super Retina XDR display with ProMotion (2532 x 1170 at 460 ppi)',
      processor: 'A17 Pro chip with 6-core CPU, 6-core GPU, 16-core Neural Engine',
      camera: '48MP main, 12MP ultrawide, 12MP telephoto with 3x optical zoom',
      battery: '3,274 mAh, up to 23 hours video playback',
      storage: '128GB, 256GB, 512GB, 1TB options',
      ram: '8GB',
      connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3, Ultra Wideband chip',
      dimensions: '146.6 x 70.6 x 8.3 mm',
      weight: '187 g',
      os: 'iOS 17',
      refreshRate: '120Hz',
      waterResistant: 'IP68',
      charging: 'MagSafe, Qi wireless, USB-C up to 27W',
    },
    rating: 4.8,
    reviewCount: 1245,
    aiRecommendation: 'Best for Apple ecosystem users',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    image: '/placeholder.svg',
    price: 1199,
    specs: {
      display: '6.8-inch Dynamic AMOLED 2X (3088 x 1440 at 505 ppi)',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      camera: '200MP main, 12MP ultrawide, 10MP telephoto with 3x optical zoom, 50MP telephoto with 5x optical zoom',
      battery: '5,000 mAh, up to 27 hours video playback',
      storage: '256GB, 512GB, 1TB options',
      ram: '12GB',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, UWB',
      dimensions: '162.3 x 79.0 x 8.6 mm',
      weight: '233 g',
      os: 'Android 14 with One UI 6.1',
      refreshRate: '120Hz',
      waterResistant: 'IP68',
      charging: 'USB-C up to 45W, Wireless 15W, Reverse Wireless 4.5W',
    },
    rating: 4.7,
    reviewCount: 876,
    aiRecommendation: 'Best for photography and productivity',
  },
  {
    id: 3,
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    image: '/placeholder.svg',
    price: 899,
    specs: {
      display: '6.7-inch LTPO OLED (2992 x 1344 at 489 ppi)',
      processor: 'Google Tensor G3',
      camera: '50MP main, 48MP ultrawide, 48MP telephoto with 5x optical zoom',
      battery: '5,050 mAh, up to 24 hours video playback',
      storage: '128GB, 256GB, 512GB, 1TB options',
      ram: '12GB',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3',
      dimensions: '162.6 x 76.5 x 8.8 mm',
      weight: '213 g',
      os: 'Android 14',
      refreshRate: '120Hz',
      waterResistant: 'IP68',
      charging: 'USB-C up to 30W, Wireless 23W',
    },
    rating: 4.6,
    reviewCount: 654,
    aiRecommendation: 'Best for AI features and clean Android experience',
  },
  {
    id: 4,
    name: 'iPhone 15',
    brand: 'Apple',
    image: '/placeholder.svg',
    price: 799,
    specs: {
      display: '6.1-inch Super Retina XDR display (2532 x 1170 at 460 ppi)',
      processor: 'A16 Bionic chip with 6-core CPU, 5-core GPU, 16-core Neural Engine',
      camera: '48MP main, 12MP ultrawide',
      battery: '3,349 mAh, up to 20 hours video playback',
      storage: '128GB, 256GB, 512GB options',
      ram: '6GB',
      connectivity: '5G, Wi-Fi 6, Bluetooth 5.3',
      dimensions: '147.6 x 71.6 x 7.8 mm',
      weight: '171 g',
      os: 'iOS 17',
      refreshRate: '60Hz',
      waterResistant: 'IP68',
      charging: 'MagSafe, Qi wireless, USB-C up to 20W',
    },
    rating: 4.5,
    reviewCount: 982,
    aiRecommendation: 'Best value iPhone',
  },
  {
    id: 5,
    name: 'OnePlus 12',
    brand: 'OnePlus',
    image: '/placeholder.svg',
    price: 799,
    specs: {
      display: '6.82-inch LTPO AMOLED (3168 x 1440 at 510 ppi)',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP main, 48MP ultrawide, 64MP telephoto with 3x optical zoom',
      battery: '5,400 mAh, up to 26 hours video playback',
      storage: '256GB, 512GB options',
      ram: '12GB, 16GB options',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3',
      dimensions: '164.3 x 75.8 x 9.2 mm',
      weight: '220 g',
      os: 'OxygenOS 14 based on Android 14',
      refreshRate: '120Hz',
      waterResistant: 'IP65',
      charging: 'SUPERVOOC 100W, AIRVOOC 50W wireless',
    },
    rating: 4.5,
    reviewCount: 432,
    aiRecommendation: 'Best for fast charging and performance',
  },
];

// Available products for adding to comparison
const availableProducts = sampleProducts.map(product => ({
  id: product.id,
  name: product.name,
  brand: product.brand,
  image: product.image,
}));

const ComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedProducts, setSelectedProducts] = useState<typeof sampleProducts>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  useEffect(() => {
    // Parse product IDs from URL
    const productIds = searchParams.get('products')?.split(',').map(Number) || [];
    
    if (productIds.length > 0) {
      // Find products from sample data
      const products = sampleProducts.filter(product => 
        productIds.includes(product.id)
      );
      setSelectedProducts(products);
    }
  }, [searchParams]);
  
  const handleAddProduct = (productId: number) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product && !selectedProducts.find(p => p.id === productId)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  
  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  const isExpanded = (section: string) => expandedSections.includes(section);

  // Define spec sections
  const specSections = {
    display: { title: 'Display', key: 'display' },
    performance: { title: 'Performance', key: 'processor' },
    camera: { title: 'Camera', key: 'camera' },
    battery: { title: 'Battery & Charging', key: 'battery' },
    storage: { title: 'Storage & Memory', key: 'storage' },
    dimensions: { title: 'Physical Specs', key: 'dimensions' },
    software: { title: 'Software', key: 'os' },
    other: { title: 'Other Features', key: 'waterResistant' },
  };
  
  // Compare specs - determine which product has better specs (simplified)
  const compareSpecs = (spec: string, values: string[]) => {
    // This is a simplified comparison logic - in a real app, you'd want more sophisticated comparison algorithms
    const results = new Array(values.length).fill('highlight-neutral');
    
    // Some basic comparison rules
    if (['ram', 'storage', 'battery'].some(s => spec.toLowerCase().includes(s))) {
      // For these specs, higher numbers generally mean better
      const extractedValues = values.map(value => {
        const match = value.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      });
      
      const maxVal = Math.max(...extractedValues);
      extractedValues.forEach((val, i) => {
        if (val === maxVal && val > 0) results[i] = 'highlight-better';
        else if (val < maxVal) results[i] = 'highlight-worse';
      });
    }
    
    if (['camera'].some(s => spec.toLowerCase().includes(s))) {
      // For cameras, check for megapixels
      const extractedValues = values.map(value => {
        const match = value.match(/(\d+)MP/);
        return match ? parseInt(match[1], 10) : 0;
      });
      
      const maxVal = Math.max(...extractedValues);
      extractedValues.forEach((val, i) => {
        if (val === maxVal && val > 0) results[i] = 'highlight-better';
        else if (val < maxVal) results[i] = 'highlight-worse';
      });
    }
    
    return results;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Product Comparison</h1>
      <p className="text-muted-foreground mb-6">
        Compare products side by side to find the one that's right for you.
      </p>
      
      <div className="mb-8">
        {selectedProducts.length > 0 ? (
          <Tabs defaultValue="specs">
            <TabsList className="mb-6">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="summary">AI Summary</TabsTrigger>
              <TabsTrigger value="prices">Prices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="border rounded-lg overflow-hidden">
              {/* Products Header */}
              <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                <div className="bg-secondary border-b border-r border-border p-4 flex items-center justify-between">
                  <span className="font-medium">Product</span>
                </div>
                
                {selectedProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-secondary border-b border-r last:border-r-0 border-border p-4 relative"
                  >
                    <div className="flex flex-col items-center text-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      
                      <div className="w-16 h-16 mb-2">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Product cell */}
              {selectedProducts.length < 4 && (
                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr) 1fr` }}>
                  <div className="border-b border-r border-border p-4">
                    <span className="font-medium">Add to comparison</span>
                  </div>
                  
                  {Array(selectedProducts.length).fill(null).map((_, index) => (
                    <div key={index} className="border-b border-r border-border"></div>
                  ))}
                  
                  <div className="border-b border-border p-4">
                    <Select onValueChange={(value) => handleAddProduct(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="+ Add Product" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts
                          .filter(p => !selectedProducts.find(sp => sp.id === p.id))
                          .map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.name} ({product.brand})
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {/* Basic Info */}
              <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                <div className="border-b border-r border-border p-4 font-medium">
                  Price
                </div>
                
                {selectedProducts.map((product) => (
                  <div key={`price-${product.id}`} className="border-b border-r last:border-r-0 border-border p-4 text-center">
                    <div className="font-bold">${product.price}</div>
                  </div>
                ))}
                
                <div className="border-b border-r border-border p-4 font-medium">
                  Rating
                </div>
                
                {selectedProducts.map((product) => (
                  <div key={`rating-${product.id}`} className="border-b border-r last:border-r-0 border-border p-4 text-center">
                    <div className="flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="#FFC107" 
                        stroke="#FFC107"
                        strokeWidth="1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="font-medium">{product.rating}</span>
                      <span className="ml-1 text-muted-foreground text-sm">({product.reviewCount})</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Specifications Sections */}
              {Object.entries(specSections).map(([sectionKey, { title, key }]) => (
                <div key={sectionKey}>
                  <div 
                    className="grid bg-secondary cursor-pointer"
                    style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
                    onClick={() => toggleSection(sectionKey)}
                  >
                    <div className="border-b border-r border-border p-4 font-medium flex justify-between items-center">
                      {title}
                      {isExpanded(sectionKey) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                    
                    {selectedProducts.map((product, index) => (
                      <div key={`${sectionKey}-header-${product.id}`} className="border-b border-r last:border-r-0 border-border p-4">
                      </div>
                    ))}
                  </div>
                  
                  {isExpanded(sectionKey) && (
                    <>
                      {/* Loop through each spec in the current section */}
                      {Object.entries(selectedProducts[0].specs)
                        .filter(([specKey]) => {
                          // Filter specs that belong to this section
                          // This is a simple example - in a real app, you'd have a more structured way to organize specs
                          if (sectionKey === 'display' && specKey.includes('display')) return true;
                          if (sectionKey === 'performance' && ['processor', 'ram'].includes(specKey)) return true;
                          if (sectionKey === 'camera' && specKey.includes('camera')) return true;
                          if (sectionKey === 'battery' && ['battery', 'charging'].includes(specKey)) return true;
                          if (sectionKey === 'storage' && ['storage', 'ram'].includes(specKey)) return true;
                          if (sectionKey === 'dimensions' && ['dimensions', 'weight'].includes(specKey)) return true;
                          if (sectionKey === 'software' && specKey.includes('os')) return true;
                          if (sectionKey === 'other' && ['waterResistant', 'refreshRate'].includes(specKey)) return true;
                          return false;
                        })
                        .map(([specKey]) => {
                          const values = selectedProducts.map(p => p.specs[specKey as keyof typeof p.specs]);
                          const comparisonResults = compareSpecs(specKey, values);
                          
                          return (
                            <div 
                              key={`spec-${specKey}`}
                              className="grid"
                              style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
                            >
                              <div className="border-b border-r border-border p-4 text-muted-foreground capitalize">
                                {specKey.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              
                              {selectedProducts.map((product, index) => (
                                <div 
                                  key={`${specKey}-${product.id}`} 
                                  className={`border-b border-r last:border-r-0 border-border p-4 text-center ${comparisonResults[index]}`}
                                >
                                  {product.specs[specKey as keyof typeof product.specs]}
                                </div>
                              ))}
                            </div>
                          );
                        })
                      }
                    </>
                  )}
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProducts.map((product) => (
                  <Card key={`summary-${product.id}`} className="overflow-hidden">
                    <div className="p-4 border-b border-border bg-secondary flex items-center">
                      <div className="w-12 h-12 mr-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-4 bg-primary/10 p-3 rounded-md">
                        <p className="font-medium text-primary">{product.aiRecommendation}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Key Strengths</h4>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            {product.name.includes('iPhone') ? 'Excellent ecosystem integration' : 
                             product.name.includes('Galaxy') ? 'Versatile camera system' : 
                             product.name.includes('Pixel') ? 'Superior computational photography' :
                             'Fast charging capabilities'}
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            {product.name.includes('iPhone') ? 'Long software support' : 
                             product.name.includes('Galaxy') ? 'S Pen functionality' : 
                             product.name.includes('Pixel') ? 'Clean Android experience' :
                             'Excellent display quality'}
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            {product.name.includes('iPhone') ? 'Strong performance' : 
                             product.name.includes('Galaxy') ? 'Excellent display' : 
                             product.name.includes('Pixel') ? 'AI features' :
                             'Strong battery life'}
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Limitations</h4>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                            {product.name.includes('iPhone') ? 'Premium pricing' : 
                             product.name.includes('Galaxy') ? 'Large and heavy' : 
                             product.name.includes('Pixel') ? 'Average battery life' :
                             'Limited availability'}
                          </li>
                          <li className="flex items-start">
                            <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                            {product.name.includes('iPhone') ? 'Limited customization' : 
                             product.name.includes('Galaxy') ? 'Complex software' : 
                             product.name.includes('Pixel') ? 'Limited storage options' :
                             'Less established ecosystem'}
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 p-6 border border-border rounded-lg">
                <h3 className="text-xl font-medium mb-4">AI-Powered Recommendation</h3>
                
                <div className="mb-6">
                  {selectedProducts.length > 1 ? (
                    <p className="text-muted-foreground">
                      Based on comparing these products across multiple factors, our AI recommends:
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Add more products to the comparison to get an AI-powered recommendation.
                    </p>
                  )}
                </div>
                
                {selectedProducts.length > 1 && (
                  <div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Best Overall Value:</h4>
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-3">
                          <img 
                            src={selectedProducts[0].image} 
                            alt={selectedProducts[0].name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{selectedProducts[0].name}</p>
                          <p className="text-sm text-muted-foreground">
                            Best balance of features, performance, and price.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {selectedProducts.length > 2 && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Best for Performance:</h4>
                        <div className="flex items-center">
                          <div className="w-12 h-12 mr-3">
                            <img 
                              src={selectedProducts[1].image} 
                              alt={selectedProducts[1].name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{selectedProducts[1].name}</p>
                            <p className="text-sm text-muted-foreground">
                              Highest processing power and system capabilities.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedProducts.length > 2 && (
                      <div>
                        <h4 className="font-medium mb-2">Best for Photography:</h4>
                        <div className="flex items-center">
                          <div className="w-12 h-12 mr-3">
                            <img 
                              src={selectedProducts[2].image} 
                              alt={selectedProducts[2].name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{selectedProducts[2].name}</p>
                            <p className="text-sm text-muted-foreground">
                              Superior camera system and image processing.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="prices">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProducts.map((product) => (
                  <Card key={`price-card-${product.id}`}>
                    <div className="p-4 border-b border-border flex items-center">
                      <div className="w-12 h-12 mr-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h4 className="text-lg font-bold">${product.price}</h4>
                        <p className="text-sm text-muted-foreground">
                          Starting price
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-secondary rounded p-1 mr-2">
                              <img
                                src="/placeholder.svg"
                                alt="Amazon"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span>Amazon</span>
                          </div>
                          <div className="font-medium">${product.price}</div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-secondary rounded p-1 mr-2">
                              <img
                                src="/placeholder.svg"
                                alt="Best Buy"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span>Best Buy</span>
                          </div>
                          <div className="font-medium">${product.price + 20}</div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-secondary rounded p-1 mr-2">
                              <img
                                src="/placeholder.svg"
                                alt="Official Store"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span>Official Store</span>
                          </div>
                          <div className="font-medium">${product.price}</div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4" asChild>
                        <a href="#" className="flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View All Prices
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-medium mb-4">Select Products to Compare</h2>
              <p className="text-muted-foreground mb-6">
                Choose up to 4 products to view a detailed side-by-side comparison.
              </p>
              <Select onValueChange={(value) => handleAddProduct(Number(value))}>
                <SelectTrigger className="w-[280px] mx-auto">
                  <SelectValue placeholder="+ Add Product" />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} ({product.brand})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Data last updated on May 10, 2025. Prices and specifications subject to change.
        </p>
      </div>
    </div>
  );
};

export default ComparisonPage;
