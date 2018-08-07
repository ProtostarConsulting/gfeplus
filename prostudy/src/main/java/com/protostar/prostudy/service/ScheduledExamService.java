package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.ScheduledStudentExamEntity;
import com.protostar.prostudy.entity.ScheduledExamEntity;
import com.protostar.prostudy.entity.UserEntity;
@Api(name = "scheduledExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))

public class ScheduledExamService {
	@ApiMethod(name = "addScheduledExam")
	public ScheduledExamEntity addScheduledExam(ScheduledExamEntity exam) {
		Key<ScheduledExamEntity> now = ofy().save().entity(exam).now();
		ScheduledExamEntity scheduledExamEntity = ofy().load().type(ScheduledExamEntity.class).id(now.getId()).now();
		return scheduledExamEntity;
	}
	 
	@ApiMethod(name = "getScheduledExams")
	public List<ScheduledExamEntity> getScheduledExams() {
		return ofy().load().type(ScheduledExamEntity.class).list();
	}
	

	@ApiMethod(name = "getScheduledExamById")
	public ScheduledExamEntity getScheduledExamById(@Named("id") Long id) {
		
		ScheduledExamEntity selected = ofy().load()
				.type(ScheduledExamEntity.class).id(id).now();
		return selected;
	}
	
	@ApiMethod(name = "getScheduledExamByInstitute")
	 public List<ScheduledExamEntity> getScheduledExamByInstitute(@Named("instituteID") Long instituteID) {
		System.out.println("inside getScheduledExamByInstitute");
	  List<ScheduledExamEntity> scheduledExamList = ofy().load().type(ScheduledExamEntity.class).filter("instituteID", instituteID).list();
	  return scheduledExamList;
	  
	 }

	@ApiMethod(name = "updateScheduledExam")
	public void updateScheduledExam(ScheduledExamEntity exam) {
		Key<ScheduledExamEntity> now = ofy().save().entity(exam).now();
	}
	
	
	@ApiMethod(name = "assignExamToStudent")
	public void assignExamToStudent(UserEntity assignExamToStudent) {
		
		for(int i=0; i<assignExamToStudent.getSelectedStudents().size(); i++){
			
			long studID = assignExamToStudent.getSelectedStudents().get(i).getId();
			
			UserEntity fetchedStud = ofy().load()
					.type(UserEntity.class).id(studID).now();
			
			fetchedStud.setSelectedExam(assignExamToStudent.getSelectedExam());
			
			ofy().save().entity(fetchedStud).now();	
		}
	}
	
	@ApiMethod(name = "getStudentByExam", path="getStudentByExam")
	 public List<UserEntity> getStudentByExam(@Named("selectedExam") Long selectedExam) {
		
	  List<UserEntity> scheduledExamList = ofy().load().type(UserEntity.class).filter("selectedExam", selectedExam).list();
	  return scheduledExamList;
	  
	 }
	
	
}



