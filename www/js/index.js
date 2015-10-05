/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.initMap();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    initMap: function () {
           
        // Define Bing api key.
        var strBingApiKey = 'AlUNqOceitHsnEtv7APDQZKuC_HOxQVLdhkvxP5MD0rknzeHvvZ0OtQMYlbxZ39O';
        // Define Google Api key. Not used if left "false".
        var strGoogleApiKey = false;
        
        var arrLayers = [];
        
        // Adding KIJS map.
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.KIJS});
        
        // Adding 4 Google map types.
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.GOOGLE_STREETS, 'ApiKey': strGoogleApiKey});
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.GOOGLE_PHYSICAL, 'ApiKey': strGoogleApiKey});
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.GOOGLE_HYBRID, 'ApiKey': strGoogleApiKey});
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.GOOGLE_SATELLITE, 'ApiKey': strGoogleApiKey});
        
        // Adding 3 Bing map types.
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.BING_ROAD, 'ApiKey': strBingApiKey});
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.BING_HYBRID, 'ApiKey': strBingApiKey});
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.BING_AERIAL, 'ApiKey': strBingApiKey});
        
        // Adding Open Street Map.
        arrLayers.push({'TypeID': KIJS.LAYER_TYPE_ID.OSM});
        
        
        
        // Creating map object and initializing map.
        var map = new JanaSetaMap('canvas_id', {layers: arrLayers, overview_map: true, enable_drawing: true}, afterMapLoaded);

        
        // This function is called after map is loaded.
        function afterMapLoaded()
        {
            
            // Center and zoom map to determined place
            map.SetCenter(map.PointLatLon(56.9539968, 24.1153844), 10);
        
        
        
            
            
        /*    var starki_wms = new OpenLayers.Layer.WMS( "Country borders",
                "http://wms.kartes.lv/STARKI/wgs/11_starki/", {transparent:'true', version: '1.3.0', format: 'image/png'}, 
                {units: "m", numZoomLevels: 19, minZoomLevel: 1, maxZoomLevel: 19,opacity: 0.7, visibility: false});
            map.OpenLayers.addLayer(starki_wms);
            
            var starki_wms2 = new OpenLayers.Layer.WMS( "Country borders 2",
                "http://wms.kartes.lv/STARKI/wgs/11_starki2/", {transparent:'true', version: '1.3.0', format: 'image/png'}, 
                {units: "m", numZoomLevels: 19, minZoomLevel: 1, maxZoomLevel: 19,opacity: 0.7, visibility: false});
            map.OpenLayers.addLayer(starki_wms2);*/
            
            
            
            
            // Center and zoom map
            var lon = 24.1096849;
            var lat = 56.9671089;
            var lonlat = new OpenLayers.LonLat(lon, lat).transform(me.wgs84, map.OpenLayers.getProjectionObject());
            var zoom = 6;
            map.OpenLayers.setCenter(lonlat, zoom);
        
        
        
            // Creating vector layer.
            var objVectorLayer = new OpenLayers.Layer.Vector("My vector layer");
            // Adding vector layer on map.
            map.OpenLayers.addLayer(objVectorLayer);
            
            
            // Get clone vector style object.
            var style = map.getVectorStyle({strokeWidth: 5, strokeColor: '#FF0000', pointRadius: 10});
            /*
                Here are all available styling parameters:
                ---
                    fill    {Boolean} Set to false if no fill is desired.
                    fillColor    {String} Hex fill color.  Default is “#ee9900”.
                    fillOpacity    {Number} Fill opacity (0-1).  Default is 0.4
                    stroke    {Boolean} Set to false if no stroke is desired.
                    strokeColor    {String} Hex stroke color.  Default is “#ee9900”.
                    strokeOpacity    {Number} Stroke opacity (0-1).  Default is 1.
                    strokeWidth    {Number} Pixel stroke width.  Default is 1.
                    strokeLinecap    {String} Stroke cap type.  Default is “round”.  [butt | round | square]
                    strokeDashstyle    {String} Stroke dash style.  Default is “solid”.  [dot | dash | dashdot | longdash | longdashdot | solid]
                    graphic    {Boolean} Set to false if no graphic is desired.
                    pointRadius    {Number} Pixel point radius.  Default is 6.
                    pointerEvents    {String} Default is “visiblePainted”.
                    cursor    {String} Default is “”.
                    externalGraphic    {String} Url to an external graphic that will be used for rendering points.
                    graphicWidth    {Number} Pixel width for sizing an external graphic.
                    graphicHeight    {Number} Pixel height for sizing an external graphic.
                    graphicOpacity    {Number} Opacity (0-1) for an external graphic.
                    graphicXOffset    {Number} Pixel offset along the positive x axis for displacing an external graphic.
                    graphicYOffset    {Number} Pixel offset along the positive y axis for displacing an external graphic.
                    rotation    {Number} For point symbolizers, this is the rotation of a graphic in the clockwise direction about its center point (or any point off center as specified by graphicXOffset and graphicYOffset).
                    graphicZIndex    {Number} The integer z-index value to use in rendering.
                    graphicName    {String} Named graphic to use when rendering points.  Supported values include “circle” (default), “square”, “star”, “x”, “cross”, “triangle”.
                    graphicTitle    {String} Tooltip when hovering over a feature.  deprecated, use title instead
                    title    {String} Tooltip when hovering over a feature.  Not supported by the canvas renderer.
                    backgroundGraphic    {String} Url to a graphic to be used as the background under an externalGraphic.
                    backgroundGraphicZIndex    {Number} The integer z-index value to use in rendering the background graphic.
                    backgroundXOffset    {Number} The x offset (in pixels) for the background graphic.
                    backgroundYOffset    {Number} The y offset (in pixels) for the background graphic.
                    backgroundHeight    {Number} The height of the background graphic.  If not provided, the graphicHeight will be used.
                    backgroundWidth    {Number} The width of the background width.  If not provided, the graphicWidth will be used.
                    label    {String} The text for an optional label.  For browsers that use the canvas renderer, this requires either fillText or mozDrawText to be available.
                    labelAlign    {String} Label alignment.  This specifies the insertion point relative to the text.  It is a string composed of two characters.  The first character is for the horizontal alignment, the second for the vertical alignment.  Valid values for horizontal alignment: “l”=left, “c”=center, “r”=right.  Valid values for vertical alignment: “t”=top, “m”=middle, “b”=bottom.  Example values: “lt”, “cm”, “rb”.  Default is “cm”.
                    labelXOffset    {Number} Pixel offset along the positive x axis for displacing the label.  Not supported by the canvas renderer.
                    labelYOffset    {Number} Pixel offset along the positive y axis for displacing the label.  Not supported by the canvas renderer.
                    labelSelect    {Boolean} If set to true, labels will be selectable using SelectFeature or similar controls.  Default is false.
                    labelOutlineColor    {String} The color of the label outline.  Default is ‘white’.  Only supported by the canvas & SVG renderers.
                    labelOutlineWidth    {Number} The width of the label outline.  Default is 3, set to 0 or null to disable.  Only supported by the SVG renderers.
                    labelOutlineOpacity    {Number} The opacity (0-1) of the label outline.  Default is fontOpacity.  Only supported by the canvas & SVG renderers.
                    fontColor    {String} The font color for the label, to be provided like CSS.
                    fontOpacity    {Number} Opacity (0-1) for the label
                    fontFamily    {String} The font family for the label, to be provided like in CSS.
                    fontSize    {String} The font size for the label, to be provided like in CSS.
                    fontStyle    {String} The font style for the label, to be provided like in CSS.
                    fontWeight    {String} The font weight for the label, to be provided like in CSS.
                    display    {String} Symbolizers will have no effect if display is set to “none”.  All other values have no effect.
                */
                
            
        }
 
    }
};
