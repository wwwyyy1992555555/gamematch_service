package com.uogproject.gamematch_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Value("${app.upload-dir}")
    private String uploadDir;
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 配置静态资源访问路径（兼容旧路径 /images）
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/image/");
        
        // 配置静态资源访问路径
        registry.addResourceHandler("/image/**")
                .addResourceLocations("classpath:/static/image/");
        
        // 配置上传文件的访问路径
        registry.addResourceHandler("/image/upload/**")
                .addResourceLocations("file:" + uploadDir + "/");
        
        // 配置音频文件的访问路径（static目录）
        registry.addResourceHandler("/audio/**")
                .addResourceLocations("classpath:/static/audio/");
        
        // 配置视频文件的访问路径（static目录）
        registry.addResourceHandler("/video/**")
                .addResourceLocations("classpath:/static/video/");
    }
}
