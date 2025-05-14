
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

const AboutContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
        {/* About Section */}
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-6">About CompareHub</h1>
            <p className="text-lg text-muted-foreground mb-6">
              We help consumers make better purchasing decisions through detailed product comparisons and AI-powered insights.
            </p>
            <p className="text-muted-foreground mb-6">
              At CompareHub, we believe that informed consumers make better choices. Our mission is to provide you with reliable, unbiased information about products so you can find exactly what's right for your needs and budget.
            </p>
            <p className="text-muted-foreground">
              We combine expert product knowledge, real user reviews, and advanced AI analysis to give you a comprehensive understanding of products side-by-side, highlighting the differences that matter most.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 pt-1">
                  <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center text-primary">
                    01
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Unbiased Information</h3>
                  <p className="text-muted-foreground">
                    We are committed to providing objective, fact-based comparisons without favoring any brand or product.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 pt-1">
                  <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center text-primary">
                    02
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Data Accuracy</h3>
                  <p className="text-muted-foreground">
                    We diligently verify all product specifications and regularly update our data to ensure accuracy.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 pt-1">
                  <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center text-primary">
                    03
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Consumer First</h3>
                  <p className="text-muted-foreground">
                    We design our tools and content with your needs in mind, making complex information easy to understand.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 pt-1">
                  <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center text-primary">
                    04
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Transparency</h3>
                  <p className="text-muted-foreground">
                    We're transparent about how we get our data, how our comparisons work, and how our AI makes recommendations.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have a question, suggestion, or feedback? We'd love to hear from you. Fill out the form below or use our contact information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input id="name" required placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" required placeholder="john@example.com" />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input id="subject" required placeholder="How can we help you?" />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea 
                id="message" 
                required 
                placeholder="Tell us more about your inquiry..." 
                rows={5}
              />
            </div>
            
            <Button type="submit" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Email Us</h3>
                <a href="mailto:info@comparehub.com" className="text-muted-foreground hover:text-primary">
                  info@comparehub.com
                </a>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Call Us</h3>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-muted-foreground">
                  123 Tech Avenue, San Francisco, CA 94107
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Live Chat</h3>
                <p className="text-muted-foreground">
                  Available weekdays, 9AM - 6PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How are the product specifications collected?</AccordionTrigger>
              <AccordionContent>
                Our product data comes from multiple reliable sources, including official manufacturer specifications, detailed testing by our team, and verified third-party sources. We regularly update our database to ensure all information is accurate and up-to-date.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the comparison tool work?</AccordionTrigger>
              <AccordionContent>
                Our comparison tool allows you to select up to 4 products and view them side-by-side. The tool highlights differences between products, making it easy to see which product excels in specific areas. You can compare detailed specifications, prices from different retailers, user ratings, and get AI-powered insights tailored to your comparison.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Are the AI recommendations biased towards certain brands?</AccordionTrigger>
              <AccordionContent>
                No. Our AI recommendations are based solely on the product specifications, user reviews, and price data. The AI is designed to provide unbiased advice based on objective data and does not favor any specific brand or manufacturer. We regularly audit our AI system to ensure it remains neutral.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How often is the price information updated?</AccordionTrigger>
              <AccordionContent>
                Price information is updated several times a day from major retailers. However, prices can change rapidly, so we always recommend clicking through to the retailer to confirm the current price before making a purchase decision.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Do you make money from product referrals?</AccordionTrigger>
              <AccordionContent>
                Yes, we may earn a commission when you purchase a product through links on our site. However, this never influences our recommendations or comparisons. Our primary goal is to provide accurate, helpful information regardless of our affiliate relationships.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I request a product to be added to the database?</AccordionTrigger>
              <AccordionContent>
                Absolutely! If you don't find a product you're looking for, please contact us with the product details, and our team will work to add it to our database. We're constantly expanding our product catalog based on user requests and market trends.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12 px-4 rounded-lg bg-gradient-to-r from-brand-blue to-brand-indigo text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to make smarter shopping decisions?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Start comparing products now and find the perfect match for your needs and budget.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link to="/" className="flex items-center">
            Start Comparing Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutContactPage;
