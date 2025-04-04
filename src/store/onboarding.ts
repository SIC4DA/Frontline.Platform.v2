import { create } from 'zustand';

interface OnboardingState {
  fullName: string;
  username: string;
  companyName: string;
  password: string;
  profileImage: string | null;
  setOnboardingState: (state: Partial<OnboardingState>) => void;
  resetStore: () => void;
}

const initialState = {
  fullName: '',
  username: '',
  companyName: '',
  password: '',
  profileImage: null,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  
  setOnboardingState: (state: Partial<OnboardingState>) => set(state),
  resetStore: () => set(initialState),
}));
