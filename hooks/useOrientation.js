import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { ORIENTATION_NUMBERS } from './orientationNumbre';


const useOrientation = () => {
  const [orientation, setOrientation] = useState(null);
  const [valor, setValor] = useState(null);
 
  useEffect(() => {
    const getOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(currentOrientation);
    };

    getOrientation();

    // Suscripción a cambios de orientación
    const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
      setOrientation(event.orientationInfo.orientation);
    });

    // Limpieza de la suscripción cuando el componente se desmonta
    return () => {
      subscription.remove();
    };
  }, []);

  return ORIENTATION_NUMBERS[orientation]; 
};

export default useOrientation;