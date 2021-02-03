import { createMedia } from '@artsy/fresnel';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Media Instance
 */
const AppMedia = createMedia({
  breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 },
  interactions: {
    portrait: '(orientation: portrait)',
    landscape: '(orientation: landscape)'
  }
});

export const mediaStyles = AppMedia.createMediaStyle();
export const { Media: RenderMedia, MediaContextProvider } = AppMedia;
