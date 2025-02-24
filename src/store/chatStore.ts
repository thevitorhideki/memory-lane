import { create } from 'zustand';

interface CoupleStore {
  chatData: string;
  nicknames: string[];
  startDate: Date;
  setChatData: (data: string) => void;
  setNicknames: (data: string[]) => void;
  setStartDate: (data: Date | undefined) => void;
}

export const useCoupleStore = create<CoupleStore>((set) => ({
  chatData: '',
  nicknames: [''],
  startDate: new Date(),
  setChatData: (data: string) => set({ chatData: data }),
  setNicknames: (data: string[]) => set({ nicknames: data }),
  setStartDate: (data: Date | undefined) => set({ startDate: data }),
}));
