import * as azmaps from 'azure-maps-control';

/**
* A class for generating screenshots of the map.
*/
export class MapImageExporter {

    /**********************
    * Private Properties
    ***********************/

    private static _logoHeight = 25;

    /**********************
    * Public Functions
    ***********************/

    /**
    * Generates a Image object for an image of the map.
    * @param map Map instance to get image for.
    */
    public static async getImage(map: azmaps.Map): Promise<HTMLImageElement> {
        const dataUri = await this.getDataUri(map);
        return this._getImage(dataUri);
    }

    /**
     * Generates a data URI for an image of the map.
     * @param map Map instance to get data URI for.
     * @param mimeType The `mimeType` of the image to generate. Defult: `'image/png'`
     */
    public static async getDataUri(map: azmaps.Map, mimeType?: 'image/png' | 'image/jpeg'): Promise<string> {
        const mapCanvas = await this._getMapCanvas(map);
        return mapCanvas.toDataURL(mimeType);
    }

    /**
     * Generates a Blob for an image of the map.
     * @param map Map instance to get blob for.
     */
    public static async getBlob(map: azmaps.Map): Promise<Blob> {
        const dataUri = await this.getDataUri(map);
        return this._dataUriToBlob(dataUri);
    }

    /**********************
    * Private Functions
    ***********************/

    /**
     * Retrieves an image from a URL. Can be a URL to a hosted image, data URI, or SVG string.
     * @param url Url of image to retrieve.
     */
    private static _getImage(url: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject('Error creating image.');
            };

            if(url.indexOf('<svg') > -1){
                url = 'data:image/svg+xml;base64,' + window.btoa(url.substr(url.indexOf('<svg')));
            }

            img.src = url;
        });
    }

    /**
    * Gets copy of the map canvas with a logo and copyrights added to it.
    */
    private static async _getMapCanvas(map: azmaps.Map): Promise<HTMLCanvasElement> {
        const mapCanvas = map.getCanvas();
        const mapContainer = map.getMapContainer();

        const mapWidth = mapCanvas.width;
        const mapHeight = mapCanvas.height;

        //Create a copy of the map canvas.
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = mapWidth;
        offscreenCanvas.height = mapHeight;

        const ctx = offscreenCanvas.getContext('2d');
        ctx.drawImage(mapCanvas, 0, 0);

        //Get the copyright information from the map and add it to the map canvas image.
        const copyrightContainer = mapContainer.getElementsByClassName('map-copyright');
        if (copyrightContainer && copyrightContainer.length > 0) {
            try{
                const copyrightsStyle = window.getComputedStyle(copyrightContainer[0].firstElementChild);
                const copyrights = (<HTMLDivElement>copyrightContainer[0]).innerText;

                //ctx.font = "9px 'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
                ctx.font = copyrightsStyle.font;
                ctx.fillStyle = copyrightsStyle.color;

                const copyrightWidth = ctx.measureText(copyrights).width;
                ctx.fillText(copyrights, mapWidth - copyrightWidth - 5, mapHeight - 3);
            }catch{}
        }

        const logoContainer = mapContainer.getElementsByClassName('azure-map-logo');
        if (logoContainer && logoContainer.length > 0) {
            const logoDivStyle = window.getComputedStyle(logoContainer[0]);
            const bg = (logoDivStyle)? logoDivStyle.backgroundImage: null;

            if (bg && bg.indexOf('data:image') >= 0) {                
                //Add logo to canvas.
                try{
                    let logoUri = bg.slice(5, (bg.length - 2));

                    //Sanitize the URI.
                    logoUri = decodeURIComponent(logoUri.replace(/(\\')/g, "'"));

                    const logoHeight = this._logoHeight;
                    const logoImg = await this._getImage(logoUri);
                    const w = logoHeight * (logoImg.width / logoImg.height);
                    ctx.drawImage(logoImg, mapWidth - w - 5, mapHeight - logoHeight - 15, w, logoHeight);
                    return offscreenCanvas;
                }catch{}
            }
        }

        //If we get here there as an issue loading the logo. Reolve the promise.
        return offscreenCanvas;
    }

    /**
     * Converts a dataUri to Blob.
     * @param dataUri The dataUri to convert.
     * @returns A blob containing the data from the dataUri.
     */
    private static _dataUriToBlob(dataUri): Blob {
        //Convert base64 to raw binary data held in a string.
        const byteString = atob(dataUri.split(',')[1]);

        //Extract the mime type.
        const mimeType = dataUri.split(',')[0].split(':')[1].split(';')[0];

        //Write the bytes of the string to an ArrayBuffer.
        const ab = new ArrayBuffer(byteString.length);
        const dw = new DataView(ab);
        for (let i = 0; i < byteString.length; i++) {
            dw.setUint8(i, byteString.charCodeAt(i));
        }

        //Convert the ArrayBuffer to a blob.
        return new Blob([ab], { type: mimeType });
    }
}