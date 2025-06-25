package com.evasquare.patternz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evasquare.patternz.entity.PatternGroupEntity;

public interface PatternRepository extends JpaRepository<PatternGroupEntity, Long> {

}
