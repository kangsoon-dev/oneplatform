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

## Data model

```
Table "app_drydock_mgmt"."drydock_events" {
  "id" serial [pk, increment]
  "drydock_uid" varchar
  "shipyard_id" int
  "offhire_type" varchar
  "offhire_days" bigint
  "pic" varchar
  "date_due" date
  "date_earliest" date
  "date_tentative" date
  "date_agreed" date
  "tech_manager_approved_days" bigint
  "comments" varchar
  "imo_num" bigint
  "created_at" timestamp
  "updated_at" timestamp
  "created_by" varchar
  "updated_by" varchar
}


```
