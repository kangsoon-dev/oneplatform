import React from 'react';
import { mockDrydockEvents } from '../data/mockData';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface DrydockListProps {
  onEdit?: (id: string) => void;
  onCreate?: () => void;
}

export const DrydockList = ({ onEdit, onCreate }: DrydockListProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Drydock Events</h3>
        <Button onClick={onCreate} className="bg-blue-600 hover:bg-blue-700">
          Create Drydock Event
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Vessel</TableHead>
              <TableHead className="w-[100px]">Drydock #</TableHead>
              <TableHead>Shipyard</TableHead>
              <TableHead>Person in Charge</TableHead>
              <TableHead className="w-[120px]">Date Due</TableHead>
              <TableHead className="w-[120px]">Date Agreed</TableHead>
              <TableHead className="w-[120px]">Offhire Days</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDrydockEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.id}</TableCell>
                <TableCell>{event.vessel_name}</TableCell>
                <TableCell>{event.drydock_num}</TableCell>
                <TableCell>{event.shipyard_name}</TableCell>
                <TableCell>{event.person_in_charge || '-'}</TableCell>
                <TableCell>{formatDate(event.date_due)}</TableCell>
                <TableCell>{formatDate(event.date_agreed)}</TableCell>
                <TableCell>{event.offhire_days ? `${event.offhire_days} days` : '-'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit?.(event.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
