package com.uogproject.gamematch_service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class GamematchServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamematchServiceApplication.class, args);
        log.info("Gamematch Service started!");
    }

}
