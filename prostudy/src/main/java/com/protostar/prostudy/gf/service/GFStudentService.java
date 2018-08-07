package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

import javax.mail.MessagingException;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.api.datastore.QueryResultIterator;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.cmd.Query;
import com.protostar.prostudy.entity.BookEntity;
import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.gf.entity.GFExamResultEntity;
import com.protostar.prostudy.gf.entity.GFStudentEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.data.Constants;
import com.protostar.prostudy.until.data.EntityPagingInfo;
import com.protostar.prostudy.until.data.EntityUtil;
import com.protostar.prostudy.until.data.GFExamResultEntityList;
import com.protostar.prostudy.until.data.SequenceGeneratorShardedService;

@Api(name = "gfStudentService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class GFStudentService {

	private final Logger logger = Logger.getLogger(GFStudentService.class
			.getName());

	@ApiMethod(name = "addGFStudent", path = "addGFStudent")
	public GFStudentEntity addGFStudent(GFStudentEntity gfStudentEntity) {

		if (gfStudentEntity.getPrn() == null
				|| gfStudentEntity.getPrn().isEmpty()) {
			SequenceGeneratorShardedService sequenceGenerator = new SequenceGeneratorShardedService(
					EntityUtil.getInstituteEntityRawKey(gfStudentEntity
							.getInstituteID()),
					Constants.STUDENT_REGISTRATION_NO_COUNTER);
			Long nextSequenceNumber = sequenceGenerator.getNextSequenceNumber();
			gfStudentEntity.setPrn(nextSequenceNumber.toString());
			gfStudentEntity.setCreatedDate(new Date());
		}

		gfStudentEntity.setModifiedDate(new Date());
		ofy().save().entity(gfStudentEntity).now();
		return gfStudentEntity;

	}

	@ApiMethod(name = "getGFStudentsByInstitute", path = "getGFStudentsByInstitute")
	public List<GFStudentEntity> getGFStudentsByInstitute(
			@Named("instituteID") long instituteID) {

		List<GFStudentEntity> list = ofy().load().type(GFStudentEntity.class)
				.list();

		return list;

	}

	@ApiMethod(name = "getGFStudentById", path = "getGFStudentById")
	public GFStudentEntity getGFStudentById(@Named("id") long studID) {
		GFStudentEntity stud = ofy().load().type(GFStudentEntity.class)
				.id(studID).now();

		return stud;

	}

	@ApiMethod(name = "addExamResults")
	public GFExamResultEntityList addExamResults(
			GFExamResultEntityList resultList) throws MessagingException,
			IOException {

		ofy().save().entities(resultList.getList()).now();
		logger.info("Saved list using entities method");

		PartnerSchoolService partnerSchoolService = new PartnerSchoolService();
		partnerSchoolService.addPartnerSchool(resultList.getSchool());

		return resultList;
	}

	@ApiMethod(name = "getExamResultEntities", path = "getExamResultEntities")
	public List<GFExamResultEntity> getExamResultEntities(
			@Named("instituteID") Long id) {
		List<GFExamResultEntity> resultList = ofy().load()
				.type(GFExamResultEntity.class).project("school")
				.distinct(true).list();
		logger.info("getExamResultEntities:resultList:" + resultList.size());
		return resultList;
	}

	@ApiMethod(name = "getPendingResultSchools", path = "getPendingResultSchools")
	public List<PartnerSchoolEntity> getPendingResultSchools() {

		List<PartnerSchoolEntity> schoolList = ofy().load()
				.type(PartnerSchoolEntity.class).list();
		List<PartnerSchoolEntity> pendingSchoolList = new ArrayList();
		/*
		 * List<GFExamResultEntity> examResultList = ofy().load()
		 * .type(GFExamResultEntity.class).list();
		 */
		List<GFExamResultEntity> examResultList = ofy().load()
				.type(GFExamResultEntity.class).project("school")
				.distinct(true).list();
		List<Long> resultSchoolIds = new ArrayList<Long>(examResultList.size());
		for (GFExamResultEntity result : examResultList) {
			resultSchoolIds.add(result.getSchool().getId());
		}

		for (PartnerSchoolEntity currentSchool : schoolList) {
			if (!resultSchoolIds.contains(currentSchool.getId())) {
				pendingSchoolList.add(currentSchool);
			}
		}
		return pendingSchoolList;
	}

	@ApiMethod(name = "fetchExamResultPendingByPaging", path = "fetchExamResultPendingByPaging")
	public EntityPagingInfo fetchExamResultPendingByPaging(
			@Named("instituteID") Long instituteID, @Named("yearOfExam") String yearOfExam, EntityPagingInfo pagingInfo) {

		Query<GFExamResultEntity> resultQuery = ofy().load()
				.type(GFExamResultEntity.class).filter("examYear",yearOfExam).project("school")
				.distinct(true);
		List<GFExamResultEntity> examResultList = resultQuery.list();
		List<Long> resultSchoolIds = new ArrayList<Long>(examResultList.size());
		for (GFExamResultEntity result : examResultList) {
			resultSchoolIds.add(result.getSchool().getId());
		}

		Query<PartnerSchoolEntity> totalSchoolsQuery = ofy().load().type(
				PartnerSchoolEntity.class);

		int totalCount = totalSchoolsQuery.count() - resultQuery.count();

		if (pagingInfo.getWebSafeCursorString() != null)
			totalSchoolsQuery = totalSchoolsQuery.startAt(Cursor
					.fromWebSafeString(pagingInfo.getWebSafeCursorString()));

		List<GFExamResultEntity> examResultListToReturn = new ArrayList<GFExamResultEntity>();
		QueryResultIterator<PartnerSchoolEntity> iterator = totalSchoolsQuery
				.iterator();
		while (iterator.hasNext()) {
			PartnerSchoolEntity currentSchool = iterator.next();
			if (!resultSchoolIds.contains(currentSchool.getId())) {
				GFExamResultEntity e = new GFExamResultEntity();
				e.setSchool(currentSchool);
				examResultListToReturn.add(e);

				if (examResultListToReturn.size() == pagingInfo.getLimit()) {
					break;
				}
			}

		}

		Cursor cursor = iterator.getCursor();
		pagingInfo.setEntityList(examResultListToReturn);
		pagingInfo.setWebSafeCursorString(cursor.toWebSafeString());
		pagingInfo.setTotalEntities(totalCount);

		return pagingInfo;
	}

	@ApiMethod(name = "getExamResultsPendingGRFReview", path = "getExamResultsPendingGRFReview")
	public List<GFExamResultEntity> getExamResultsPendingGRFReview(
			@Named("instituteID") Long id, @Named("yearOfExam") String yearOfExam) {
		List<GFExamResultEntity> resultList = ofy().load()
				.type(GFExamResultEntity.class).filter("examYear",yearOfExam).filter("grfReviewed", false)
				.project("createdDate", "school").distinct(true).list();

		Set<Long> schoolIds = new HashSet<Long>();
		List<GFExamResultEntity> examResultList = new ArrayList<GFExamResultEntity>();
		for (GFExamResultEntity next : resultList) {
			if (!schoolIds.contains(next.getSchool().getId())) {
				examResultList.add(next);
				schoolIds.add(next.getSchool().getId());
			}
		}

		logger.info("getExamResultsPendingGRFReview:examResultList:"
				+ examResultList.size());
		return examResultList;
	}

	@ApiMethod(name = "fetchExamResultByPaging", path = "fetchExamResultByPaging")
	public EntityPagingInfo fetchExamResultByPaging(
			@Named("instituteID") Long instituteID, @Named("yearOfExam") String yearOfExam, EntityPagingInfo pagingInfo) {

		/*
		 * logger.info("instituteID:" + instituteID);
		 * logger.info("pagingInfo.getWebSafeCursorString():" +
		 * pagingInfo.getWebSafeCursorString());
		 */

		Query<GFExamResultEntity> filterInstituteQuery = ofy().load()
				.type(GFExamResultEntity.class).filter("examYear",yearOfExam).project("school")
				.distinct(true);

		int totalCount = filterInstituteQuery.count();

		if (pagingInfo.getWebSafeCursorString() != null)
			filterInstituteQuery = filterInstituteQuery.startAt(Cursor
					.fromWebSafeString(pagingInfo.getWebSafeCursorString()));

		QueryResultIterator<GFExamResultEntity> iterator = filterInstituteQuery
				.order("school").order("-createdDate")
				.limit(pagingInfo.getLimit()).iterator();

		List<Long> toFetchList = new ArrayList<Long>();
		while (iterator.hasNext()) {
			GFExamResultEntity next = iterator.next();
			// this is projected, need whole object
			/*
			 * examResultList.add(ofy().load().type(GFExamResultEntity.class)
			 * .id(next.getId()).now());
			 */
			toFetchList.add(next.getId());
		}
		// this is projected, need whole object
		Collection<GFExamResultEntity> values = ofy().load()
				.type(GFExamResultEntity.class).ids(toFetchList).values();
		List<GFExamResultEntity> examResultList = new ArrayList<GFExamResultEntity>(
				values);

		Cursor cursor = iterator.getCursor();
		pagingInfo.setEntityList(examResultList);
		pagingInfo.setWebSafeCursorString(cursor.toWebSafeString());
		pagingInfo.setTotalEntities(totalCount);

		return pagingInfo;
	}

	@ApiMethod(name = "getExamResultByGRFNo", path = "getExamResultByGRFNo")
	public Collection<GFExamResultEntity> getExamResultByGRFNo(
			@Named("autoGenerated") String autoGenerated, @Named("yearOfExam") String yearOfExam) {
		ArrayList<GFExamResultEntity> resultList = new ArrayList<GFExamResultEntity>();
		List<Key<PartnerSchoolEntity>> schoolKeyList = PartnerSchoolService
				.getSchoolKyesByRegOrFormNo(autoGenerated, yearOfExam);
		if (schoolKeyList == null || schoolKeyList.size() == 0) {
			return resultList;
		}
		GFExamResultEntity now = ofy().load().type(GFExamResultEntity.class)
				.filter("school in", schoolKeyList).first().now();
		if (now != null) {
			resultList.add(now);
		}
		return resultList;
	}

	@ApiMethod(name = "searchExamResultBySchoolName", path = "searchExamResultBySchoolName")
	public List<GFExamResultEntity> searchExamResultBySchoolName(
			@Named("nameSearchString") String nameSearchString, @Named("yearOfExam") String yearOfExam) {
		ArrayList<GFExamResultEntity> resultList = new ArrayList<GFExamResultEntity>();
		List<Key<PartnerSchoolEntity>> schoolKeyList = PartnerSchoolService
				.searchSchoolKeysByName(nameSearchString, yearOfExam);

		if (schoolKeyList == null || schoolKeyList.size() == 0) {
			return resultList;
		}
		GFExamResultEntity now = ofy().load().type(GFExamResultEntity.class)
				.filter("school in", schoolKeyList).first().now();
		if (now != null) {
			resultList.add(now);
		}
		return resultList;
	}

	@ApiMethod(name = "touchAllEntities", path = "touchAllEntities")
	public void touchAllEntities() {
		List<GFExamResultEntity> courierList = ofy().load()
				.type(GFExamResultEntity.class).list();
		for (GFExamResultEntity entity : courierList) {
			entity.setModifiedDate(new Date());
		}
		ofy().save().entities(courierList).now();
	}

	@ApiMethod(name = "filterExamResults", path = "filterExamResults")
	public List<GFExamResultEntity> filterExamResults(
			@Named("standard") String standardFilter,
			@Named("dist") String distFilter) {

		standardFilter = standardFilter == null ? "" : standardFilter.trim();
		distFilter = distFilter == null ? "" : distFilter.trim();
		List<GFExamResultEntity> resultList = ofy().load()
				.type(GFExamResultEntity.class).order("-marks").list();
		// logger.info("filterExamResults:resultList:" + resultList.size());

		List<GFExamResultEntity> filterResultList = new ArrayList<GFExamResultEntity>();

		for (int i = 0; i < resultList.size(); i++) {

			GFExamResultEntity filterExamResultData = resultList.get(i);
			String currentRecordStandard = filterExamResultData.getStandard();
			String currentRecordDistrict = filterExamResultData.getSchool()
					.getAddress().getDist();

			if (!standardFilter.isEmpty()) {
				if (!currentRecordStandard.trim().equalsIgnoreCase(
						standardFilter)) {
					continue;
				}
			}

			if (distFilter.equalsIgnoreCase("All")) {
				filterResultList.add(filterExamResultData);
			}

			if (!distFilter.isEmpty()) {
				if (!currentRecordDistrict.trim().equalsIgnoreCase(distFilter)) {
					continue;
				}
			}

			filterResultList.add(filterExamResultData);
		}

		return filterResultList;
	}

	@ApiMethod(name = "serachExamResultEntitiesBySchool", path = "serachExamResultEntitiesBySchool")
	public List<GFExamResultEntity> serachExamResultEntitiesBySchool(
			PartnerSchoolEntity schoolEntity,@Named("yearOfExam") String yearOfExam) {
		logger.info("schoolEntity.schoolName:" + schoolEntity.getSchoolName());
		List<GFExamResultEntity> resultList = ofy().load()
				.type(GFExamResultEntity.class).filter("examYear", yearOfExam).filter("school", schoolEntity)
				.list();
		logger.info("serachExamResultEntitiesBySchool:resultList:"
				+ resultList.size());
		return resultList;
	}

	@ApiMethod(name = "addPracticeExamToStudent", path = "addPracticeExamToStudent")
	public void addPracticeExamToStudent(PracticeExamEntity exam) {

		String standard = exam.getStandard();
		List<GFStudentEntity> studentList = ofy().load()
				.type(GFStudentEntity.class).filter("standard", standard)
				.list();

		List<UserEntity> userListToUpdate = new ArrayList<UserEntity>();

		for (int i = 0; i < studentList.size(); i++) {
			GFStudentEntity currentStudent = studentList.get(i);
			UserEntity user = currentStudent.getUser();
			List<PracticeExamEntity> userExamList = user.getMyExams();
			if (userExamList != null) {
				boolean examAlreadyFound = false;
				for (int j = 0; j < userExamList.size(); j++) {
					if (userExamList.get(j).getId().equals(exam.getId())) {
						examAlreadyFound = true;
						break;
					}
				}
				if (!examAlreadyFound) {
					userExamList.add(exam);
					userListToUpdate.add(user);
				}
			} else {
				userExamList = new ArrayList<PracticeExamEntity>();
				userExamList.add(exam);
				user.setMyExams(userExamList);
				userListToUpdate.add(user);
			}
		}

		ofy().save().entities(userListToUpdate);

	}

	@ApiMethod(name = "addBookToStudent", path = "addBookToStudent")
	public void addBookToStudent(BookEntity book) {

		String standard = book.getStandard();

		List<GFStudentEntity> studentList = ofy().load()
				.type(GFStudentEntity.class).filter("standard", standard)
				.list();

		List<UserEntity> userListToUpdate = new ArrayList<UserEntity>();

		for (int i = 0; i < studentList.size(); i++) {
			GFStudentEntity currentStudent = studentList.get(i);
			UserEntity user = currentStudent.getUser();
			List<BookEntity> bookEntityList = user.getMyBooks();
			if (bookEntityList != null) {
				boolean alreadyFound = false;
				for (int j = 0; j < bookEntityList.size(); j++) {
					if (bookEntityList.get(j).getId().equals(book.getId())) {
						alreadyFound = true;
						break;
					}
				}

				if (!alreadyFound) {
					bookEntityList.add(book);
					userListToUpdate.add(user);
				}

			} else {
				bookEntityList = new ArrayList<BookEntity>();
				bookEntityList.add(book);
				user.setMyBooks(bookEntityList);
				userListToUpdate.add(user);
			}
		}

		ofy().save().entities(userListToUpdate);

	}
}
