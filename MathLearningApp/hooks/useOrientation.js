// hooks/useOrientation.js
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

const useOrientation = () => {
  const [orientation, setOrientation] = useState(ScreenOrientation.Orientation.PORTRAIT_UP);

  useEffect(() => {
    const handleOrientationChange = (evt) => {
      setOrientation(evt.orientationInfo.orientation);
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return orientation;
};

export default useOrientation;
