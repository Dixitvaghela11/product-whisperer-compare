import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Star, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Sample product data
const product = {
  id: 1,
  name: 'iPhone 15 Pro',
  brand: 'Apple',
  images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  rating: 4.8,
  reviewCount: 1245,
  price: 999,
  lowestPrice: 949,
  highestPrice: 1099,
  stores: [
    { name: 'Amazon', price: 999, logo: '/placeholder.svg', url: 'https://amazon.com' },
    { name: 'Apple Store', price: 999, logo: '/placeholder.svg', url: 'https://apple.com' },
    { name: 'Best Buy', price: 999, logo: '/placeholder.svg', url: 'https://bestbuy.com' },
  ],
  specs: {
    display: '6.1-inch Super Retina XDR display with ProMotion',
    processor: 'A17 Pro chip',
    camera: '48MP main, 12MP ultrawide, 12MP telephoto',
    battery: 'Up to 23 hours video playback',
    storage: 'Available in 128GB, 256GB, 512GB, 1TB',
    os: 'iOS 17',
    connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3, Ultra Wideband chip',
    dimensions: '146.6 x 70.6 x 8.3 mm',
    weight: '187 g',
    colors: 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium',
  },
  aiSummary: {
    pros: [
      'Exceptional performance with A17 Pro chip',
      'Outstanding camera system, especially in low light',
      'Premium build quality with titanium design',
      'Vibrant and smooth 120Hz display',
      'Excellent software support',
    ],
    cons: [
      'Premium price point',
      'No major design changes from previous generation',
      'Limited customization compared to Android',
      'No USB-C fast charging beyond 27W',
      'No expandable storage options',
    ],
    verdict: "The iPhone 15 Pro represents the pinnacle of Apple's smartphone technology. Its exceptional performance, outstanding camera system, and premium build quality make it a top-tier choice for those willing to pay the premium price. While the design hasn't changed dramatically, the switch to titanium and the powerful A17 Pro chip provide tangible improvements to the user experience. It's particularly recommended for photography enthusiasts, Apple ecosystem users, and those seeking a premium smartphone experience that will remain capable for years to come."
  },
  reviews: [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      date: '2023-10-12',
      title: 'Best iPhone yet!',
      content: 'The camera system is incredible, and the new titanium design feels premium while being lighter than previous Pro models. Battery life has been excellent for me, easily lasting all day with heavy use.',
      helpful: 342,
    },
    {
      id: 2,
      user: 'Sarah L.',
      rating: 4,
      date: '2023-09-29',
      title: 'Great phone, but expensive',
      content: 'Love everything about this phone except the price. Camera is amazing, display is gorgeous, and it\'s super fast. Just wish it wasn\'t so expensive or at least had faster charging.',
      helpful: 178,
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: 3,
      date: '2023-10-05',
      title: 'Good upgrade but not revolutionary',
      content: 'Coming from an iPhone 13 Pro, the improvements are noticeable but not revolutionary. The camera is better and it\'s a bit faster, but if you have a 13 Pro or 14 Pro, you might want to wait for the next generation.',
      helpful: 124,
    },
  ],
  similarProducts: [
    { id: 2, name: 'Samsung Galaxy S24 Ultra', image: '/placeholder.svg', price: 1199 },
    { id: 3, name: 'Google Pixel 8 Pro', image: '/placeholder.svg', price: 899 },
    { id: 4, name: 'iPhone 15', image: '/placeholder.svg', price: 799 },
  ],
  lastUpdated: '2023-11-01',
};

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // In a real app, we'd fetch the product data based on productId
  console.log(`Loading product details for ID: ${productId}`);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/category/1-smartphones" className="text-muted-foreground hover:text-foreground">Smartphones</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div>
          <div className="border border-border rounded-lg overflow-hidden bg-white p-4 mb-4">
            <div className="aspect-square relative">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`
                  border rounded-md overflow-hidden cursor-pointer w-20 h-20 flex-shrink-0
                  ${activeImageIndex === index ? 'border-primary' : 'border-border'}
                `}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
              {product.brand}
            </span>
            <div className="ml-auto flex items-center text-sm text-muted-foreground">
              Last updated: {product.lastUpdated}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {product.reviewCount.toLocaleString()} reviews
            </span>
          </div>
          
          <div className="mb-6">
            <div className="text-lg mb-1">
              Price Range: 
              <span className="font-bold text-xl ml-2">${product.lowestPrice} - ${product.highestPrice}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Prices across {product.stores.length} stores
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="font-medium mb-3">Available At</h2>
            <div className="space-y-3">
              {product.stores.map((store) => (
                <a
                  key={store.name}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondary rounded">
                      <img 
                        src={store.logo} 
                        alt={store.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <span className="ml-3 font-medium">{store.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">${store.price}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <Button asChild>
              <Link to={`/compare?products=${product.id}`}>
                Compare with others
              </Link>
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          {/* Quick Highlights */}
          <div className="border border-border rounded-lg p-4">
            <h2 className="font-medium mb-3">Key Specifications</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div className="flex justify-between sm:block">
                <dt className="text-muted-foreground">Display</dt>
                <dd>{product.specs.display}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-muted-foreground">Processor</dt>
                <dd>{product.specs.processor}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-muted-foreground">Camera</dt>
                <dd>{product.specs.camera}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-muted-foreground">Battery</dt>
                <dd>{product.specs.battery}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-muted-foreground">Storage</dt>
                <dd>{product.specs.storage}</dd>
              </div>
              <div className="flex justify-between sm:block">
                <dt className="text-muted-foreground">OS</dt>
                <dd>{product.specs.os}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* Detailed Content Tabs */}
      <Tabs defaultValue="specs" className="mb-12">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specs">
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full" defaultValue="display">
                <AccordionItem value="display">
                  <AccordionTrigger>Display</AccordionTrigger>
                  <AccordionContent>{product.specs.display}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="processor">
                  <AccordionTrigger>Processor</AccordionTrigger>
                  <AccordionContent>{product.specs.processor}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="camera">
                  <AccordionTrigger>Camera</AccordionTrigger>
                  <AccordionContent>{product.specs.camera}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="battery">
                  <AccordionTrigger>Battery</AccordionTrigger>
                  <AccordionContent>{product.specs.battery}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="storage">
                  <AccordionTrigger>Storage</AccordionTrigger>
                  <AccordionContent>{product.specs.storage}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="os">
                  <AccordionTrigger>Operating System</AccordionTrigger>
                  <AccordionContent>{product.specs.os}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="connectivity">
                  <AccordionTrigger>Connectivity</AccordionTrigger>
                  <AccordionContent>{product.specs.connectivity}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="dimensions">
                  <AccordionTrigger>Dimensions</AccordionTrigger>
                  <AccordionContent>{product.specs.dimensions}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="weight">
                  <AccordionTrigger>Weight</AccordionTrigger>
                  <AccordionContent>{product.specs.weight}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="colors">
                  <AccordionTrigger>Colors</AccordionTrigger>
                  <AccordionContent>{product.specs.colors}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-summary">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {product.aiSummary.pros.map((pro, index) => (
                    <li key={index} className="flex">
                      <span className="text-green-500 mr-2">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {product.aiSummary.cons.map((con, index) => (
                    <li key={index} className="flex">
                      <span className="text-red-500 mr-2">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">AI Verdict</h3>
                <p className="text-muted-foreground">
                  {product.aiSummary.verdict}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium">User Reviews</h3>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                          <h4 className="font-medium ml-2">{review.title}</h4>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      
                      <p className="text-sm mb-2">
                        by {review.user}
                      </p>
                      
                      <p className="mb-2">{review.content}</p>
                      
                      <div className="text-sm">
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Similar Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.similarProducts.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <Card className="overflow-hidden h-full hover:border-primary transition-colors">
                <div className="aspect-square bg-secondary p-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="font-bold mt-1">${item.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          <Link to={`/compare?products=${product.id},${product.similarProducts.map(p => p.id).join(',')}`} className="flex items-center justify-center">
            <Button variant="outline" className="w-full h-full">
              Compare All
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
