package com.example.SIG.Model;


import jakarta.persistence.Embeddable;

@Embeddable
public class Coordonnees {

    private double latitude;
    private double longitude;

    public Coordonnees() {
    }

    public Coordonnees(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters and Setters

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
