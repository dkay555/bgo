import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * when navigating to a new route using wouter's Link components.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}