
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample data for autocomplete
const sampleSuggestions = {
  'iphone': [
    { id: 1, name: 'iPhone 15 Pro' },
    { id: 2, name: 'iPhone 15' },
    { id: 3, name: 'iPhone 14 Pro' },
  ],
  'samsung': [
    { id: 4, name: 'Samsung Galaxy S24 Ultra' },
    { id: 5, name: 'Samsung Galaxy S24' },
    { id: 6, name: 'Samsung Galaxy Z Fold 5' },
  ],
  'laptop': [
    { id: 7, name: 'MacBook Pro 16-inch' },
    { id: 8, name: 'Dell XPS 15' },
    { id: 9, name: 'Lenovo ThinkPad X1' },
  ],
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ id: number, name: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      // Simulate fetching suggestions
      const results: Array<{ id: number, name: string }> = [];
      Object.keys(sampleSuggestions).forEach(key => {
        if (key.toLowerCase().includes(value.toLowerCase())) {
          results.push(...sampleSuggestions[key as keyof typeof sampleSuggestions]);
        } else {
          sampleSuggestions[key as keyof typeof sampleSuggestions].forEach(product => {
            if (product.name.toLowerCase().includes(value.toLowerCase())) {
              results.push(product);
            }
          });
        }
      });
      
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (id: number, name: string) => {
    setQuery('');
    setShowSuggestions(false);
    navigate(`/product/${id}-${name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="flex w-full">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={handleInputChange}
            className="w-full pr-10"
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-1 bg-card rounded-md shadow-lg border border-border overflow-hidden">
          <ul>
            {suggestions.map((item) => (
              <li 
                key={item.id}
                onClick={() => handleSuggestionClick(item.id, item.name)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-secondary"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
