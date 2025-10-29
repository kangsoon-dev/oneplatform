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
        embedUrl: 'https://app.powerbi.com/view?r=example-vessel-master',
        status: 'live',
        lastUpdated: '15 Oct 2024 14:30',
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=225&fit=crop&crop=center'
      },
      {
        id: 'voyage-master',
        name: 'Voyage Master',
        type: 'dashboard',
        description: 'Voyage tracking and master data',
        embedUrl: 'https://app.powerbi.com/view?r=example-voyage-master',
        status: 'live',
        lastUpdated: '12 Oct 2024 09:15',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=225&fit=crop&crop=center'
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
        embedUrl: 'https://app.powerbi.com/view?r=example-running-cost',
        status: 'live',
        lastUpdated: '22 Sep 2024 09:15',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center'
      },
      {
        id: 'ga-analysis',
        name: 'G&A Analysis',
        type: 'dashboard',
        description: 'General and administrative cost tracking',
        embedUrl: 'https://app.powerbi.com/view?r=example-ga',
        status: 'live',
        lastUpdated: '08 Oct 2024 16:47',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop&crop=center'
      },
      {
        id: 'flux-analysis',
        name: 'Flux Analysis',
        type: 'dashboard',
        description: 'Financial flux and variance analysis',
        embedUrl: 'https://app.powerbi.com/view?r=example-flux',
        status: 'beta',
        lastUpdated: '12 Oct 2024 11:03',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center'
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
        pages: ['Overview', 'Active Voyages', 'Planning', 'Reports'],
        status: 'live',
        lastUpdated: '18 Oct 2024 11:45',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop&crop=center'
      },
      {
        id: 'chartering-scheduler',
        name: 'Chartering Scheduler',
        type: 'app',
        description: 'Schedule and optimize charter operations',
        pages: ['Calendar', 'Contracts', 'Availability'],
        status: 'beta',
        lastUpdated: '16 Oct 2024 16:20',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center'
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
        embedUrl: 'https://app.powerbi.com/view?r=example-speed-fuel',
        status: 'live',
        lastUpdated: '14 Oct 2024 13:10',
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=225&fit=crop&crop=center'
      }
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial',
    icon: 'Briefcase',
    description: 'Commercial operations and contract management',
    items: [
      {
        id: 'market-insights',
        name: 'Market Insights',
        type: 'dashboard',
        description: 'LPG market analysis and freight rates',
        embedUrl: 'https://app.powerbi.com/view?r=example-market',
        status: 'live',
        lastUpdated: '17 Oct 2024 08:30',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center'
      },
      {
        id: 'revenue-analytics',
        name: 'Revenue Analytics',
        type: 'dashboard',
        description: 'Commercial revenue tracking and analysis',
        embedUrl: 'https://app.powerbi.com/view?r=example-revenue',
        status: 'live',
        lastUpdated: '16 Oct 2024 14:25',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop&crop=center'
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
        embedUrl: 'https://app.powerbi.com/view?r=example-hseq',
        status: 'live',
        lastUpdated: '13 Oct 2024 10:20',
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=225&fit=crop&crop=center'
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
        type: 'chatbot',
        description: 'AI-powered HR assistant',
        pages: ['Chat', 'Knowledge Base'],
        status: 'beta',
        lastUpdated: '19 Oct 2024 15:45',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop&crop=center'
      }
    ]
  }
];
