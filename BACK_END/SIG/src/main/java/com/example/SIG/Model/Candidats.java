package com.example.SIG.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "candidats")
public class Candidats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_candidat;

    private String nom_candidat;
    private String parti_politique;

    public Candidats() {
    }

    public Candidats(Long id_candidat, String nom_candidat, String parti_politique) {
        this.id_candidat = id_candidat;
        this.nom_candidat = nom_candidat;
        this.parti_politique = parti_politique;
    }


// Getters and Setters

    public Long getId_candidat() {
        return id_candidat;
    }

    public void setId_candidat(Long id_candidat) {
        this.id_candidat = id_candidat;
    }

    public String getNom_candidat() {
        return nom_candidat;
    }

    public void setNom_candidat(String nom_candidat) {
        this.nom_candidat = nom_candidat;
    }

    public String getParti_politique() {
        return parti_politique;
    }

    public void setParti_politique(String parti_politique) {
        this.parti_politique = parti_politique;
    }
}
