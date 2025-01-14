package com.example.SIG.Controller;

import com.example.SIG.Model.Candidats;
import com.example.SIG.Repository.CandidatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/candidats")
@CrossOrigin("http://localhost:3000") // Pour connecter le backend au frontend
public class CandidatsController {

    @Autowired
    private CandidatsRepository candidatsRepository;

    @GetMapping("/all")
    public List<Candidats> getAllCandidats() {
        return candidatsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Candidats getCandidatById(@PathVariable Long id) {
        return candidatsRepository.findById(id).orElse(null);
    }

    @PostMapping("/addCandidat")
    public ResponseEntity<Candidats> addCandidat(
            @RequestParam("nom_candidat") String nomCandidat,
            @RequestParam("parti_politique") String partiPolitique,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {

        try {
            Candidats candidat = new Candidats();
            candidat.setNom_candidat(nomCandidat);
            candidat.setParti_politique(partiPolitique);

            if (photo != null && !photo.isEmpty()) {
                candidat.setPhoto(photo.getBytes());
            }

            Candidats savedCandidat = candidatsRepository.save(candidat);
            return new ResponseEntity<>(savedCandidat, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/editCandidat/{id}")
    public ResponseEntity<Candidats> updateCandidat(
            @PathVariable("id") Long id,
            @RequestParam("nom_candidat") String nomCandidat,
            @RequestParam("parti_politique") String partiPolitique,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {

        try {
            Optional<Candidats> candidatData = candidatsRepository.findById(id);

            if (candidatData.isPresent()) {
                Candidats candidat = candidatData.get();
                candidat.setNom_candidat(nomCandidat);
                candidat.setParti_politique(partiPolitique);

                if (photo != null && !photo.isEmpty()) {
                    candidat.setPhoto(photo.getBytes());
                }

                return new ResponseEntity<>(candidatsRepository.save(candidat), HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteCandidat/{id}")
    public ResponseEntity<HttpStatus> deleteCandidat(@PathVariable("id") Long id) {
        try {
            candidatsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/photo/{id}")
    public ResponseEntity<byte[]> getPhoto(@PathVariable("id") Long id) {
        Optional<Candidats> candidatData = candidatsRepository.findById(id);

        if (candidatData.isPresent() && candidatData.get().getPhoto() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(candidatData.get().getPhoto());
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/count")
    public Long countAllCandidats() {
        return candidatsRepository.countAllBy();
    }
}