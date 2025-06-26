package com.evasquare.patternz;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.evasquare.patternz.repository.PatternGroupRepository;
import com.evasquare.patternz.repository.PatternRepository;

import lombok.AllArgsConstructor;

@SpringBootApplication
@AllArgsConstructor
@EnableScheduling
public class PatternzApplication {

    private final PatternRepository patternRepository;
    private final PatternGroupRepository patternGroupRepository;

    public static void main(String[] args) {
        SpringApplication.run(PatternzApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Scheduled(cron = "0 0 * * * *")
    public void cleanOldData() {
        var allPatternGroups = patternGroupRepository.findAll();
        var timestamp = Timestamp.valueOf(LocalDateTime.now().minusDays(3));

        for (var patternGroup : allPatternGroups) {
            if (patternGroup.getCreatedAt().before(timestamp)) {
                patternRepository.deleteById(patternGroup.getId());
            }
        }

        var allPatterns = patternRepository.findAll();
        for (var pattern : allPatterns) {
            if (pattern.getCreatedAt().before(timestamp)) {
                patternRepository.deleteById(pattern.getId());
            }
        }
    }

}
