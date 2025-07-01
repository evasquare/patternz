package com.evasquare.patternz.controller;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.evasquare.patternz.entity.PatternEntity;
import com.evasquare.patternz.model.AddModel;
import com.evasquare.patternz.repository.PatternGroupRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class PatternzController {

    private final PatternGroupRepository patternGroupRepository;

    @GetMapping("/get/{uuid}")
    public ResponseEntity<?> getPattern(@PathVariable String uuid) {
        try {
            com.evasquare.patternz.entity.PatternGroupEntity foundPattern = patternGroupRepository.findByUuid(uuid).orElseThrow(() -> new NoSuchElementException("Pattern not found."));
            return ResponseEntity.status(HttpStatus.OK).body(foundPattern);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The pattern doesn't exist.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong.");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPattern(@RequestBody AddModel body
    ) {

        var patterns = body.getPatterns();
        if (patterns.size() != 9) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("It can only contain 9 patterns.");
        }

        ArrayList<PatternEntity> newPatternEntities = new ArrayList<>();

        for (var pattern : patterns) {
            PatternEntity newPatternEntity = new PatternEntity();
            newPatternEntity.setGrid(pattern.getGrid());
            newPatternEntity.setId(pattern.getId());
            newPatternEntity.setShape(pattern.getShape());
            newPatternEntities.add(newPatternEntity);

            var grids = pattern.getGrid();
            if (grids.size() != 3) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Grid size must be 3*3.");
            }

            for (var grid : grids) {
                if (grid.size() != 3) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Grid size must be 3*3.");
                }
            }
        }

        com.evasquare.patternz.entity.PatternGroupEntity newPatternGroup = new com.evasquare.patternz.entity.PatternGroupEntity();

        newPatternGroup.setPatterns(newPatternEntities);
        String newUUID = UUID.randomUUID().toString();
        newPatternGroup.setUuid(newUUID);
        patternGroupRepository.save(newPatternGroup);
        return ResponseEntity.status(HttpStatus.OK).body(newUUID);
    }

}
