package com.example.SIG.Controller;

import com.example.SIG.Model.Regions;
import com.example.SIG.Repository.RegionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/regions")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class RegionsController {

    @Autowired
    private RegionsRepository regionsRepository;

    @GetMapping("/all")
    public List<Regions> getAllRegions() {
        return regionsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Regions getRegionById(@PathVariable Long id) {
        return regionsRepository.findById(id).orElse(null);
    }

    @PostMapping("/addRegion")
    public Regions createRegion(@RequestBody Regions region) {
        return regionsRepository.save(region);
    }

    @PutMapping("/editRegion/{id}")
    public Regions updateRegion(@PathVariable Long id, @RequestBody Regions region) {
        if (regionsRepository.existsById(id)) {
            region.setId_région(id);
            return regionsRepository.save(region);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteRegion/{id}")
    public void deleteRegion(@PathVariable Long id) {
        regionsRepository.deleteById(id);
    }

    @GetMapping("/countAll")
    public Long countAllRegions() {
        return regionsRepository.countAllBy();
    }
}
