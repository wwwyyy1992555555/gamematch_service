package com.uogproject.gamematch_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GamematchServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamematchServiceApplication.class, args);
        System.out.println("Gamematch Service started!");
    }

}
