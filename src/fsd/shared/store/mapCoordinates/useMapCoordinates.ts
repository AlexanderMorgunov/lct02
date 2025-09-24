import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IMapCoordinates {
  coordinates: { lat: number; long: number };
  setCoordinates: ({ lat, long }: { lat: number; long: number }) => void;
}

export const useMapCoordinates = create<IMapCoordinates>()(
  immer((setState) => ({
    coordinates: { lat: 55.75, long: 37.57 },
    setCoordinates: ({ lat, long }) => setState({ coordinates: { lat, long } }),
  }))
);
