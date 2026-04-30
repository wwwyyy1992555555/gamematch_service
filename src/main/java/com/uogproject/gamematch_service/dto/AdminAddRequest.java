package com.uogproject.gamematch_service.dto;

import org.springframework.web.multipart.MultipartFile;

/**
 * 管理员新增请求DTO（包含头像文件）
 */
public class AdminAddRequest {
    private String username;
    private String password;
    private Integer role;
    private Boolean isActive;
    private MultipartFile avatarFile;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public MultipartFile getAvatarFile() {
        return avatarFile;
    }

    public void setAvatarFile(MultipartFile avatarFile) {
        this.avatarFile = avatarFile;
    }
}
