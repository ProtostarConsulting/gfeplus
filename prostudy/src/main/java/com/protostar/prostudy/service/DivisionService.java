package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.DivisionEntity;
import com.protostar.prostudy.entity.SubjectEntity;


//@ApiReference(StudentService.class)
@Api(name = "studentService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class DivisionService {

	@ApiMethod(name = "addDivision", path = "addDivision")
	public DivisionEntity addDivision(DivisionEntity div) {
		DivisionEntity now = div;
		ofy().save().entity(div).now();
		return now;
	}

	@ApiMethod(name = "getDivisions", path = "getDivisions")
	public List<DivisionEntity> getStandard() {
		return ofy().load().type(DivisionEntity.class).list();
	}
	@ApiMethod(name = "getDivisionById", path = "getDivisionById")
	public DivisionEntity getDivisionById(@Named("id") Long id) {
		DivisionEntity div = ofy().load().type(DivisionEntity.class)
				.id(id).now();
		return div;
	}

	@ApiMethod(name = "getSubjectsByDivName", path="getSubjectsByDivName")
	public List<SubjectEntity> getSubjectsByDivName(@Named("name") String divname) {
		List<DivisionEntity> div = ofy().load().type(DivisionEntity.class)
				.filter("name", divname).list();
		SubjectService subjectService=new SubjectService();
		List<SubjectEntity> subList = subjectService.getSubjectByDivision(div.get(0).getId());	
		
		return subList;
	}
	@ApiMethod(name = "getDivisionByStandard", path = "getDivisionByStandard")
	 public List<DivisionEntity> getDivisionByStandard(@Named("standardID") Long standardID) {
		System.out.println("inside getDivisionByStandard");
	  List<DivisionEntity> divisionList = ofy().load().type(DivisionEntity.class).filter("standardID", standardID).list();
	  return divisionList;
	  
	 }
	
	@ApiMethod(name = "editDivision", path = "editDivision")
	public void editDivision(DivisionEntity division) {
		Key<DivisionEntity> now = ofy().save().entity(division).now();
	}
	
}