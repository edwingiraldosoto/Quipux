package com.example.playlists;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.example.playlists.config.SecurityProperties;

@SpringBootApplication
@EnableConfigurationProperties(SecurityProperties.class)
public class PlaylistsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlaylistsApplication.class, args);
	}

}
