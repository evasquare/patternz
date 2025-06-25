package com.evasquare.patternz.model;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddModel {

    private ArrayList<ArrayList<Boolean>> grid;
    private Shape shape;
}
