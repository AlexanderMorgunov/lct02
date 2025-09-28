import { IDistrict } from "@/fsd/entities/District/types/type";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IActiveDistrict {
  activeDistrict: IDistrict | null;
  setActiveDistrict: (district: IDistrict | null) => void;
}

export const useActiveDistrict = create<IActiveDistrict>()(
  immer((setState) => ({
    activeDistrict: null,
    setActiveDistrict: (district) => setState({ activeDistrict: district }),
  }))
);
