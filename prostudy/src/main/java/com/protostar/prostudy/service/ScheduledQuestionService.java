package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.ScheduledQuestionEntity;

@Api(name = "scheduledQuestionService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class ScheduledQuestionService {	
	
	@ApiMethod(name = "addQuestion")
	public ScheduledQuestionEntity addQuestion(ScheduledQuestionEntity ques) {
		ScheduledQuestionEntity now = ques;
		ofy().save().entity(ques).now();
		return now;
	}

	@ApiMethod(name = "getQuestions")
	public List<ScheduledQuestionEntity> getQuestions() {
		return ofy().load().type(ScheduledQuestionEntity.class).list();
	}
	@ApiMethod(name = "getQuestionsByInstitute")
	public List<ScheduledQuestionEntity> getQuestionsByInstitute(
			@Named("instituteID") Long instituteID) {
		System.out.println("inside getQuestionsByInstitute");
		List<ScheduledQuestionEntity> questionsList = ofy().load()
				.type(ScheduledQuestionEntity.class).filter("instituteID", instituteID)
				.list();
		return questionsList;

	}
	@ApiMethod(name = "getQuestionByID")
	public ScheduledQuestionEntity getQuestionByID(@Named("id") Long QId) {
		ScheduledQuestionEntity question = ofy().load().type(ScheduledQuestionEntity.class)
				.id(QId).now();
		return question;
	}// end of getQuestionByID
	

	@ApiMethod(name = "updateQuestion")
	public ScheduledQuestionEntity updateQuestion(ScheduledQuestionEntity ques) {
		ScheduledQuestionEntity now = ques;
		ofy().save().entity(ques).now();
		System.out.println("inside update Q now" + now);
		return now;
	}

}
