import React from 'react';
import './svg-styling.css';

const ASLogo = (props) => (
  <svg class="ASLogo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 587.82 314.27"><g data-name="Layer-1"><g data-name="Body Shadow" opacity=".85"><image width="223" height="286" transform="translate(216.64 28.44)"/><image width="66" height="76" transform="translate(285.64 84.44)" xlinkHref="data:image/png;base64,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"/><image width="124" height="108" transform="translate(258.64 182.44)" xlinkHref="data:image/png;base64,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"/></g><path data-name="S-Letter" d="M587.71 219.75c-5.97 100.79-143.68 112.21-203.07 51.88 11-12.11 18.15-20.45 27.53-30.82 44.23 41.76 141.67 42.41 134.47-25.37-6.57-62-144.59-47.33-148.11-132.36-3.5-96.46 120-99.92 176.66-56.21l-17.35 30.39C527.77 32.18 439.02 21.98 440.77 78.8c6.68 64.22 151.5 41.05 146.94 140.95z"/><path data-name="A-Letter" d="M258.17 273.54l-25.53-67.26L157.4 8.16h-35.3L8.25 304.65h44.11c1.77-4.87 24.85-69.23 25.81-71.59h119.08c.63 2.1 24.44 67 26.11 71.59h46.63zM91.64 196.63l46-126.63h.43l46 126.63z"/><path data-name = "Ampersand" d="M402.49 193.24a110.74 110.74 0 01-8.4 34.65l-60-57.4c44.84-16.7 61.61-76.54 23.18-98.13-9.28-5.23-21.78-8.21-37.87-7.81-25.09 2.5-42.9 9.62-53.47 29.19s-4.59 46.21 24.63 72.7c-21.67 7.93-37.43 18.77-47.45 36.08-28 53.55 3.76 95.54 47.29 104.88a125 125 0 0026.72 2c20.48-1.26 37.52-6.51 51.71-14.42 20.81-11.54 35.51-28.85 46.16-47.68a197.72 197.72 0 0015.74-36.4c.27-.72.5-1.46.73-2.15 3.29-10.31 5.74-20.31 7.74-29.31zm-85.46-39.64c-26.55-19.89-39.1-63.36 3.44-66.69 46.35.53 30.22 57.87-3.44 66.69zm3.08 130.14c-69.26.1-75.75-73.44-11.28-99.14l69.26 67.29c-11.14 19.7-33.83 30.39-57.98 31.85z" fill="#62a7e4"/><path fill="none" d="M0 0h587.82v312.36H0z"/><path data-name="Hat-Band" d="M354.47 70.96c-8.47 0-13.85 1.65-19.44 3-17.5 4.27-23.68 10.6-42.92 11.52-5.22.25-11.79.1-17.8-3.31-1.67-10.23-4.52-27.72-4.94-30.55l81.37-7.31c.69 4.95 2.47 17.76 3.73 26.65z"/><path data-name="Hat-Top" fill="#62a7e4" d="M332.22 62.87l59.45-34.63-101.1 3.44-68 36.16 109.65-4.97z"/></g></svg>
  );

export default ASLogo;