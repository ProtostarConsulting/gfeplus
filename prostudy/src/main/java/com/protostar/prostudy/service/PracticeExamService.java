package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.PracticeExamEntity;

@Api(name = "practiceExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class PracticeExamService {

	@ApiMethod(name = "addPracticeExam")
	public PracticeExamEntity addPracticeExam(PracticeExamEntity exam) {
		Key<PracticeExamEntity> now = ofy().save().entity(exam).now();
		PracticeExamEntity practiceExamEntity = ofy().load().type(PracticeExamEntity.class).id(now.getId()).now();
		return practiceExamEntity;
	}
	

	@ApiMethod(name = "getPracticeExams")
	public List<PracticeExamEntity> getPracticeExams() {
		return ofy().load().type(PracticeExamEntity.class).list();
	}


	@ApiMethod(name = "getPracticeExamById")
	public PracticeExamEntity getPracticeExamById(@Named("examId") Long examId) {
		
		PracticeExamEntity selected = ofy().load()
				.type(PracticeExamEntity.class).id(examId).now();
		return selected;
	}
	
	@ApiMethod(name = "getPracticeExamByInstitute")
	 public List<PracticeExamEntity> getPracticeExamByInstitute(@Named("instituteID") Long instituteID) {
		System.out.println("inside getPracticeExamByInstitute");
	  List<PracticeExamEntity> practiceExamList = ofy().load().type(PracticeExamEntity.class).filter("instituteID", instituteID).list();
	  return practiceExamList;
	  
	 }

	@ApiMethod(name = "updatePracticeExam")
	public void updatePracticeExam(PracticeExamEntity exam) {
		Key<PracticeExamEntity> now = ofy().save().entity(exam).now();
	}

	

}
