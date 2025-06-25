package com.evasquare.patternz.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.evasquare.patternz.entity.Pattern;
import com.evasquare.patternz.model.AddModel;
import com.evasquare.patternz.model.GetModel;
import com.evasquare.patternz.repository.PatternRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class PatternzController {

    private final PatternRepository patternRepository;

    @GetMapping("/get")
    public ResponseEntity<Pattern> getPattern(@RequestBody GetModel body) {
        com.evasquare.patternz.entity.Pattern foundPattern = patternRepository.findByUuid(body.getUuid()).get();
        return ResponseEntity.status(HttpStatus.OK).body(foundPattern);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPattern(@RequestBody AddModel body) {
        com.evasquare.patternz.entity.Pattern newPattern = new com.evasquare.patternz.entity.Pattern();

        newPattern.setGrid(body.getGrid());
        String newUUID = UUID.randomUUID().toString();
        newPattern.setUuid(newUUID);
        newPattern.setShape(body.getShape());
        patternRepository.save(newPattern);

        return ResponseEntity.status(HttpStatus.OK).body(newUUID);
    }

}
