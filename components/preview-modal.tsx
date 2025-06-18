'use client';

import { useEffect, useState } from 'react';

import { ProductVariant } from '@/types';
import usePreviewModal from '@/hooks/use-preview-modal';

import Gallery from '@/components/gallery';
import Info from '@/components/info';
import Modal from '@/components/ui/modal';

const PreviewModal = () => {
  const isOpen = usePreviewModal((s) => s.isOpen);
  const data = usePreviewModal((s) => s.data);
  const onClose = usePreviewModal((s) => s.onClose);

  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(
    null,
  );

  useEffect(() => {
    if (data) {
      const v = data.variants.find((v) => v.id === data.selectedVariantId);
      setCurrentVariant(v ?? null);
    }
  }, [data]);

  if (!data || !currentVariant) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery key={currentVariant.id} images={currentVariant.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info
            data={data}
            currentVariant={currentVariant}
            onVariantChange={setCurrentVariant}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
