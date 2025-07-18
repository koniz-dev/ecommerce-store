import NextImage from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image } from '@/types';

interface GalleryTabProps {
  image: Image;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative w-20 h-20 cursor-pointer rounded-md bg-white">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <NextImage
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent',
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
