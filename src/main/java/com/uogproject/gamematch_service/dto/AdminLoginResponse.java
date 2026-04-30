package com.uogproject.gamematch_service.dto;

import lombok.Data;

/**
 * 管理员登录响应数据传输对象
 */
@Data
public class AdminLoginResponse {
    private String token;
    private String username;
    private String avatar;
    private Integer role;
}
