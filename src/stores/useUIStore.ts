import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

interface UIState {
  isSidebarOpen: boolean;
  activeModal: ModalState;
  isLoading: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  activeModal: { isOpen: false, content: null },
  isLoading: false,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  closeSidebar: () => set({ isSidebarOpen: false }),

  openModal: (content) =>
    set({ activeModal: { isOpen: true, content } }),

  closeModal: () =>
    set({ activeModal: { isOpen: false, content: null } }),

  setLoading: (loading) => set({ isLoading: loading }),
}));
