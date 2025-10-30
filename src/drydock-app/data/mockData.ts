import { DrydockEvent, Shipyard, Vessel } from '../types';

export const mockShipyards: Shipyard[] = [
  { id: '1', name: 'Hyundai Heavy Industries', is_active: true },
  { id: '2', name: 'Samsung Heavy Industries', is_active: true },
  { id: '3', name: 'Sembcorp Marine', is_active: true },
  { id: '4', name: 'Keppel Offshore & Marine', is_active: true },
  { id: '5', name: 'China Shipbuilding Industry', is_active: true },
];

export const mockVessels: Vessel[] = [
  {
    id: '1',
    imo_num: 'IMO1234567',
    vessel_name: 'MV Bright Star',
    vessel_type: 'LNG',
    service_status: 'IN_SERVICE',
    is_active: true
  },
  {
    id: '2',
    imo_num: 'IMO2345678',
    vessel_name: 'MV Ocean Wave',
    vessel_type: 'LPG',
    service_status: 'IN_SERVICE',
    is_active: true
  },
  {
    id: '3',
    imo_num: 'IMO3456789',
    vessel_name: 'MV Horizon',
    vessel_type: 'LNG',
    service_status: 'IN_SERVICE',
    is_active: true
  },
  {
    id: '4',
    imo_num: 'IMO4567890',
    vessel_name: 'MV Pacific Pearl',
    vessel_type: 'LPG',
    service_status: 'IN_SERVICE',
    is_active: true
  },
];

export const mockDrydockEvents: DrydockEvent[] = [
  {
    id: '1',
    vessel_id: '1',
    vessel_name: 'MV Bright Star',
    drydock_num: 3,
    shipyard_id: '1',
    shipyard_name: 'Hyundai Heavy Industries',
    offhire_days: 45,
    person_in_charge: 'John Smith',
    date_due: '2025-03-15',
    date_earliest: '2025-02-01',
    date_tentative: '2025-03-01',
    date_agreed: '2025-03-10',
    tech_manager_approved_days: 45,
    comments: 'Routine maintenance and inspection scheduled',
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-10-15T14:30:00Z',
    created_by: 'system',
    updated_by: 'John Smith',
  },
  {
    id: '2',
    vessel_id: '2',
    vessel_name: 'MV Ocean Wave',
    drydock_num: 2,
    shipyard_id: '2',
    shipyard_name: 'Samsung Heavy Industries',
    offhire_days: 38,
    person_in_charge: 'Sarah Johnson',
    date_due: '2025-05-20',
    date_earliest: '2025-04-15',
    date_tentative: '2025-05-10',
    date_agreed: null,
    tech_manager_approved_days: 35,
    comments: 'Waiting for confirmation from operations team',
    created_at: '2024-10-05T09:00:00Z',
    updated_at: '2024-10-12T11:20:00Z',
    created_by: 'system',
    updated_by: 'Sarah Johnson',
  },
  {
    id: '3',
    vessel_id: '3',
    vessel_name: 'MV Horizon',
    drydock_num: 1,
    shipyard_id: '3',
    shipyard_name: 'Sembcorp Marine',
    offhire_days: null,
    person_in_charge: 'Michael Chen',
    date_due: '2025-07-10',
    date_earliest: '2025-06-01',
    date_tentative: null,
    date_agreed: null,
    tech_manager_approved_days: null,
    comments: 'Early planning stage',
    created_at: '2024-10-10T08:00:00Z',
    updated_at: '2024-10-10T08:00:00Z',
    created_by: 'system',
    updated_by: 'system',
  },
];
