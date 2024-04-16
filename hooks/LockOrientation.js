import * as ScreenOrientation from 'expo-screen-orientation';

export async function Movil() {
    const isPortrait = await ScreenOrientation.getOrientationAsync() === ScreenOrientation.Orientation.PORTRAIT_UP;
    if (isPortrait) {
        // alert('La aplicación solo es compatible con la orientación vertical.');
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
}
