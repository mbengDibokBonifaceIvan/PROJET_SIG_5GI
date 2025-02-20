package com.example.SIG.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "process_verbaux")
public class pv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_Pv;

    @ManyToOne
    @JoinColumn(name = "id_bureau_vote")
    private Bureaux_De_Vote bureauVote;

    @ManyToOne
    @JoinColumn(name = "id_candidat")
    private Candidats candidat;

    private int nombre_voix;
    private Date date_saisie;
    private int annee_election;

    public pv() {
    }

    public pv(Long id_Pv, Bureaux_De_Vote bureauVote, Candidats candidat, int nombre_voix,
            Date date_saisie, int annee_election) {
        this.id_Pv = id_Pv;
        this.bureauVote = bureauVote;
        this.candidat = candidat;
        this.nombre_voix = nombre_voix;
        this.date_saisie = date_saisie;
        this.annee_election = annee_election;
    }

    // Getters and Setters

    public Long getid_Pv() {
        return id_Pv;
    }

    public void setid_Pv(Long id_Pv) {
        this.id_Pv = id_Pv;
    }

    public Bureaux_De_Vote getBureauVote() {
        return bureauVote;
    }

    public void setBureauVote(Bureaux_De_Vote bureauVote) {
        this.bureauVote = bureauVote;
    }

    public Candidats getCandidat() {
        return candidat;
    }

    public void setCandidat(Candidats candidat) {
        this.candidat = candidat;
    }

    public int getNombre_voix() {
        return nombre_voix;
    }

    public void setNombre_voix(int nombre_voix) {
        this.nombre_voix = nombre_voix;
    }

    public Date getDate_saisie() {
        return date_saisie;
    }

    public void setDate_saisie(Date date_saisie) {
        this.date_saisie = date_saisie;
    }

    public int getAnnee_election() {
        return annee_election;
    }

    public void setAnnee_election(int annee_election) {
        this.annee_election = annee_election;
    }
}
