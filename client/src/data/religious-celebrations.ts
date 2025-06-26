// Religious celebrations calendar with authentic dates
export interface ReligiousCelebration {
  id: string;
  name: string;
  message: string;
  religion: string;
  dateType: 'fixed' | 'lunar' | 'calculated';
  // For fixed dates (Christmas, New Year)
  month?: number;
  day?: number;
  // For lunar/calculated dates, we'll check current year
  startDate?: string; // Format: YYYY-MM-DD
  endDate?: string;
  color: string;
  emoji: string;
  priority: number; // Higher number = higher priority when multiple celebrations overlap
}

// Get current year for dynamic date calculations
const currentYear = new Date().getFullYear();

// Helper function to calculate Easter date for any year
function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export const religiousCelebrations: ReligiousCelebration[] = [
  // Christianity
  {
    id: 'new-year',
    name: 'New Year',
    message: 'Happy New Year from Family Kebab House! Wishing you prosperity and delicious meals in the year ahead!',
    religion: 'Universal',
    dateType: 'fixed',
    month: 1,
    day: 1,
    color: 'bg-gradient-to-r from-purple-600 to-blue-600',
    emoji: '🎉',
    priority: 10
  },
  {
    id: 'christmas',
    name: 'Christmas',
    message: 'Merry Christmas from all of us at Family Kebab House! May your holidays be filled with joy, warmth, and great food!',
    religion: 'Christianity',
    dateType: 'fixed',
    month: 12,
    day: 25,
    color: 'bg-gradient-to-r from-red-600 to-green-600',
    emoji: '🎄',
    priority: 9
  },
  {
    id: 'christmas-eve',
    name: 'Christmas Eve',
    message: 'Christmas Eve blessings from Family Kebab House! Enjoy this special evening with family and friends!',
    religion: 'Christianity',
    dateType: 'fixed',
    month: 12,
    day: 24,
    color: 'bg-gradient-to-r from-red-500 to-green-500',
    emoji: '🎁',
    priority: 8
  },

  // Easter - dynamically calculated
  {
    id: 'easter-current',
    name: 'Easter',
    message: 'Happy Easter from Family Kebab House! May this day bring you renewal, hope, and joyful celebrations!',
    religion: 'Christianity',
    dateType: 'calculated',
    startDate: calculateEaster(currentYear).toISOString().split('T')[0],
    endDate: calculateEaster(currentYear).toISOString().split('T')[0],
    color: 'bg-gradient-to-r from-yellow-400 to-pink-500',
    emoji: '🐰',
    priority: 8
  },

  // Easter next year
  {
    id: 'easter-next',
    name: 'Easter',
    message: 'Happy Easter from Family Kebab House! May this day bring you renewal, hope, and joyful celebrations!',
    religion: 'Christianity',
    dateType: 'calculated',
    startDate: calculateEaster(currentYear + 1).toISOString().split('T')[0],
    endDate: calculateEaster(currentYear + 1).toISOString().split('T')[0],
    color: 'bg-gradient-to-r from-yellow-400 to-pink-500',
    emoji: '🐰',
    priority: 8
  },

  // Islam - Ramadan 2025 (February 28 - March 30)
  {
    id: 'ramadan-2025',
    name: 'Ramadan Mubarak',
    message: 'Ramadan Mubarak from Family Kebab House! May this holy month bring you peace, reflection, and blessed iftar meals!',
    religion: 'Islam',
    dateType: 'calculated',
    startDate: '2025-02-28',
    endDate: '2025-03-30',
    color: 'bg-gradient-to-r from-green-600 to-blue-600',
    emoji: '🌙',
    priority: 9
  },

  // Ramadan 2026 (February 17 - March 18)
  {
    id: 'ramadan-2026',
    name: 'Ramadan Mubarak',
    message: 'Ramadan Mubarak from Family Kebab House! May this holy month bring you peace, reflection, and blessed iftar meals!',
    religion: 'Islam',
    dateType: 'calculated',
    startDate: '2026-02-17',
    endDate: '2026-03-18',
    color: 'bg-gradient-to-r from-green-600 to-blue-600',
    emoji: '🌙',
    priority: 9
  },

  // Eid al-Fitr 2025 (March 31)
  {
    id: 'eid-fitr-2025',
    name: 'Eid al-Fitr',
    message: 'Eid Mubarak from Family Kebab House! Celebrate this joyous day with delicious food and loved ones!',
    religion: 'Islam',
    dateType: 'calculated',
    startDate: '2025-03-31',
    endDate: '2025-04-02',
    color: 'bg-gradient-to-r from-green-500 to-gold-500',
    emoji: '🕌',
    priority: 9
  },

  // Eid al-Fitr 2026 (March 19)
  {
    id: 'eid-fitr-2026',
    name: 'Eid al-Fitr',
    message: 'Eid Mubarak from Family Kebab House! Celebrate this joyous day with delicious food and loved ones!',
    religion: 'Islam',
    dateType: 'calculated',
    startDate: '2026-03-19',
    endDate: '2026-03-21',
    color: 'bg-gradient-to-r from-green-500 to-gold-500',
    emoji: '🕌',
    priority: 9
  },

  // Eid al-Adha 2025 (June 6-10)
  {
    id: 'eid-adha-2025',
    name: 'Eid al-Adha',
    message: 'Eid al-Adha Mubarak from Family Kebab House! May this blessed festival bring you happiness and unity!',
    religion: 'Islam',
    dateType: 'calculated',
    startDate: '2025-06-06',
    endDate: '2025-06-10',
    color: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    emoji: '🕌',
    priority: 9
  },

  // Eid al-Adha 2026 (May 26-30)
  {
    id: 'eid-adha-2026',
    name: 'Eid al-Adha',
    message: 'Eid al-Adha Mubarak from Family Kebab House! May this blessed festival bring you happiness and unity!',
    religion: 'Islam',
    dateType: 'calculated',
    startDate: '2026-05-26',
    endDate: '2026-05-30',
    color: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    emoji: '🕌',
    priority: 9
  },

  // Judaism - Rosh Hashanah 2025 (September 15-17)
  {
    id: 'rosh-hashanah-2025',
    name: 'Rosh Hashanah',
    message: 'Shanah Tovah from Family Kebab House! Wishing you a sweet and prosperous New Year!',
    religion: 'Judaism',
    dateType: 'calculated',
    startDate: '2025-09-15',
    endDate: '2025-09-17',
    color: 'bg-gradient-to-r from-blue-600 to-white',
    emoji: '🍯',
    priority: 8
  },

  // Rosh Hashanah 2026 (September 4-6)
  {
    id: 'rosh-hashanah-2026',
    name: 'Rosh Hashanah',
    message: 'Shanah Tovah from Family Kebab House! Wishing you a sweet and prosperous New Year!',
    religion: 'Judaism',
    dateType: 'calculated',
    startDate: '2026-09-04',
    endDate: '2026-09-06',
    color: 'bg-gradient-to-r from-blue-600 to-white',
    emoji: '🍯',
    priority: 8
  },

  // Yom Kippur 2025 (September 24)
  {
    id: 'yom-kippur-2025',
    name: 'Yom Kippur',
    message: 'Wishing you a meaningful Yom Kippur from Family Kebab House. May this day bring reflection and peace.',
    religion: 'Judaism',
    dateType: 'calculated',
    startDate: '2025-09-24',
    endDate: '2025-09-24',
    color: 'bg-gradient-to-r from-blue-800 to-white',
    emoji: '✡️',
    priority: 8
  },

  // Yom Kippur 2026 (September 13)
  {
    id: 'yom-kippur-2026',
    name: 'Yom Kippur',
    message: 'Wishing you a meaningful Yom Kippur from Family Kebab House. May this day bring reflection and peace.',
    religion: 'Judaism',
    dateType: 'calculated',
    startDate: '2026-09-13',
    endDate: '2026-09-13',
    color: 'bg-gradient-to-r from-blue-800 to-white',
    emoji: '✡️',
    priority: 8
  },

  // Hanukkah 2025 (December 14-22)
  {
    id: 'hanukkah-2025',
    name: 'Hanukkah',
    message: 'Happy Hanukkah from Family Kebab House! May the Festival of Lights bring joy and warmth to your celebrations!',
    religion: 'Judaism',
    dateType: 'calculated',
    startDate: '2025-12-14',
    endDate: '2025-12-22',
    color: 'bg-gradient-to-r from-blue-600 to-yellow-400',
    emoji: '🕎',
    priority: 8
  },

  // Hanukkah 2026 (December 4-12)
  {
    id: 'hanukkah-2026',
    name: 'Hanukkah',
    message: 'Happy Hanukkah from Family Kebab House! May the Festival of Lights bring joy and warmth to your celebrations!',
    religion: 'Judaism',
    dateType: 'calculated',
    startDate: '2026-12-04',
    endDate: '2026-12-12',
    color: 'bg-gradient-to-r from-blue-600 to-yellow-400',
    emoji: '🕎',
    priority: 8
  },

  // Hinduism - Diwali 2025 (November 1)
  {
    id: 'diwali-2025',
    name: 'Diwali',
    message: 'Happy Diwali from Family Kebab House! May the Festival of Lights illuminate your life with joy and prosperity!',
    religion: 'Hinduism',
    dateType: 'calculated',
    startDate: '2025-11-01',
    endDate: '2025-11-01',
    color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    emoji: '🪔',
    priority: 8
  },

  // Diwali 2026 (October 21)
  {
    id: 'diwali-2026',
    name: 'Diwali',
    message: 'Happy Diwali from Family Kebab House! May the Festival of Lights illuminate your life with joy and prosperity!',
    religion: 'Hinduism',
    dateType: 'calculated',
    startDate: '2026-10-21',
    endDate: '2026-10-21',
    color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    emoji: '🪔',
    priority: 8
  },

  // Buddhism - Vesak Day 2025 (May 12)
  {
    id: 'vesak-2025',
    name: 'Vesak Day',
    message: 'Happy Vesak Day from Family Kebab House! May this day bring peace, wisdom, and compassion to all.',
    religion: 'Buddhism',
    dateType: 'calculated',
    startDate: '2025-05-12',
    endDate: '2025-05-12',
    color: 'bg-gradient-to-r from-orange-400 to-yellow-400',
    emoji: '☸️',
    priority: 7
  },

  // Vesak Day 2026 (May 31)
  {
    id: 'vesak-2026',
    name: 'Vesak Day',
    message: 'Happy Vesak Day from Family Kebab House! May this day bring peace, wisdom, and compassion to all.',
    religion: 'Buddhism',
    dateType: 'calculated',
    startDate: '2026-05-31',
    endDate: '2026-05-31',
    color: 'bg-gradient-to-r from-orange-400 to-yellow-400',
    emoji: '☸️',
    priority: 7
  },

  // Sikh - Vaisakhi (April 13-14 annually)
  {
    id: 'vaisakhi-2025',
    name: 'Vaisakhi',
    message: 'Happy Vaisakhi from Family Kebab House! May this harvest festival bring abundance and joy to your family!',
    religion: 'Sikhism',
    dateType: 'calculated',
    startDate: '2025-04-13',
    endDate: '2025-04-13',
    color: 'bg-gradient-to-r from-orange-500 to-blue-500',
    emoji: '🌾',
    priority: 7
  },

  {
    id: 'vaisakhi-2026',
    name: 'Vaisakhi',
    message: 'Happy Vaisakhi from Family Kebab House! May this harvest festival bring abundance and joy to your family!',
    religion: 'Sikhism',
    dateType: 'calculated',
    startDate: '2026-04-14',
    endDate: '2026-04-14',
    color: 'bg-gradient-to-r from-orange-500 to-blue-500',
    emoji: '🌾',
    priority: 7
  },

  // Additional celebrations
  // Chinese New Year 2025 (January 29)
  {
    id: 'chinese-new-year-2025',
    name: 'Chinese New Year',
    message: 'Gong Xi Fa Cai from Family Kebab House! Wishing you prosperity and good fortune in the Year of the Snake!',
    religion: 'Chinese Traditional',
    dateType: 'calculated',
    startDate: '2025-01-29',
    endDate: '2025-01-29',
    color: 'bg-gradient-to-r from-red-600 to-yellow-500',
    emoji: '🐍',
    priority: 8
  },

  // Chinese New Year 2026 (February 17)
  {
    id: 'chinese-new-year-2026',
    name: 'Chinese New Year',
    message: 'Gong Xi Fa Cai from Family Kebab House! Wishing you prosperity and good fortune in the Year of the Horse!',
    religion: 'Chinese Traditional',
    dateType: 'calculated',
    startDate: '2026-02-17',
    endDate: '2026-02-17',
    color: 'bg-gradient-to-r from-red-600 to-yellow-500',
    emoji: '🐎',
    priority: 8
  }
];

export const defaultWelcomeMessage = {
  message: 'Welcome to Family Kebab House - Stalham Norwich\'s Premier Kebab Shop! Over 20 years serving authentic Mediterranean cuisine with fresh ingredients daily.',
  color: 'bg-gradient-to-r from-red-600 to-yellow-500',
  emoji: '🏠'
};

export function getCurrentCelebration(): ReligiousCelebration | null {
  const today = new Date();
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  // Filter active celebrations
  const activeCelebrations = religiousCelebrations.filter(celebration => {
    if (celebration.dateType === 'fixed' && celebration.month && celebration.day) {
      const celebrationDate = new Date(today.getFullYear(), celebration.month - 1, celebration.day);
      return currentDate.getTime() === celebrationDate.getTime();
    }
    
    if (celebration.dateType === 'calculated' && celebration.startDate && celebration.endDate) {
      const startDate = new Date(celebration.startDate);
      const endDate = new Date(celebration.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    }
    
    return false;
  });
  
  // Return the highest priority celebration if multiple are active
  if (activeCelebrations.length > 0) {
    const sortedCelebrations = activeCelebrations.toSorted((a, b) => b.priority - a.priority);
    return sortedCelebrations[0];
  }
  
  return null;
}

export function isWithinCelebrationPeriod(celebration: ReligiousCelebration): boolean {
  const today = new Date();
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  if (celebration.dateType === 'fixed' && celebration.month && celebration.day) {
    const celebrationDate = new Date(today.getFullYear(), celebration.month - 1, celebration.day);
    return currentDate.getTime() === celebrationDate.getTime();
  }
  
  if (celebration.dateType === 'calculated' && celebration.startDate && celebration.endDate) {
    const startDate = new Date(celebration.startDate);
    const endDate = new Date(celebration.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  }
  
  return false;
}
