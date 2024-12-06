package com.example.SIG.Service;

import com.example.SIG.Repository.ElecteursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ElecteursService {

    @Autowired
    private ElecteursRepository electeursRepository;

    public List<Map<String, Long>> getTotalElecteursByBureauDeVote() {
        List<Object[]> results = electeursRepository.countElecteursByBureauDeVote();
        List<Map<String, Long>> formattedResults = new ArrayList<>();

        for (Object[] result : results) {
            String bureauName = result[0] != null ? result[0].toString() : "Unknown Bureau";
            Long count = (Long) result[1];

            Map<String, Long> resultMap = new HashMap<>();
            resultMap.put(bureauName, count);
            formattedResults.add(resultMap);
        }

        return formattedResults;
    }
}