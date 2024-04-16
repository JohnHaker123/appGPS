import React from 'react';
import Navigation from './Navigation';
import useOrientation from './hooks/useOrientation';


export default function App() {
  const orientacion = useOrientation();
  return (
      <Navigation />
  );
}