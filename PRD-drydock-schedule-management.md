## Drydock Schedule Management App

**User Story:** As a Fleet Manager, I need to coordinate dynamically changing dates for key milestones across the technical, chartering and operations departments

Benefits:
Automate the creation of draft dry-dock events based on Special Survey due dates.
Coordinate timeline dependencies across multiple teams.
Ensure all dry-dock events are tracked with budget, actual costs, and estimates.

Key Functionality (How)
Provide a structured and user-friendly interface for capturing inspection findings.

•	Ensure seamless authentication via Microsoft SSO.

•	Enable users to reference vessel data from the lakehouse.

•	Store predefined findings under different chapters for each inspection type.

•	Maintain a clear separation between transactional data (inspections) and master data
  (vessels, inspectors, finding templates).


## Components
- Critical
  - Power BI Dashboard: Overview of upcoming and completed dry-docks.
  - Dry-Dock Planner: Interactive timeline view with dependencies.

-Future enhancements:
  - Dry-Dock Cost Manager: Track budget, estimates, and actual costs.
  - Shipyard & Yard Availability View: Manage yard bookings and availability.

## Current status of Data model

```
CREATE TABLE "mdm"."vessel_master" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "imo_num" varchar(10) NOT NULL,
    "vessel_name" varchar(255) NOT NULL,
    "vessel_type" varchar(10),
    "vessel_classification_society" varchar(10),
    "carrier_type" varchar(10),
    "flag_country" varchar(50),
    "port_registered" varchar(50),
    "date_built" date,
    "service_status" varchar(50),
    "is_active" boolean DEFAULT true,
    "created_at" timestamp DEFAULT current_timestamp NOT NULL,
    "updated_at" timestamp DEFAULT current_timestamp NOT NULL,
    "created_by" varchar(100) NOT NULL,
    "updated_by" varchar(100) NOT NULL
);

CREATE TABLE mdm.lookup_code (
    list_name varchar(100) NOT NULL,
    code varchar(50) NOT NULL,
    display_name varchar(255) NOT NULL,
    description text,
    display_order int,
    is_active boolean DEFAULT true,
    PRIMARY KEY (list_name, code)
);

INSERT INTO mdm.lookup_code (list_name, code, display_name, description, display_order, is_active) VALUES
('service_status', 'IN_SERVICE', 'In Service', 'Vessel currently in operation', 1, true),
('service_status', 'NOT_IN_SERVICE', 'Not in Service', 'Vessel temporarily inactive', 2, true),
('service_status', 'RELET', 'Relet', 'Vessel has been re-chartered to another party', 3, true),
('service_status', 'SCRAPPED', 'Scrapped', 'Vessel dismantled and no longer in service', 4, true),
('service_status', 'SOLD', 'Sold', 'Vessel ownership transferred to another entity', 5, true),
('service_status', 'TCIN_REDELIVERED', 'TC-In / BB-In Redelivered', 'Time chartered or bareboat chartered vessel returned', 6, true),
('service_status', 'TCOUT_RETURNED', 'TC-Out / BB-Out Returned', 'Time chartered or bareboat chartered vessel returned to owner', 7, true),
('vessel_type', 'LPG', 'LPG', 'Liquefied Petroleum Gas', 1, true),
('vessel_type', 'LNG', 'LNG', 'Liquefied Natural Gas', 2, true),
('carrier_type', 'VLGC', 'Very Large Gas Carrier', '70,000 cbm or above', 1, true),
('carrier_type', 'LGC', 'Large Gas Carrier', '50,000–70,000 cbm', 2, true),
('carrier_type', 'MGC', 'Medium Gas Carrier', '25,000–50,000 cbm', 3, true),
('vessel_classification', 'ABS', 'American Bureau of Shipping', 'Classification society based in the United States', 1, true),
('vessel_classification', 'BV', 'Bureau Veritas', 'Classification society based in France', 2, true),
('vessel_classification', 'DNV', 'Det Norske Veritas', 'Classification society based in Norway', 3, true),
('vessel_classification', 'IRS', 'Indian Register of Shipping', 'Classification society based in India', 4, true),
('vessel_classification', 'KRS', 'Korean Register of Shipping', 'Classification society based in South Korea', 5, true),
('vessel_classification', 'LR', 'Lloyd’s Register', 'Classification society based in the United Kingdom', 6, true),
('vessel_classification', 'NKK', 'Nippon Kaiji Kyokai (ClassNK)', 'Classification society based in Japan', 7, true);

CREATE TABLE app_drydock_mgmt.drydock_event (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "vessel_id" uuid NOT NULL REFERENCES mdm.vessel_master(id),
    "drydock_num" INT NOT NULL,                       -- The nth drydock visit for this vessel
    "shipyard_id" uuid NOT NULL REFERENCES app_drydock_mgmt.shipyard(id), -- Foreign key to shipyard table
    "offhire_days" BIGINT,                            -- Number of days vessel was offhire
    "person_in_charge" VARCHAR(100),                  -- Tech manager or responsible person
    "date_due" DATE,                                  -- Planned/expected due date for drydock
    "date_earliest" DATE,                             -- Earliest possible date
    "date_tentative" DATE,                            -- Tentative date suggested
    "date_agreed" DATE,                               -- Date finally agreed with shipyard
    "tech_manager_approved_days" BIGINT,              -- Days approved by technical manager
    "comments" TEXT,                                  -- Any notes or remarks
    "created_at" timestamp DEFAULT current_timestamp NOT NULL,
    "updated_at" timestamp DEFAULT current_timestamp NOT NULL,
    "created_by" varchar(100) NOT NULL,
    "updated_by" varchar(100) NOT NULL
);

CREATE TABLE app_drydock_mgmt.shipyard (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" varchar NOT NULL,
    "is_active" boolean DEFAULT true
);

```
