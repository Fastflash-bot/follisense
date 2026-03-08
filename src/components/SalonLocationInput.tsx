import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const supportedCountries = [
  'Nigeria', 'United Kingdom', 'United States', 'Ghana', 'South Africa',
  'Kenya', 'Canada', 'Jamaica', 'Trinidad and Tobago', 'Barbados',
  'France', 'Germany', 'Netherlands', 'Australia', 'UAE',
  'Brazil', 'Cameroon', 'Senegal', 'Ethiopia', 'Tanzania',
];

export interface SalonLocation {
  country: string;
  city: string;
  salonName: string;
  area?: string;
}

interface SalonLocationInputProps {
  value: SalonLocation;
  onChange: (val: SalonLocation) => void;
  salonLabel?: string;
}

const SalonLocationInput = ({ value, onChange, salonLabel = 'Salon name' }: SalonLocationInputProps) => {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  return (
    <div className="space-y-3">
      {/* Country */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Country</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className="w-full h-12 px-4 rounded-xl border-2 border-border bg-card text-left text-sm flex items-center justify-between focus:outline-none focus:border-primary transition-colors"
          >
            <span className={value.country ? 'text-foreground' : 'text-muted-foreground'}>
              {value.country || 'Select country'}
            </span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </button>
          {showCountryDropdown && (
            <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
              {supportedCountries.map(c => (
                <button
                  key={c}
                  onClick={() => { onChange({ ...value, country: c }); setShowCountryDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors ${value.country === c ? 'bg-primary/5 text-primary font-medium' : 'text-foreground'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">City / town</label>
        <input
          type="text"
          value={value.city}
          onChange={e => onChange({ ...value, city: e.target.value })}
          placeholder="e.g. Lagos, London, Atlanta"
          className="w-full h-12 px-4 rounded-xl border-2 border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Salon name */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">{salonLabel}</label>
        <input
          type="text"
          value={value.salonName}
          onChange={e => onChange({ ...value, salonName: e.target.value })}
          placeholder="e.g. Natural Touch Studio"
          className="w-full h-12 px-4 rounded-xl border-2 border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Area (optional) */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Area / neighbourhood <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={value.area || ''}
          onChange={e => onChange({ ...value, area: e.target.value })}
          placeholder="e.g. Lekki, Brixton, Midtown"
          className="w-full h-12 px-4 rounded-xl border-2 border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>
    </div>
  );
};

export default SalonLocationInput;
