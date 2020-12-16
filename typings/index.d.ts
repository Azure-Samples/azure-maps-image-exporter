import * as azmaps from 'azure-maps-control';

declare namespace atlas {

    /**
    * A class for generating screenshots of the map.
    */
    export class MapImageExporter {

        /**
        * Generates a Image object for an image of the map.
        * @param map Map instance to get image for.
        */
        public static getImage(map: azmaps.Map): Promise<HTMLImageElement>;

        /**
         * Generates a data URI for an image of the map.
         * @param map Map instance to get data URI for.
         * @param mimeType The `mimeType` of the image to generate. Defult: `'image/png'`
         */
        public static getDataUri(map: azmaps.Map, mimeType?: 'image/png' | 'image/jpeg'): Promise<string>;

        /**
         * Generates a Blob for an image of the map.
         * @param map Map instance to get blob for.
         */
        public static getBlob(map: azmaps.Map): Promise<Blob>;
    }
}

export = atlas;