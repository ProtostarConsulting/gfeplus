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
import com.protostar.prostudy.entity.StudSubEntity;
import com.protostar.prostudy.entity.SubjectEntity;

@Api(name = "studentService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class SubjectService {

	@ApiMethod(name = "addSubject")
	public void addSubject(SubjectEntity sub) {
		Key<SubjectEntity> now = ofy().save().entity(sub).now();
	}

	@ApiMethod(name = "getSubject")
	public List<SubjectEntity> getStandard() {
		return ofy().load().type(SubjectEntity.class).list();
	}

	@ApiMethod(name = "getSubjectByDivision")
	 public List<SubjectEntity> getSubjectByDivision(@Named("divisionID") Long divisionID) {
		System.out.println("inside getSubjectByDivision");
	  List<SubjectEntity> divisionList = ofy().load().type(SubjectEntity.class).filter("divisionID", divisionID).list();
	  return divisionList;
	  
	 }
	
	@ApiMethod(name = "editSubject")
	public void editSubject(SubjectEntity subject) {
		Key<SubjectEntity> now = ofy().save().entity(subject).now();
	}

	@ApiMethod(name = "getSubjectsByStudentID", path="getSubjectsByStudentID")
	 public List<SubjectEntity> getSubjectsByStudentID(@Named("id") Long studID) {
			
		StudSubService studSubService = new StudSubService();
		
		List<StudSubEntity> studSubEntityList = studSubService.getSubByStudId(studID);
		List<Long> subIds = new ArrayList<Long>();
		for(StudSubEntity ss: studSubEntityList){
			subIds.add(ss.getSubID().getId());
		}
	   Map<Long, SubjectEntity> ids = ofy().load().type(SubjectEntity.class).ids(subIds.toArray(new Long[subIds.size()]));
	   
	   List<SubjectEntity> outPutList = new ArrayList<SubjectEntity>();
		for(SubjectEntity sub: ids.values()){
			outPutList.add(sub);
		}
	   return outPutList;
	  
	 }
	
}