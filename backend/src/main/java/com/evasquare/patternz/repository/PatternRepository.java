package com.evasquare.patternz.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evasquare.patternz.entity.Pattern;

public interface PatternRepository extends JpaRepository<Pattern, Long> {

    Optional<Pattern> findByUuid(String hash);
}
