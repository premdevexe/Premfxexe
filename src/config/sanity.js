import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';

export const sanityClient = createClient({
    projectId: projectId || 'unconfigured',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2024-03-01',
});

const builder = createImageUrlBuilder(sanityClient);

// Helper function to generate Sanity image URLs
export const urlFor = (source) => builder.image(source);

// Helper function to proxy Sanity CDN if needed
export const getProxyUrl = (imageBuilder) => {
    if (!imageBuilder) return null;
    const url = imageBuilder.url();
    if (url && typeof window !== 'undefined') {
        return url.replace('https://cdn.sanity.io', '/sanity-cdn');
    }
    return url;
};
