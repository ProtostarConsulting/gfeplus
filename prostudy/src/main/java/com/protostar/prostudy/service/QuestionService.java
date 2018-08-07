package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.QuestionEntity;

@Api(name = "questionService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class QuestionService {

	@ApiMethod(name = "addQuestion")
	public QuestionEntity addQuestion(QuestionEntity ques) {
		QuestionEntity now = ques;
		ofy().save().entity(ques).now();
		return now;
	}

	@ApiMethod(name = "getQuestion")
	public List<QuestionEntity> getQuestion() {
		return ofy().load().type(QuestionEntity.class).list();
	}

	@ApiMethod(name = "updateQuestion")
	public QuestionEntity updateQuestion(QuestionEntity ques) {
		QuestionEntity now = ques;
		ofy().save().entity(ques).now();
		System.out.println("inside update Q now" + now);
		return now;
	}

	@ApiMethod(name = "getQuestionByID")
	public QuestionEntity getQuestionByID(@Named("quesId") Long QId) {
		QuestionEntity question = ofy().load().type(QuestionEntity.class)
				.id(QId).now();
		return question;
	}// end of getQuestionByID

	@ApiMethod(name = "getQuestionsByInstitute")
	public List<QuestionEntity> getQuestionsByInstitute(
			@Named("instituteID") Long instituteID) {
		System.out.println("inside getQuestionsByInstitute");
		List<QuestionEntity> questionsList = ofy().load()
				.type(QuestionEntity.class).filter("instituteID", instituteID)
				.list();
		return questionsList;

	}
	
	@ApiMethod(name = "getQuesByClass")
	public List<QuestionEntity> getQuesByClass(@Named("instituteID") Long instituteID,@Named("standard") String standard,
			@Named("division") String division, @Named("subject") String subject) {
		List<QuestionEntity> list = ofy().load().type(QuestionEntity.class).filter("instituteID", instituteID)
				.filter("standard", standard).filter("division", division)
				.filter("subject", subject).list();
		System.out.println("inside getQuesByClass" +list);
		return list;
	}
}
