package com.evasquare.patternz.entity;

import java.sql.Timestamp;
import java.util.ArrayList;

import org.hibernate.annotations.CreationTimestamp;

import com.evasquare.patternz.model.Shape;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pattern")
@Getter
@Setter
public class PatternEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private ArrayList<ArrayList<Boolean>> grid;

    @Enumerated(EnumType.STRING)
    private Shape shape;

    @CreationTimestamp
    private Timestamp createdAt;
}
