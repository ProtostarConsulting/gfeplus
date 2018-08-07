package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.QuestionEntity;
import com.protostar.prostudy.entity.SyllabusEntity;

//@Api(name = "syllabusService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class SyllabusService {

	@ApiMethod(name = "addSyllabus")
	public void addSyllabus(SyllabusEntity in) {
		Key<SyllabusEntity> now = ofy().save().entity(in).now();
	}

	@ApiMethod(name = "getSyllabus")
	public List<SyllabusEntity> getSyllabus() {
		return ofy().load().type(SyllabusEntity.class).list();
	}

	
	@ApiMethod(name = "updateSyllabus")
	public void updateSyllabus(SyllabusEntity syllabus) {
		Key<SyllabusEntity> now = ofy().save().entity(syllabus).now();
	}
	

	@ApiMethod(name = "getSyllabusByInstitute")
	public List<SyllabusEntity> getSyllabusByInstitute(
			@Named("instituteID") Long instituteID) {
		System.out.println("inside getSyllabusByInstitute");
		List<SyllabusEntity> syllabusList = ofy().load()
				.type(SyllabusEntity.class)
				.filter("instituteID", instituteID).list();
		return syllabusList;

	}
}
