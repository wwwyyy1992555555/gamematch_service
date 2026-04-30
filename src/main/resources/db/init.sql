-- Init database tables

-- Drop old tables
DROP TABLE IF EXISTS companion;
DROP TABLE IF EXISTS admin_user;
DROP TABLE IF EXISTS system_config;

-- Admin user table
CREATE TABLE IF NOT EXISTS admin_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    role INT NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companion table
CREATE TABLE IF NOT EXISTS companion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    game_types VARCHAR(255) NOT NULL, -- 多个游戏类型，逗号分隔
    ranks VARCHAR(255), -- 多个段位，逗号分隔
    servers VARCHAR(255), -- 多个服务器，逗号分隔
    price DOUBLE NOT NULL,
    rating DOUBLE DEFAULT 100.0,
    voice_intro VARCHAR(255),
    video_url VARCHAR(255),
    description TEXT,
    tags VARCHAR(255),
    is_online BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System config table
CREATE TABLE IF NOT EXISTS system_config (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
