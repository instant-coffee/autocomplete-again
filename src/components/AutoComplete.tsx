import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';

interface ACComponentProps {
    apiKey: string;
}

interface Suggestion {
  description: string;
  place_id: string;
}



const Autocomplete: React.FC<ACComponentProps> = ({apiKey}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });
  useEffect(() => {
    if (isLoaded) {
        const autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const mappedPredictions = predictions.map(prediction => ({
                description: prediction.description,
                place_id: prediction.place_id,
            }));
            setSuggestions(mappedPredictions);
            } else {
            console.error('Error fetching suggestions:', status);
            }
        }); 
    }
  }, [isLoaded, query]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.description);
    setSuggestions([]);  // Clear suggestions after selection
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type an address"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map(suggestion => (
            <li key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Autocomplete };
