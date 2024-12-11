package com.example.SIG.Controller;

import com.example.SIG.Model.Utilisateurs;
import com.example.SIG.Repository.UtilisateursRepository;
import com.example.SIG.Service.UtilisateursService;
import com.example.SIG.dto.LoginRequestDTO;
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

//    @GetMapping("/verify")
//       public ResponseEntity<?> verify(@RequestParam String name, @RequestParam String password) {
//        System.out.println("Received login request with name: " + name + " and password: " + password);
//           boolean isValidUser = utilisateursService.verifyUser(name, password);
//        System.out.println("Result: " + isValidUser);
//           if (isValidUser) {
//               return ResponseEntity.ok("User is valid");
//           } else {
//               return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//           }
//       }
    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String name, @RequestParam String password) {
        boolean isValidUser = utilisateursService.verifyUser1(name, password);
        if (isValidUser) {
            // Renvoie un objet JSON contenant le message et le rôle
            return ResponseEntity.ok(new UserResponse("User is valid", "admin")); // Exemple de rôle
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid credentials"));
        }
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

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String name, @RequestParam String password) {
        System.out.println("Received login request with name: " + name + " and password: " + password);
        if (utilisateursService.verifyUser1(name, password)) {
            return ResponseEntity.ok("User verified");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
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
        return utilisateursRepository.countByRole("Scrutateur");
    }

    @GetMapping("/nombreSuperAdministrateur")
    public int getNombreSuperAdministrateur() {
        return utilisateursRepository.countByRole("SuperAdmin");
    }



}