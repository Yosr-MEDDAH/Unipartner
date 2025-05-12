package com.unipartner.unipartner;

import com.unipartner.unipartner.services.UnipartnerServiceImpl;
import com.unipartner.unipartner.services.jwt.UserServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class UnipartnerRestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnipartnerRestApiApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserServiceImpl service,
										UnipartnerServiceImpl unipartnerService){
		return args->{
//			service.exportUsersToCSV("C:/Users/yosr/unipartnerApi/unipartner-rest-api/Student Recommendation system/data/students.csv");
//			String studentId = "657a4d68a11c7361d9fec3c7";
//			List<String> recommendations = unipartnerService.getRecommendations(studentId);
//			System.out.println("Recommendations: " + recommendations);
		};

	}

}
