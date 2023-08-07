declare module '@fortawesome/fontawesome-free' {
    // Add type definitions for any specific functionality you use
    // For example, if you only use the `FontAwesomeIcon` component, you can declare it like this:
    import { ComponentType } from 'react';
    const FontAwesomeIcon: ComponentType<any>;
    export {FontAwesomeIcon};
  
    // If you use other components, add their type definitions here as well.
  }
  