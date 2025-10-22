import { Domain } from '../types';
import { Database, DollarSign, Settings, Wrench, Globe, Users, Leaf, Briefcase } from 'lucide-react';

export const domains: Domain[] = [
  {
    id: 'general',
    name: 'General',
    icon: 'Database',
    description: 'Master data, entity references, standard lists',
    items: [
      {
        id: 'vessel-master',
        name: 'Vessel Master',
        type: 'dashboard',
        description: 'Master data for all vessels in the fleet',
        embedUrl: 'https://app.powerbi.com/view?r=example-vessel-master'
      },
      {
        id: 'voyage-master',
        name: 'Voyage Master',
        type: 'dashboard',
        description: 'Voyage tracking and master data',
        embedUrl: 'https://app.powerbi.com/view?r=example-voyage-master'
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: 'DollarSign',
    description: 'Financial reporting',
    items: [
      {
        id: 'running-cost',
        name: 'Running Cost',
        type: 'dashboard',
        description: 'Vessel running cost analysis',
        embedUrl: 'https://app.powerbi.com/view?r=example-running-cost'
      },
      {
        id: 'ga-analysis',
        name: 'G&A Analysis',
        type: 'dashboard',
        description: 'General and administrative cost tracking',
        embedUrl: 'https://app.powerbi.com/view?r=example-ga'
      },
      {
        id: 'flux-analysis',
        name: 'Flux Analysis',
        type: 'dashboard',
        description: 'Financial flux and variance analysis',
        embedUrl: 'https://app.powerbi.com/view?r=example-flux'
      }
    ]
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: 'Settings',
    description: 'Daily operational insights and scheduling',
    items: [
      {
        id: 'voyage-management',
        name: 'Voyage Management',
        type: 'app',
        description: 'Track and manage vessel voyages',
        pages: ['Overview', 'Active Voyages', 'Planning', 'Reports']
      },
      {
        id: 'chartering-scheduler',
        name: 'Chartering Scheduler',
        type: 'app',
        description: 'Schedule and optimize charter operations',
        pages: ['Calendar', 'Contracts', 'Availability']
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: 'Wrench',
    description: 'Maintenance tracking, performance benchmarking',
    items: [
      {
        id: 'speed-fuel',
        name: 'Speed and Fuel Consumption',
        type: 'dashboard',
        description: 'Vessel performance and fuel efficiency metrics',
        embedUrl: 'https://app.powerbi.com/view?r=example-speed-fuel'
      }
    ]
  },
  {
    id: 'market',
    name: 'Market',
    icon: 'Globe',
    description: 'Market analytics, freight rate monitoring',
    items: [
      {
        id: 'market-insights',
        name: 'Market Insights',
        type: 'dashboard',
        description: 'LPG market analysis and freight rates',
        embedUrl: 'https://app.powerbi.com/view?r=example-market'
      }
    ]
  },
  {
    id: 'hr',
    name: 'HR',
    icon: 'Users',
    description: 'Human resources, workforce analytics',
    items: [
      {
        id: 'harvey-chatbot',
        name: 'Harvey HR Chatbot',
        type: 'app',
        description: 'AI-powered HR assistant',
        pages: ['Chat', 'Knowledge Base']
      }
    ]
  },
  {
    id: 'esg',
    name: 'ESG',
    icon: 'Leaf',
    description: 'Environmental, Social, Governance metrics',
    items: [
      {
        id: 'hseq-dashboard',
        name: 'Health and Safety (HSEQ) Dashboard',
        type: 'dashboard',
        description: 'HSEQ performance tracking and reporting',
        embedUrl: 'https://app.powerbi.com/view?r=example-hseq'
      }
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial',
    icon: 'Briefcase',
    description: 'Commercial operations and contract management',
    items: []
  }
];
