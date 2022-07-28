---
page_type: sample
description: A module for the Azure Maps Web SDK that generates screenshots of the map.
languages:
- javascript
- typescript
products:
- azure
- azure-maps
---

# Azure Maps Image Exporter module

A module for the Azure Maps Web SDK that generates screenshots of the map.

**Important**

In order for this module to work, the maps `preserveDrawingBuffer` must be set to `true` when the map is initally loaded and can't be set afterwards.

**Note** that the screenshot is only of the rendered map canvas, other HTML elements, such as HTML markers and controls are not rendered on the image. Native rendering layers such as BubbleLayer, SymbolLayer, LineLayer, PolygonLayer, ImageLayer, and TileLayer are supported.

**Samples**

[Export Map as Image](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Export%20Map%20as%20Image)
<br/>[<img src="https://samples.azuremaps.com/map/export-map-as-image/screenshot.jpg" height="200px">](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Export%20Map%20as%20Image)

## Getting started

Download the project and copy the `azure-maps-image-exporter` JavaScript file from the `dist` folder into your project. 

**Usage**

```JavaScript
//Get map screenshot as an image element.
atlas.MapImageExporter.getImage(map).then(function(mapImg) {
    //Do something with the image element, in this case append if to the document body.
    document.body.appendChild(mapImg);
}, function (e) {
    alert(e.message);
});

//Get map screenshot as a data URI.
atlas.MapImageExporter.getDataUri(map).then(function (dataUri) {
    //Do something with the data URI. In this case its openning a new tab in the browser and loading it in an img tag.
    var win = window.open();
    win.document.write('<img src="' + dataUri + '"/>');
}, function (error) {
    alert(error);
});

//Get a map screenshot as an image blob.
atlas.MapImageExporter.getBlob(map).then(function (mapImgBlob) {
    //Do somethimg with the image blob.
}, function (e) {
    alert(e.message);
});
```

## API Reference

### MapImageExporter class

Namespace: `atlas`

A static class for generating screenshots of the map.

**Static Methods** 

| Name | Return type | Description |
|------|-------------|-------------|
| `getImage(map: atlas.Map)` | `Promise<HTMLImageElement>` | Generates a Image object for an image of the map. |
| `getDataUri(map: atlas.Map, mimeType?: 'image/png' \| 'image/jpeg')` | `Promise<string>` | Generates a data URI for an image of the map. Mime type defaults to `'image/png'`. |
| `getBlob(map: atlas.Map)` | `Promise<Blob>` | Generates a Blob for an image of the map. |

## Related Projects

**Open Azure Maps Web SDK modules**

* [Azure Maps Animation module](https://github.com/Azure-Samples/azure-maps-animations)
* [Azure Maps Geolocation Control module](https://github.com/Azure-Samples/azure-maps-geolocation-control)
* [Azure Maps Fullscreen Control module](https://github.com/Azure-Samples/azure-maps-fullscreen-control)
* [Azure Maps Selection Control module](https://github.com/Azure-Samples/azure-maps-selection-control)
* [Azure Maps Services UI module](https://github.com/Azure-Samples/azure-maps-services-ui)
* [Azure Maps Sync Map module](https://github.com/Azure-Samples/azure-maps-sync-maps)

**Additional projects**

* [Azure Maps Web SDK Samples](https://github.com/Azure-Samples/AzureMapsCodeSamples)
* [Azure Maps Gov Cloud Web SDK Samples](https://github.com/Azure-Samples/AzureMapsGovCloudCodeSamples)
* [Azure Maps & Azure Active Directory Samples](https://github.com/Azure-Samples/Azure-Maps-AzureAD-Samples)
* [List of open-source Azure Maps projects](https://github.com/microsoft/Maps/blob/master/AzureMaps.md)

## Additional Resources

* [Azure Maps (main site)](https://azure.com/maps)
* [Azure Maps Documentation](https://docs.microsoft.com/azure/azure-maps/index)
* [Azure Maps Blog](https://azure.microsoft.com/blog/topics/azure-maps/)
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

## Contributing

We welcome contributions. Feel free to submit code samples, file issues and pull requests on the repo and we'll address them as we can. 
Learn more about how you can help on our [Contribution Rules & Guidelines](https://github.com/Azure-Samples/azure-maps-image-exporter/blob/master/CONTRIBUTING.md). 

You can reach out to us anytime with questions and suggestions using our communities below:
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). 
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or 
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

MIT
 
See [License](https://github.com/Azure-Samples/azure-maps-image-exporter/blob/master/LICENSE.md) for full license text.
