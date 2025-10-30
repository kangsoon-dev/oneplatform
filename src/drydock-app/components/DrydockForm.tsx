import React, { useState } from 'react';
import { mockShipyards, mockVessels } from '../data/mockData';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface DrydockFormProps {
  mode: 'create' | 'edit';
  id?: string;
  onSubmitSuccess?: () => void;
}

export const DrydockForm = ({
  mode,
  id,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState({
    vessel_id: '',
    drydock_num: '',
    shipyard_id: '',
    person_in_charge: '',
    offhire_days: '',
    date_due: '',
    date_earliest: '',
    date_tentative: '',
    date_agreed: '',
    tech_manager_approved_days: '',
    comments: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Vessel Selection */}
      <div className="space-y-2">
        <Label htmlFor="vessel_id">Vessel *</Label>
        <Select value={formData.vessel_id} onValueChange={(value) => handleChange('vessel_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a vessel" />
          </SelectTrigger>
          <SelectContent>
            {mockVessels.map((vessel) => (
              <SelectItem key={vessel.id} value={vessel.id}>
                {vessel.vessel_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Drydock Number */}
      <div className="space-y-2">
        <Label htmlFor="drydock_num">Drydock Number *</Label>
        <Input
          id="drydock_num"
          type="number"
          value={formData.drydock_num}
          onChange={(e) => handleChange('drydock_num', e.target.value)}
          placeholder="Enter drydock number"
        />
      </div>

      {/* Shipyard Selection */}
      <div className="space-y-2">
        <Label htmlFor="shipyard_id">Shipyard *</Label>
        <Select value={formData.shipyard_id} onValueChange={(value) => handleChange('shipyard_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a shipyard" />
          </SelectTrigger>
          <SelectContent>
            {mockShipyards.map((shipyard) => (
              <SelectItem key={shipyard.id} value={shipyard.id}>
                {shipyard.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Person in Charge */}
      <div className="space-y-2">
        <Label htmlFor="person_in_charge">Person in Charge</Label>
        <Input
          id="person_in_charge"
          type="text"
          value={formData.person_in_charge}
          onChange={(e) => handleChange('person_in_charge', e.target.value)}
          placeholder="Enter name"
        />
      </div>

      {/* Date Due */}
      <div className="space-y-2">
        <Label htmlFor="date_due">Date Due</Label>
        <Input
          id="date_due"
          type="date"
          value={formData.date_due}
          onChange={(e) => handleChange('date_due', e.target.value)}
        />
      </div>

      {/* Date Earliest */}
      <div className="space-y-2">
        <Label htmlFor="date_earliest">Date Earliest</Label>
        <Input
          id="date_earliest"
          type="date"
          value={formData.date_earliest}
          onChange={(e) => handleChange('date_earliest', e.target.value)}
        />
      </div>

      {/* Date Tentative */}
      <div className="space-y-2">
        <Label htmlFor="date_tentative">Date Tentative</Label>
        <Input
          id="date_tentative"
          type="date"
          value={formData.date_tentative}
          onChange={(e) => handleChange('date_tentative', e.target.value)}
        />
      </div>

      {/* Date Agreed */}
      <div className="space-y-2">
        <Label htmlFor="date_agreed">Date Agreed</Label>
        <Input
          id="date_agreed"
          type="date"
          value={formData.date_agreed}
          onChange={(e) => handleChange('date_agreed', e.target.value)}
        />
      </div>

      {/* Offhire Days */}
      <div className="space-y-2">
        <Label htmlFor="offhire_days">Offhire Days</Label>
        <Input
          id="offhire_days"
          type="number"
          value={formData.offhire_days}
          onChange={(e) => handleChange('offhire_days', e.target.value)}
          placeholder="Enter number of days"
        />
      </div>

      {/* Tech Manager Approved Days */}
      <div className="space-y-2">
        <Label htmlFor="tech_manager_approved_days">Tech Manager Approved Days</Label>
        <Input
          id="tech_manager_approved_days"
          type="number"
          value={formData.tech_manager_approved_days}
          onChange={(e) => handleChange('tech_manager_approved_days', e.target.value)}
          placeholder="Enter number of days"
        />
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <Label htmlFor="comments">Comments</Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => handleChange('comments', e.target.value)}
          placeholder="Enter any additional comments"
          rows={4}
        />
      </div>
    </div>
  );
};
