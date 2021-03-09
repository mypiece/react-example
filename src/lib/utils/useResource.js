import { useEffect } from 'react';

const useResource = (resourceType, resourceUrl) => {
  useEffect(() => {
    let element;
    switch(resourceType){
      case 'script':
        element = document.createElement('script');
        element.src = resourceUrl;
        // element.async=false;
        break;
      case 'css':
        element = document.createElement('link');
        element.rel = 'stylesheet';
        element.href = resourceUrl;
        break;
      default:
    }

    document.body.appendChild(element);

    return () => {
      document.body.removeChild(element);
    }
  }, [resourceType, resourceUrl]);
}

export default useResource;