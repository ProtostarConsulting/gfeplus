package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.QuestionEntity;
import com.protostar.prostudy.entity.ScheduledExamResultEntity;

@Api(name = "scheduledExamResultService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ScheduledExamResultService {
	
	@ApiMethod(name = "addScheduledExamResult")
	public ScheduledExamResultEntity addScheduledExamResult(ScheduledExamResultEntity res) {
		ScheduledExamResultEntity now = res;
		ofy().save().entity(res).now();
		return now;
	}	
		
	@ApiMethod(name = "updateScheduledExamResult")
	public ScheduledExamResultEntity updateScheduledExamResult(ScheduledExamResultEntity res) {
		ScheduledExamResultEntity now = res;
		ofy().save().entity(res).now();
		System.out.println("inside update R now" + now);
		return now;
	}
	
	@ApiMethod(name = "getScheduledExamResult")
	public List<ScheduledExamResultEntity> getScheduledExamResult() {
		return ofy().load().type(ScheduledExamResultEntity.class).list();
	}

	
	@ApiMethod(name = "getScheduledExamResultbyEmail", path="getScheduledExamResultbyEmail")
	public List<ScheduledExamResultEntity> getScheduledExamResultbyEmail(@Named("email_id") String email_id) {
		List<ScheduledExamResultEntity> list = ofy().load().type(ScheduledExamResultEntity.class)
				.filter("email_id", email_id).list();
		return list;
	}
	
	@ApiMethod(name = "getScheduledExamResultListByExamId" , path="getScheduledExamResultListByExamId")
	public List<ScheduledExamResultEntity> getScheduledExamResultListByExamId(@Named("testID") Long testID) {
		List<ScheduledExamResultEntity> list = ofy().load().type(ScheduledExamResultEntity.class)
				.filter("testID", testID).list();
		return list;
	}
	
	@ApiMethod(name = "getScheduledExamResultbyID")
	public ScheduledExamResultEntity getScheduledExamResultbyID(@Named("id") Long id) {
		
		ScheduledExamResultEntity selected = ofy().load().type(ScheduledExamResultEntity.class).id(id).now();
		return selected;
	}

	

}
