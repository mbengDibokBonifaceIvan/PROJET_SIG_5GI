package com.example.SIG.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Departements")
public class Departements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_département;

    private String nom_département;

    @ManyToOne
    @JoinColumn(name = "id_région")
    private Regions région;

    public Departements() {
    }

    public Departements(Long id_département, String nom_département, Regions région) {
        this.id_département = id_département;
        this.nom_département = nom_département;
        this.région = région;
    }

    // Getters and Setters

    public Long getId_département() {
        return id_département;
    }

    public void setId_département(Long id_département) {
        this.id_département = id_département;
    }

    public String getNom_département() {
        return nom_département;
    }

    public void setNom_département(String nom_département) {
        this.nom_département = nom_département;
    }

    public Regions getRégion() {
        return région;
    }

    public void setRégion(Regions région) {
        this.région = région;
    }
}