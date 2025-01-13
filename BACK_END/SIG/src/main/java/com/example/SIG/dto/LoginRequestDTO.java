package com.example.SIG.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String nomUtilisateur;
    private String motDePasse;
    private String role; // Si vous souhaitez inclure le rôle
}
