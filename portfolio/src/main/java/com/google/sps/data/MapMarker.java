package com.google.sps.data;

/** Represents all the content within a specific map Marker */
public class MapMarker {
    private double lat;
    private double lng;
    private String imgLink;
    private String content;

    public MapMarker(double lat, double lng, String imgLink, String content) {
        this.lat = lat;
        this.lng = lng;
        this.imgLink = imgLink;
        this.content = content;
    }
}