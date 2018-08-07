package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.prostudy.entity.ScheduledExamEntity;
import com.protostar.prostudy.entity.ScheduledStudentExamEntity;
import com.protostar.prostudy.entity.UserEntity;

@Api(name = "scheduledStudentExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ScheduledStudentExamService {

	@ApiMethod(name = "assignScheduledExamToStudent")
	public void assignScheduledExamToStudent(ScheduledStudentExamEntity data) {		
		ofy().save().entity(data).now();
		
	}	
	@ApiMethod(name = "getScheduledExamByStudId", path="getScheduledExamByStudId")
	 public List<ScheduledStudentExamEntity> getScheduledExamByStudId(@Named("stud") Long studID) {	
	  List<ScheduledStudentExamEntity> examList = ofy().load().type(ScheduledStudentExamEntity.class).filter("stud", Ref.create(Key.create(UserEntity.class, studID))).filter("assigned", true).list();
	 	  return examList;	  
	 }
	
	@ApiMethod(name = "getScheduledExamListByStudentId", path="getScheduledExamListByStudentId")
	 public List<ScheduledExamEntity> getScheduledExamListByStudentId(@Named("id") Long studId) {
			
		ScheduledStudentExamService scheduledStudentExamService = new ScheduledStudentExamService();
		
		List<ScheduledStudentExamEntity> scheduledStudentExamEntityList = scheduledStudentExamService.getScheduledExamByStudId(studId);
		List<Long> examIds = new ArrayList<Long>();
		for(ScheduledStudentExamEntity ss: scheduledStudentExamEntityList){
			examIds.add(ss.getScheduledExam().getId());						
					
		}
	   Map<Long, ScheduledExamEntity> ids = ofy().load().type(ScheduledExamEntity.class).ids(examIds.toArray(new Long[examIds.size()]));
	   
	   List<ScheduledExamEntity> outPutList = new ArrayList<ScheduledExamEntity>();
		for(ScheduledExamEntity exam: ids.values()){
			outPutList.add(exam);
		}
	   return outPutList;
	  
	 }
	
	@ApiMethod(name = "getStudentByScheduledExamId", path="getStudentByScheduledExamId")
	 public List<ScheduledStudentExamEntity> getStudentByScheduledExamId(@Named("scheduledExam") Long examID) {	
	  List<ScheduledStudentExamEntity> studList = ofy().load().type(ScheduledStudentExamEntity.class).filter("scheduledExam", Ref.create(Key.create(ScheduledExamEntity.class, examID))).filter("assigned", true).list();
	 	  return studList;	  
	 }
	
	@ApiMethod(name = "getStudentListByScheduledExamId", path="getStudentListByScheduledExamId")
	 public List<UserEntity> getStudentListByScheduledExamId(@Named("id") Long examId) {
			
		ScheduledStudentExamService scheduledStudentExamService = new ScheduledStudentExamService();
		
		List<ScheduledStudentExamEntity> scheduledStudentExamEntityList = scheduledStudentExamService.getStudentByScheduledExamId(examId);
		List<Long> studIds = new ArrayList<Long>();
		for(ScheduledStudentExamEntity ss: scheduledStudentExamEntityList){
			studIds.add(ss.getStud().getId());						
					
		}
	   Map<Long, UserEntity> ids = ofy().load().type(UserEntity.class).ids(studIds.toArray(new Long[studIds.size()]));
	   
	   List<UserEntity> outPutList = new ArrayList<UserEntity>();
		for(UserEntity stud: ids.values()){
			outPutList.add(stud);
		}
	   return outPutList;
	  
	 }

}
