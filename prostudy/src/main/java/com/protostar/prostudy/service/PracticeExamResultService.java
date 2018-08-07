package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.PracticeExamResultEntity;
import com.protostar.prostudy.gf.entity.GFExamResultEntity;

@Api(name = "practiceExamService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class PracticeExamResultService {

	private final Logger logger = Logger
			.getLogger(PracticeExamResultService.class.getName());

	@ApiMethod(name = "addPracticeExamResult")
	public PracticeExamResultEntity addPracticeExamResult(
			PracticeExamResultEntity res) {
		if (res.getId() == null) {
			res.setCreatedDate(new Date());
		}
		res.setModifiedDate(new Date());
		ofy().save().entity(res).now();
		return res;
	}

	@ApiMethod(name = "getPracticeExamResult")
	public List<PracticeExamResultEntity> getPracticeExamResult() {
		return ofy().load().type(PracticeExamResultEntity.class).list();
	}

	@ApiMethod(name = "getPracticeExamResultbyEmail")
	public List<PracticeExamResultEntity> getPracticeExamResultbyEmail(
			@Named("email_id") String email_id) {
		List<PracticeExamResultEntity> list = ofy().load()
				.type(PracticeExamResultEntity.class)
				.filter("email_id", email_id).list();
		logger.info("list.size():" + list.size());
		return list;
	}

	@ApiMethod(name = "getPracticeExamResultbyID")
	public PracticeExamResultEntity getPracticeExamResultbyID(
			@Named("id") Long id) {

		PracticeExamResultEntity selected = ofy().load()
				.type(PracticeExamResultEntity.class).id(id).now();
		return selected;
	}

	@ApiMethod(name = "getResultByUId", path = "getResultByUId")
	public List<PracticeExamResultEntity> getResultByUId(@Named("id") Long id) {
		String uid = Long.toString(id).trim();
		List<PracticeExamResultEntity> list = ofy().load()
				.type(PracticeExamResultEntity.class).filter("userId", uid)
				.list();
		/*
		 * List<PracticeExamResultEntity> filterList = new
		 * ArrayList<PracticeExamResultEntity>(); for (int i = 0; i <
		 * list.size(); i++) { PracticeExamResultEntity resultEntity =
		 * list.get(i); if (uid.equalsIgnoreCase(resultEntity.getUserId())) {
		 * filterList.add(resultEntity); } }
		 */
		return list;

	}

	@ApiMethod(name = "getExamResultbyID")
	public GFExamResultEntity getGFExamResultDetailsbyID(@Named("id") Long id) {

		GFExamResultEntity selected = ofy().load()
				.type(GFExamResultEntity.class).id(id).now();
		return selected;
	}

}
