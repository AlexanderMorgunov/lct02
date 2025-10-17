"use client";
import { useGetLocations } from "@/fsd/entities/locations/api/useGetLocations";
import { DispatcherAccidentsTable } from "@/fsd/widgets/DispatcherPage";
import { Select } from "antd";
import { useState, useEffect } from "react";

export const DispatcherAllAccidentsPage = () => {
  const { data: locations, isLoading } = useGetLocations();
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (locations && locations.length > 0 && !selectedLocationId) {
      setSelectedLocationId(String(locations[0].id));
    }
  }, [locations, selectedLocationId]);

  const locationOptions =
    locations?.map((location) => ({
      label: location.title,
      value: String(location.id),
    })) || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="font-medium">Локация:</label>
        <Select
          showSearch
          value={selectedLocationId}
          onChange={(value) => setSelectedLocationId(value)}
          options={locationOptions}
          placeholder="Выберите локацию"
          loading={isLoading}
          style={{ width: 300 }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
      {selectedLocationId && (
        <DispatcherAccidentsTable location_id={selectedLocationId} />
      )}
    </div>
  );
};
