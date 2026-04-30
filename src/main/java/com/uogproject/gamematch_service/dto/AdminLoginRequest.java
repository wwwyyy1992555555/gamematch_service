package com.uogproject.gamematch_service.dto;

import lombok.Data;

/**
 * 管理员登录请求数据传输对象
 */
@Data
public class AdminLoginRequest {
    private String username;
    private String password;
}
