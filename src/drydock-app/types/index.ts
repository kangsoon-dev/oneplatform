export interface DrydockEvent {
  id: string;
  vessel_id: string;
  vessel_name: string;
  drydock_num: number;
  shipyard_id: string;
  shipyard_name: string;
  offhire_days: number | null;
  person_in_charge: string | null;
  date_due: string | null;
  date_earliest: string | null;
  date_tentative: string | null;
  date_agreed: string | null;
  tech_manager_approved_days: number | null;
  comments: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface Shipyard {
  id: string;
  name: string;
  is_active: boolean;
}

export interface Vessel {
  id: string;
  imo_num: string;
  vessel_name: string;
  vessel_type: string;
  service_status: string;
  is_active: boolean;
}
