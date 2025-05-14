
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CompareHub</h3>
            <p className="text-muted-foreground text-sm">
              Making product comparisons simple and informative to help you make the best purchasing decisions.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground text-sm hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground text-sm hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-muted-foreground text-sm hover:text-primary">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground text-sm hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground text-sm hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Follow us on social media for the latest updates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-primary/80" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" className="text-primary hover:text-primary/80" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" className="text-primary hover:text-primary/80" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CompareHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
