package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.prostudy.entity.StudSubEntity;
import com.protostar.prostudy.entity.SubjectEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.until.data.ServerMsg;

//@Api(name = "studSubService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class StudSubService {
	
	
	@ApiMethod(name = "addStudSubject")
	public StudSubEntity addStudSubject(StudSubEntity data) {		
		Key<StudSubEntity> now2 = ofy().save().entity(data).now();
		data.setId(now2.getId());
		return data;
	}
	@ApiMethod(name = "getAllStudSubList")
	public List<StudSubEntity> getAllStudSubList() {
		return ofy().load().type(StudSubEntity.class).list();
	}

	@ApiMethod(name = "getSubByStudId", path="getSubByStudId")
	 public List<StudSubEntity> getSubByStudId(@Named("studID") Long studID) {	
	  List<StudSubEntity> subList = ofy().load().type(StudSubEntity.class).filter("studID", Ref.create(Key.create(UserEntity.class, studID))).filter("active", true).list();
	 	  return subList;	  
	 }	
	@ApiMethod(name = "getAllSubByStudId", path="getAllSubByStudId")
	 public List<StudSubEntity> getAllSubByStudId(@Named("studID") Long studID) {	
	  List<StudSubEntity> subList = ofy().load().type(StudSubEntity.class).filter("studID", Ref.create(Key.create(UserEntity.class, studID))).list();
	 	  return subList;	  
	 }	
	
	
	@ApiMethod(name = "getstudBySubId", path="getstudBySubId")
	 public List<StudSubEntity> getstudBySubId(@Named("subID") Long subID) {	
	  List<StudSubEntity> studList = ofy().load().type(StudSubEntity.class).filter("subID", Ref.create(Key.create(SubjectEntity.class, subID))).filter("active", true).list();
	 	  return studList;	  
	 }
	
	@ApiMethod(name = "getStudSubByStudIdAndSubId", path="getStudSubByStudIdAndSubId")
	 public StudSubEntity getStudSubByStudIdAndSubId(@Named("studID") Long studID,@Named("subID") Long subID) {	
	  StudSubEntity studSub = ofy().load().type(StudSubEntity.class).filter("studID", Ref.create(Key.create(UserEntity.class, studID))).filter("subID", Ref.create(Key.create(SubjectEntity.class, subID))).first().now();
	 	  return studSub;	  
	 }	

	@ApiMethod(name = "getStudentBySubject", path="getStudBySubId")
	 public List<StudSubEntity> getStudBySubId(@Named("subID") Long subID) {	
	  List<StudSubEntity> studList = ofy().load().type(StudSubEntity.class).filter("subID", Ref.create(Key.create(SubjectEntity.class, subID))).list();
	 	  return studList;	  
	 }	
	
	
	
}
