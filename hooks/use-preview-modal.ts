import { create } from 'zustand';
import { ProductInfo } from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  data?: ProductInfo;
  onOpen: (data: ProductInfo) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: ProductInfo) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));

export default usePreviewModal;
