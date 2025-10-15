export interface Branch {
  id: string;
  name: string;
  location: string;
  country: string;
  dateOfEstablishment: string;
  availableServices: string[];
  contact: {
    phone?: string;
    email?: string;
    address: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  status: 'active' | 'inactive' | 'developing';
  memberCount?: number;
}

export const branches: Branch[] = [
  {
    id: 'bulawayo',
    name: 'Bulawayo',
    location: 'Bulawayo',
    country: 'Zimbabwe',
    dateOfEstablishment: '2010-01-01',
    availableServices: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday-morning', 'saturday-afternoon', 'sunday-morning', 'sunday-afternoon'],
    contact: {
      address: 'Bulawayo Central, Zimbabwe'
    },
    status: 'active'
  },
  {
    id: 'harare',
    name: 'Harare Branch',
    location: 'Harare',
    country: 'Zimbabwe',
    dateOfEstablishment: '2012-03-15',
    availableServices: ['sunday-morning', 'sunday-afternoon'],
    contact: {
      address: 'Harare Central, Zimbabwe'
    },
    status: 'active'
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    location: 'Johannesburg',
    country: 'South Africa',
    dateOfEstablishment: '2015-06-01',
    availableServices: ['sunday-morning', 'sunday-afternoon'],
    contact: {
      address: 'Johannesburg Central, South Africa'
    },
    status: 'active'
  },
  {
    id: 'pretoria',
    name: 'Pretoria Branch',
    location: 'Pretoria',
    country: 'South Africa',
    dateOfEstablishment: '2017-08-20',
    availableServices: ['sunday-morning', 'sunday-afternoon'],
    contact: {
      address: 'Pretoria Central, South Africa'
    },
    status: 'active'
  },
  {
    id: 'gaborone',
    name: 'Gaborone Branch',
    location: 'Gaborone',
    country: 'Botswana',
    dateOfEstablishment: '2018-02-10',
    availableServices: ['sunday-morning', 'sunday-afternoon'],
    contact: {
      address: 'Gaborone Central, Botswana'
    },
    status: 'active'
  }
];

// Helper functions
export const getBranchById = (id: string): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

export const getBranchesByCountry = (country: string): Branch[] => {
  return branches.filter(branch => branch.country === country);
};

export const getBranchesByService = (serviceType: string): Branch[] => {
  return branches.filter(branch => branch.availableServices.includes(serviceType));
};

export const getActiveBranches = (): Branch[] => {
  return branches.filter(branch => branch.status === 'active');
};
