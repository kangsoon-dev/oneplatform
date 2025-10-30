import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { SchedulesDashboard } from './SchedulesDashboard';
import { CostsDashboard } from './CostsDashboard';
import { DrydockList } from './DrydockList';
import { DrydockForm } from './DrydockForm';

export const DrydockScheduleManagement = () => {
  const [activeTab, setActiveTab] = useState('schedules');
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create' as 'create' | 'edit');
  const [formId, setFormId] = useState(undefined as string | undefined);

  const handleCreate = () => {
    setFormMode('create');
    setFormId(undefined);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setFormMode('edit');
    setFormId(id);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setFormId(undefined);
  };

  const handleClose = () => {
    setShowForm(false);
    setFormId(undefined);
  };

  return (
    <>
      <div className="h-full flex flex-col bg-slate-50">
        {/* Compact Header with Tabs */}
        <div className="border-b border-slate-200 bg-white px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center gap-6 py-3">
              <h2 className="text-lg font-semibold text-slate-900">Drydock Schedule Management</h2>
              <TabsList className="bg-slate-100 border border-slate-200">
                <TabsTrigger
                  value="schedules"
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-600"
                >
                  Schedules
                </TabsTrigger>
                <TabsTrigger
                  value="costs"
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-600"
                >
                  Costs
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-slate-600"
                >
                  Drydock Events
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {/* Schedules Dashboard - always mounted but hidden when not active */}
          <div className={activeTab === 'schedules' ? 'flex-1 min-h-0' : 'hidden'}>
            <SchedulesDashboard />
          </div>

          {/* Costs Dashboard - always mounted but hidden when not active */}
          <div className={activeTab === 'costs' ? 'flex-1 min-h-0' : 'hidden'}>
            <CostsDashboard />
          </div>

          {/* Events Tab - always mounted but hidden when not active */}
          <div className={activeTab === 'events' ? 'flex-1 min-h-0 p-6' : 'hidden'}>
            <Card className="border-slate-200 h-full flex flex-col">
              <CardHeader className="bg-[#ddd6f3] border-b border-slate-200">
                <CardTitle className="text-lg text-slate-900">Drydock Events</CardTitle>
                <CardDescription className="text-sm text-slate-600">
                  Manage and track all drydock events
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto bg-white">
                <DrydockList onEdit={handleEdit} onCreate={handleCreate} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Create/Edit Form */}
      <Dialog open={showForm} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {formMode === 'create' ? 'Create New Drydock Event' : 'Edit Drydock Event'}
            </DialogTitle>
            <DialogDescription>
              {formMode === 'create'
                ? 'Add a new drydock event to the schedule'
                : 'Update drydock event details'}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <DrydockForm mode={formMode} id={formId} onSubmitSuccess={handleFormSuccess} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleFormSuccess}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
