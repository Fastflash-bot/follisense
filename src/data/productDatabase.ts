export interface Product {
  id: string;
  brand: string;
  name: string;
  type: string;
  category: 'scalp' | 'hair' | 'both';
  keywords?: string[];
}

export const productDatabase: Product[] = [
  // SCALP PRODUCTS
  { id: 'sp1', brand: 'Mielle', name: 'Rosemary Mint Scalp & Hair Strengthening Oil', type: 'Oil', category: 'scalp', keywords: ['rosemary', 'mint', 'strengthening'] },
  { id: 'sp2', brand: 'Mielle', name: 'Rosemary Mint Light Scalp Serum', type: 'Serum', category: 'scalp', keywords: ['rosemary', 'mint'] },
  { id: 'sp3', brand: "Jamaican Mango & Lime", name: 'Island Oil', type: 'Oil', category: 'scalp', keywords: ['jamaican', 'mango'] },
  { id: 'sp4', brand: 'Generic', name: 'Jamaican Black Castor Oil', type: 'Oil', category: 'scalp', keywords: ['jbco', 'castor'] },
  { id: 'sp5', brand: 'The Ordinary', name: 'Multi-Peptide Serum for Hair Density', type: 'Serum', category: 'scalp', keywords: ['peptide', 'density', 'growth'] },
  { id: 'sp6', brand: 'Nizoral', name: 'Anti-Dandruff Shampoo', type: 'Medicated Shampoo', category: 'scalp', keywords: ['ketoconazole', 'dandruff', 'antifungal'] },
  { id: 'sp7', brand: 'Head & Shoulders', name: 'Royal Oils Moisture Boost Shampoo', type: 'Shampoo', category: 'scalp', keywords: ['dandruff', 'moisture'] },
  { id: 'sp8', brand: 'Head & Shoulders', name: 'Clinical Strength', type: 'Medicated Shampoo', category: 'scalp', keywords: ['dandruff', 'clinical'] },
  { id: 'sp9', brand: 'Neutrogena', name: 'T/Gel Therapeutic Shampoo', type: 'Medicated Shampoo', category: 'scalp', keywords: ['tar', 'therapeutic'] },
  { id: 'sp10', brand: 'Selsun Blue', name: 'Medicated', type: 'Medicated Shampoo', category: 'scalp', keywords: ['selenium', 'dandruff'] },
  { id: 'sp11', brand: 'Philip Kingsley', name: 'Flaky Scalp Cleansing Shampoo', type: 'Medicated Shampoo', category: 'scalp', keywords: ['flaky', 'flaking'] },
  { id: 'sp12', brand: 'Briogeo', name: 'Scalp Revival Charcoal + Tea Tree Shampoo', type: 'Clarifying Shampoo', category: 'scalp', keywords: ['charcoal', 'tea tree', 'clarifying'] },
  { id: 'sp13', brand: 'Amika', name: 'Reset Pink Charcoal Scalp Cleansing Oil', type: 'Scalp Treatment', category: 'scalp', keywords: ['charcoal', 'cleansing'] },
  { id: 'sp14', brand: 'Amika', name: 'The Kure Bond Repair Shampoo', type: 'Shampoo', category: 'both', keywords: ['bond', 'repair'] },
  { id: 'sp15', brand: 'SheaMoisture', name: 'African Water Mint & Ginger Detox Shampoo', type: 'Clarifying Shampoo', category: 'scalp', keywords: ['detox', 'clarifying', 'mint', 'ginger'] },
  { id: 'sp16', brand: 'Cantu', name: 'Apple Cider Vinegar Root Rinse', type: 'Rinse', category: 'scalp', keywords: ['acv', 'apple cider', 'vinegar'] },
  { id: 'sp17', brand: 'Wild Growth', name: 'Hair Oil', type: 'Oil', category: 'scalp', keywords: ['growth'] },
  { id: 'sp18', brand: 'Tropical Isle Living', name: 'Jamaican Black Castor Oil', type: 'Oil', category: 'scalp', keywords: ['jbco', 'castor'] },
  { id: 'sp19', brand: 'ORS', name: 'HAIRepair Scalp Rescuing Detox', type: 'Scalp Treatment', category: 'scalp', keywords: ['detox', 'repair'] },
  { id: 'sp20', brand: 'Sulfur8', name: 'Medicated Anti-Dandruff Hair & Scalp Conditioner', type: 'Treatment', category: 'scalp', keywords: ['sulfur', 'dandruff', 'medicated'] },
  { id: 'sp21', brand: 'Generic', name: 'Minoxidil 5% (Rogaine / generic)', type: 'Topical Treatment', category: 'scalp', keywords: ['minoxidil', 'rogaine', 'growth', 'regrowth'] },
  { id: 'sp22', brand: 'Nioxin', name: 'Scalp & Hair Treatment System', type: 'Treatment System', category: 'scalp', keywords: ['thinning', 'system'] },
  { id: 'sp23', brand: 'Generic', name: 'Tea tree oil', type: 'Essential Oil', category: 'scalp', keywords: ['tea tree', 'essential'] },
  { id: 'sp24', brand: 'Generic', name: 'Peppermint oil', type: 'Essential Oil', category: 'scalp', keywords: ['peppermint', 'essential', 'mint'] },
  { id: 'sp25', brand: 'Generic', name: 'Rosemary oil', type: 'Essential Oil', category: 'scalp', keywords: ['rosemary', 'essential', 'growth'] },
  { id: 'sp26', brand: 'Generic', name: 'Castor oil', type: 'Oil', category: 'both', keywords: ['castor'] },
  { id: 'sp27', brand: 'Generic', name: 'Coconut oil', type: 'Oil', category: 'both', keywords: ['coconut'] },
  { id: 'sp28', brand: 'Generic', name: 'Jojoba oil', type: 'Oil', category: 'both', keywords: ['jojoba'] },
  { id: 'sp29', brand: 'Generic', name: 'Neem oil', type: 'Oil', category: 'scalp', keywords: ['neem'] },
  { id: 'sp30', brand: 'Design Essentials', name: 'Scalp & Skin Care Anti-Itch Treatment', type: 'Treatment', category: 'scalp', keywords: ['anti-itch', 'itch'] },
  { id: 'sp31', brand: 'As I Am', name: 'Dry & Itchy Scalp Care Olive & Tea Tree Oil Shampoo', type: 'Shampoo', category: 'scalp', keywords: ['dry', 'itchy', 'olive', 'tea tree'] },
  { id: 'sp32', brand: "Aunt Jackie's", name: 'Oh So Clean Moisturizing & Softening Shampoo', type: 'Shampoo', category: 'scalp', keywords: ['moisturizing', 'softening'] },

  // HAIR PRODUCTS
  { id: 'hp1', brand: 'SheaMoisture', name: 'Manuka Honey & Mafura Oil Intensive Hydration Masque', type: 'Deep Conditioner', category: 'hair', keywords: ['manuka', 'honey', 'hydration', 'mask'] },
  { id: 'hp2', brand: 'SheaMoisture', name: 'Coconut & Hibiscus Curl & Shine Conditioner', type: 'Conditioner', category: 'hair', keywords: ['coconut', 'hibiscus', 'curl'] },
  { id: 'hp3', brand: 'SheaMoisture', name: 'Jamaican Black Castor Oil Strengthen & Restore Leave-In', type: 'Leave-In Conditioner', category: 'hair', keywords: ['jbco', 'castor', 'strengthen', 'leave-in'] },
  { id: 'hp4', brand: 'Cantu', name: 'Shea Butter Leave-In Conditioning Repair Cream', type: 'Leave-In Conditioner', category: 'hair', keywords: ['shea', 'leave-in', 'repair'] },
  { id: 'hp5', brand: 'Cantu', name: 'Shea Butter Coconut Curling Cream', type: 'Curl Cream', category: 'hair', keywords: ['shea', 'coconut', 'curling'] },
  { id: 'hp6', brand: "Aunt Jackie's", name: 'Quench Moisture Intensive Leave-In Conditioner', type: 'Leave-In Conditioner', category: 'hair', keywords: ['moisture', 'leave-in'] },
  { id: 'hp7', brand: "Aunt Jackie's", name: "Don't Shrink Flaxseed Elongating Curling Gel", type: 'Gel', category: 'hair', keywords: ['flaxseed', 'curl', 'elongating', 'shrinkage'] },
  { id: 'hp8', brand: 'Eco Styler', name: 'Olive Oil Gel', type: 'Gel', category: 'hair', keywords: ['olive', 'gel', 'eco'] },
  { id: 'hp9', brand: 'Eco Styler', name: 'Argan Oil Gel', type: 'Gel', category: 'hair', keywords: ['argan', 'gel', 'eco'] },
  { id: 'hp10', brand: "Uncle Funky's Daughter", name: 'Curly Magic', type: 'Gel', category: 'hair', keywords: ['curly', 'magic', 'gel'] },
  { id: 'hp11', brand: 'Camille Rose', name: 'Curl Love Moisture Milk', type: 'Leave-In Conditioner', category: 'hair', keywords: ['curl', 'moisture', 'milk'] },
  { id: 'hp12', brand: 'Camille Rose', name: 'Honey Hydrate', type: 'Leave-In Conditioner', category: 'hair', keywords: ['honey', 'hydrate'] },
  { id: 'hp13', brand: 'Mielle', name: 'Pomegranate & Honey Leave-In Conditioner', type: 'Leave-In Conditioner', category: 'hair', keywords: ['pomegranate', 'honey', 'leave-in'] },
  { id: 'hp14', brand: 'Mielle', name: 'Pomegranate & Honey Curl Smoothie', type: 'Curl Cream', category: 'hair', keywords: ['pomegranate', 'honey', 'curl', 'smoothie'] },
  { id: 'hp15', brand: 'Mielle', name: 'Babassu Oil Mint Deep Conditioner', type: 'Deep Conditioner', category: 'hair', keywords: ['babassu', 'mint', 'deep conditioner'] },
  { id: 'hp16', brand: "Carol's Daughter", name: 'Coco Creme Curl Quenching Deep Moisture Mask', type: 'Deep Conditioner', category: 'hair', keywords: ['coco', 'curl', 'deep', 'mask'] },
  { id: 'hp17', brand: "Carol's Daughter", name: 'Black Vanilla Leave-In Conditioner', type: 'Leave-In Conditioner', category: 'hair', keywords: ['vanilla', 'leave-in'] },
  { id: 'hp18', brand: 'TGIN', name: 'Honey Miracle Hair Mask', type: 'Deep Conditioner', category: 'hair', keywords: ['honey', 'miracle', 'mask'] },
  { id: 'hp19', brand: 'TGIN', name: 'Butter Cream Daily Moisturizer', type: 'Moisturiser', category: 'hair', keywords: ['butter', 'cream', 'daily'] },
  { id: 'hp20', brand: 'Olaplex', name: 'No. 3 Hair Perfector', type: 'Bond Repair', category: 'hair', keywords: ['bond', 'repair', 'perfector'] },
  { id: 'hp21', brand: 'Olaplex', name: 'No. 0 Intensive Bond Building Treatment', type: 'Bond Repair', category: 'hair', keywords: ['bond', 'building', 'intensive'] },
  { id: 'hp22', brand: 'Olaplex', name: 'No. 6 Bond Smoother', type: 'Styling', category: 'hair', keywords: ['bond', 'smoother', 'styling'] },
  { id: 'hp23', brand: 'K18', name: 'Leave-In Molecular Repair Hair Mask', type: 'Bond Repair', category: 'hair', keywords: ['molecular', 'repair', 'k18'] },
  { id: 'hp24', brand: 'Aphogee', name: 'Two-Step Protein Treatment', type: 'Protein Treatment', category: 'hair', keywords: ['protein', 'two-step'] },
  { id: 'hp25', brand: 'Aphogee', name: 'Keratin 2 Minute Reconstructor', type: 'Protein Treatment', category: 'hair', keywords: ['keratin', 'protein', 'reconstructor'] },
  { id: 'hp26', brand: 'Curlsmith', name: 'Bond Curl Rehab Salve', type: 'Bond Repair', category: 'hair', keywords: ['bond', 'curl', 'rehab'] },
  { id: 'hp27', brand: 'Curlsmith', name: 'Strength Flexi-Jelly', type: 'Gel', category: 'hair', keywords: ['strength', 'jelly', 'gel'] },
  { id: 'hp28', brand: 'Moroccanoil', name: 'Treatment Oil', type: 'Oil', category: 'hair', keywords: ['argan', 'moroccan'] },
  { id: 'hp29', brand: 'Moroccanoil', name: 'Intense Hydrating Mask', type: 'Deep Conditioner', category: 'hair', keywords: ['hydrating', 'mask'] },
  { id: 'hp30', brand: 'The Ordinary', name: 'Natural Moisturizing Factors + HA (scalp use)', type: 'Moisturiser', category: 'both', keywords: ['moisturizing', 'hyaluronic'] },
  { id: 'hp31', brand: 'Briogeo', name: "Don't Despair Repair Deep Conditioning Mask", type: 'Deep Conditioner', category: 'hair', keywords: ['repair', 'deep', 'conditioning'] },
  { id: 'hp32', brand: 'Pattern Beauty', name: 'Leave-In Conditioner', type: 'Leave-In Conditioner', category: 'hair', keywords: ['pattern', 'tracee', 'leave-in'] },
  { id: 'hp33', brand: 'Pattern Beauty', name: 'Hydration Shampoo', type: 'Shampoo', category: 'hair', keywords: ['hydration', 'pattern'] },
  { id: 'hp34', brand: 'Twist by Ouidad', name: 'Curl Cream', type: 'Curl Cream', category: 'hair', keywords: ['twist', 'ouidad', 'curl'] },
  { id: 'hp35', brand: 'DevaCurl', name: 'SuperCream Coconut Curl Styler', type: 'Curl Cream', category: 'hair', keywords: ['deva', 'coconut', 'curl'] },
  { id: 'hp36', brand: 'Kinky-Curly', name: 'Knot Today Leave-In Conditioner', type: 'Leave-In Conditioner', category: 'hair', keywords: ['knot', 'detangler', 'leave-in'] },
  { id: 'hp37', brand: 'Kinky-Curly', name: 'Curling Custard', type: 'Gel', category: 'hair', keywords: ['custard', 'curl', 'gel'] },
  { id: 'hp38', brand: 'Got2b', name: 'Glued Blasting Freeze Spray', type: 'Styling', category: 'hair', keywords: ['freeze', 'spray', 'hold'] },
  { id: 'hp39', brand: 'Gorilla Snot', name: 'Gel', type: 'Edge Control', category: 'hair', keywords: ['edge', 'hold', 'gorilla'] },
  { id: 'hp40', brand: 'Ebin New York', name: '24 Hour Edge Tamer', type: 'Edge Control', category: 'hair', keywords: ['edge', 'tamer', 'ebin'] },
  { id: 'hp41', brand: 'Hicks', name: 'Edges Pomade', type: 'Edge Control', category: 'hair', keywords: ['edge', 'pomade', 'hicks'] },
  { id: 'hp42', brand: 'CHI', name: '44 Iron Guard Thermal Protecting Spray', type: 'Heat Protectant', category: 'hair', keywords: ['heat', 'protectant', 'iron', 'chi'] },
  { id: 'hp43', brand: 'TRESemme', name: 'Keratin Smooth Heat Protection Spray', type: 'Heat Protectant', category: 'hair', keywords: ['heat', 'protectant', 'keratin'] },
  { id: 'hp44', brand: 'GHD', name: 'Bodyguard Heat Protect Spray', type: 'Heat Protectant', category: 'hair', keywords: ['heat', 'protectant', 'ghd'] },
  { id: 'hp45', brand: 'Mizani', name: '25 Miracle Milk Leave-In Conditioner', type: 'Leave-In Conditioner', category: 'hair', keywords: ['miracle', 'milk', 'leave-in'] },
  { id: 'hp46', brand: 'Mizani', name: 'Moisture Fusion Intense Moisturizing Mask', type: 'Deep Conditioner', category: 'hair', keywords: ['moisture', 'fusion', 'mask'] },
  { id: 'hp47', brand: 'African Pride', name: 'Moisture Miracle Shea Butter & Flaxseed Oil Curling Cream', type: 'Curl Cream', category: 'hair', keywords: ['moisture', 'shea', 'flaxseed', 'curl'] },
  { id: 'hp48', brand: 'Dark & Lovely', name: 'Au Naturale Anti-Shrinkage Clumping Curl Creme', type: 'Curl Cream', category: 'hair', keywords: ['anti-shrinkage', 'curl', 'clumping'] },
  { id: 'hp49', brand: 'SheaMoisture', name: 'Manuka Honey & Yogurt Hydrate + Repair Protein Treatment', type: 'Protein Treatment', category: 'hair', keywords: ['manuka', 'yogurt', 'protein'] },
  { id: 'hp50', brand: "Jamaican Mango & Lime", name: 'No More Itch Cool Scalp Spray', type: 'Scalp Spray', category: 'scalp', keywords: ['itch', 'cool', 'spray'] },
  { id: 'hp51', brand: "Jamaican Mango & Lime", name: 'Locking Firm Wax', type: 'Loc Product', category: 'hair', keywords: ['loc', 'locking', 'wax'] },
  { id: 'hp52', brand: "Murray's", name: 'Beeswax', type: 'Pomade', category: 'hair', keywords: ['beeswax', 'pomade', 'waves'] },
  { id: 'hp53', brand: 'S-Curl', name: 'No Drip Curl Activator', type: 'Wave Product', category: 'hair', keywords: ['curl', 'activator', 'waves', 's-curl'] },
  { id: 'hp54', brand: 'WaveBuilder', name: 'Cocoa & Shea Wave Butter', type: 'Wave Product', category: 'hair', keywords: ['wave', 'butter', 'cocoa', 'shea'] },
  { id: 'hp55', brand: 'Generic', name: 'Argan oil', type: 'Oil', category: 'hair', keywords: ['argan'] },
  { id: 'hp56', brand: 'Generic', name: 'Grapeseed oil', type: 'Oil', category: 'hair', keywords: ['grapeseed'] },
  { id: 'hp57', brand: 'Generic', name: 'Avocado oil', type: 'Oil', category: 'hair', keywords: ['avocado'] },
  { id: 'hp58', brand: 'Generic', name: 'Shea butter', type: 'Butter', category: 'hair', keywords: ['shea'] },
  { id: 'hp59', brand: 'Generic', name: 'Mango butter', type: 'Butter', category: 'hair', keywords: ['mango'] },
  { id: 'hp60', brand: 'Homemade', name: 'Flaxseed gel', type: 'Gel', category: 'hair', keywords: ['flaxseed', 'homemade', 'diy'] },
  { id: 'hp61', brand: 'Homemade', name: 'Rice water rinse', type: 'Rinse', category: 'hair', keywords: ['rice', 'water', 'homemade', 'diy', 'protein'] },
  { id: 'hp62', brand: 'Homemade', name: 'Apple cider vinegar rinse', type: 'Rinse', category: 'both', keywords: ['acv', 'apple cider', 'vinegar', 'homemade', 'diy'] },
];

export function searchProducts(query: string, category?: 'scalp' | 'hair'): Product[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  let pool = productDatabase;
  if (category === 'scalp') {
    pool = pool.filter(p => p.category === 'scalp' || p.category === 'both');
  } else if (category === 'hair') {
    pool = pool.filter(p => p.category === 'hair' || p.category === 'both');
  }

  return pool.filter(p => {
    const searchable = `${p.brand} ${p.name} ${p.type} ${(p.keywords || []).join(' ')}`.toLowerCase();
    // Split query into words and check all match
    const words = q.split(/\s+/);
    return words.every(w => searchable.includes(w));
  }).slice(0, 8);
}

export function getProductDisplayName(product: Product): string {
  if (product.brand === 'Generic' || product.brand === 'Homemade') {
    return product.name;
  }
  return `${product.brand} ${product.name}`;
}
