package com.uogproject.gamematch_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "companion")
public class Companion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nickname;
    
    private String avatar;
    
    @Column(nullable = false)
    private String gameTypes; // 多个游戏类型，逗号分隔
    
    private String ranks; // 多个段位，逗号分隔
    
    private String servers; // 多个服务器，逗号分隔
    
    @Column(nullable = false)
    private Double price;
    
    private Double rating;
    
    private String voiceIntro;
    
    private String videoUrl;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String tags;
    
    private Boolean isOnline;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isOnline == null) {
            isOnline = true;
        }
        if (rating == null) {
            rating = 100.0;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNickname() {
        return nickname;
    }
    
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    
    public String getAvatar() {
        return avatar;
    }
    
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    
    public String getGameTypes() {
        return gameTypes;
    }
    
    public void setGameTypes(String gameTypes) {
        this.gameTypes = gameTypes;
    }
    
    public String getRanks() {
        return ranks;
    }
    
    public void setRanks(String ranks) {
        this.ranks = ranks;
    }
    
    public String getServers() {
        return servers;
    }
    
    public void setServers(String servers) {
        this.servers = servers;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Double getRating() {
        return rating;
    }
    
    public void setRating(Double rating) {
        this.rating = rating;
    }
    
    public String getVoiceIntro() {
        return voiceIntro;
    }
    
    public void setVoiceIntro(String voiceIntro) {
        this.voiceIntro = voiceIntro;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getTags() {
        return tags;
    }
    
    public void setTags(String tags) {
        this.tags = tags;
    }
    
    public Boolean getIsOnline() {
        return isOnline;
    }
    
    public void setIsOnline(Boolean isOnline) {
        this.isOnline = isOnline;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
