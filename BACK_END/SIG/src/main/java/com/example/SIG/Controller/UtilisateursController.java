package com.example.SIG.Controller;

import com.example.SIG.Model.Role;
import com.example.SIG.Model.Utilisateurs;
import com.example.SIG.Repository.UtilisateursRepository;
import com.example.SIG.Service.UtilisateursService;
import com.example.SIG.dto.LoginRequestDTO;
import com.example.SIG.dto.UtilisateurRequestDTO;
import com.example.SIG.dto.UtilisateurResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;


@RestController
@RequestMapping("/utilisateurs")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class UtilisateursController {

    @Autowired
    private UtilisateursRepository utilisateursRepository;
    @Autowired
    private UtilisateursService utilisateursService;


@PostMapping("/createUser")
    public ResponseEntity<UtilisateurResponseDTO> createUtilisateur(@RequestBody UtilisateurRequestDTO requestDTO) {
       // Convert DTO to entity directly
        Utilisateurs newUser = requestDTO.toEntity();

        // Save the user
        Utilisateurs savedUser = utilisateursService.createUtilisateur(newUser);

        // Create the response DTO using the static method
        UtilisateurResponseDTO responseDTO = UtilisateurResponseDTO.fromEntity(savedUser);

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);

    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String nomUtilisateur, @RequestParam String motDePasse ,@RequestParam String role) {
       // boolean isValidUser = utilisateursService.verifyUser1(nomUtilisateur, motDePasse ,role);
        Utilisateurs utilisateur = utilisateursService.verifyUser1(nomUtilisateur, motDePasse, role);

        if (utilisateur != null) {
            // Return a JSON object containing the message and the user's role
            return ResponseEntity.ok(new UserResponse("User is valid", utilisateur.getRole()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid credentials"));
        }
//        if (isValidUser) {
//            // Renvoie un objet JSON contenant le message et le rôle
//            return ResponseEntity.ok(new UserResponse("User is valid", "admin")); // Exemple de rôle
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid credentials"));
//        }
    }

    // Classe pour représenter la réponse de l'utilisateur
    public class UserResponse {
        private String message;
        private String role;

        public UserResponse(String message, String role) {
            this.message = message;
            this.role = role;
        }

        // Getters
        public String getMessage() { return message; }
        public String getRole() { return role; }
    }

    // Classe pour représenter les erreurs
    public class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
    }

    @GetMapping("/all")
    public List<Utilisateurs> getAllUtilisateurs() {
        return utilisateursRepository.findAll();
    }

    @GetMapping("/{id}")
    public Utilisateurs getUtilisateursById(@PathVariable Long id) {
        return utilisateursRepository.findById(id).orElse(null);
    }
    
    @PostMapping("/addUser")
    public Utilisateurs createUtilisateurs(@RequestBody Utilisateurs utilisateurs) {
        return utilisateursRepository.save(utilisateurs);
    }

    @PutMapping("/editUser/{id}")
    public Utilisateurs updateUtilisateurs(@PathVariable Long id, @RequestBody Utilisateurs utilisateurs) {
        if (utilisateursRepository.existsById(id)) {
            utilisateurs.setId_utilisateur(id);
            return utilisateursRepository.save(utilisateurs);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("deleteUser/{id}")
    public void deleteUtilisateurs(@PathVariable Long id) {
        utilisateursRepository.deleteById(id);
    }

    @GetMapping("/nombreScrutateurs")
    public int getNombreScrutateurs() {
        return utilisateursRepository.countByRole(Role.Scrutateur);
    }

    @GetMapping("/nombreSuperAdministrateur")
    public int getNombreSuperAdministrateur() {
        return utilisateursRepository.countByRole(Role.SuperAdmin);
    }

    @GetMapping("/getSuperAdmins")
    public List<Utilisateurs> getSuperAdmins() {
        return utilisateursRepository.findByRole(Role.SuperAdmin);
    }
    @GetMapping("/getScrutateurs")
    public List<Utilisateurs> getScrutateurs() {
        return utilisateursRepository.findByRole(Role.Scrutateur);
    }

}