'use client';

import NextImage from 'next/image';
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';

import { Image } from '@/types';

import GalleryTab from './gallery-tab';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <ScrollArea className="mx-auto mt-2 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-flow-col auto-cols-min gap-4 py-4 first:pl-2">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabPanels className="aspect-square w-full">
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <NextImage
                fill
                src={image.url}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Gallery;
