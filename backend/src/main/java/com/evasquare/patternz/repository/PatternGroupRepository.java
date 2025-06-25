package com.evasquare.patternz.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evasquare.patternz.entity.PatternGroupEntity;

public interface PatternGroupRepository extends JpaRepository<PatternGroupEntity, Long> {

    Optional<PatternGroupEntity> findByUuid(String hash);
}
