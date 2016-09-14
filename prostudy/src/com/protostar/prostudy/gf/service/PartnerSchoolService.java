package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.mail.MessagingException;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.memcache.MemcacheService;
import com.google.appengine.api.memcache.MemcacheServiceFactory;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.gf.entity.ExamDetail;
import com.protostar.prostudy.gf.entity.NotificationData;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.data.UtilityService;

@Api(name = "partnerSchoolService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class PartnerSchoolService {

	private static final String CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KIND = "CurrentYearSchoolAndStudentCount";
	private static final String CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KEY = "1";
	private final Logger logger = Logger.getLogger(PartnerSchoolService.class
			.getName());
	public static boolean notificationEnabled = true;
	private Entity schoolAndStudentCountEntity = new Entity(
			CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KIND,
			CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KEY);;

	// private boolean notificationEnabled = false;

	@ApiMethod(name = "addPartnerSchool")
	public PartnerSchoolEntity addPartnerSchool(
			PartnerSchoolEntity partnerSchoolEntity) throws MessagingException,
			IOException {

		logger.info("###Inside addPartnerSchool###");

		if (partnerSchoolEntity.getAutoGenerated() == null
				|| partnerSchoolEntity.getAutoGenerated().isEmpty()) {
			String nextPRN = UtilityService.getNextPRN("P");
			partnerSchoolEntity.setAutoGenerated(nextPRN);
		}

		// Do post processing like notifications.
		if (!notificationEnabled) {
			logger.warning("### Notification is disabled. Ignoring Email and SME ###");
		}
		ExamDetail examDeatil = getExamDeatilByCurretnYear(partnerSchoolEntity);
		if (notificationEnabled
				&& examDeatil != null
				&& examDeatil.getNotificationData().getRegistrationSmsSent() == 0
				&& partnerSchoolEntity.getExamDetailList() != null
				&& partnerSchoolEntity.getExamDetailList().size() > 0
				&& partnerSchoolEntity.getContactDetail() != null
				&& partnerSchoolEntity.getContactDetail()
						.getCoordinatorDetail() != null
				&& partnerSchoolEntity.getContactDetail()
						.getCoordinatorDetail().size() > 0
				&& partnerSchoolEntity.getContactDetail()
						.getCoordinatorDetail().get(0)
						.getCoordinatorMobileNum() != null
				&& !partnerSchoolEntity.getContactDetail()
						.getCoordinatorDetail().get(0)
						.getCoordinatorMobileNum().isEmpty()) {
			// Send email
			new EmailHandler()
					.sendNewSchoolRegistrationEmail(partnerSchoolEntity);
			// Send SMS
			String smsMsg = "Thanks for participating in Gandhi Vichar Sanskar Pariksha. Its Regd. No. is:"
					+ partnerSchoolEntity.getAutoGenerated()
					+ ". From onward, you may refer this number on each correspondence.";

			String cordinatorMobileNumber = (partnerSchoolEntity
					.getContactDetail().getCoordinatorDetail() != null && partnerSchoolEntity
					.getContactDetail().getCoordinatorDetail().size() > 0) ? partnerSchoolEntity
					.getContactDetail().getCoordinatorDetail().get(0)
					.getCoordinatorMobileNum()
					: null;
			TextLocalSMSHandler.sendSms(smsMsg, cordinatorMobileNumber);
			examDeatil.getNotificationData().setRegistrationEmailSent(1);
			examDeatil.getNotificationData().setRegistrationSmsSent(1);

		}

		partnerSchoolEntity.setLastModifiedDate(new Date());
		Key<PartnerSchoolEntity> now = ofy().save().entity(partnerSchoolEntity)
				.now();
		partnerSchoolEntity.setId(now.getId());

		return partnerSchoolEntity;
	}

	public static ExamDetail getExamDeatilByCurretnYear(
			PartnerSchoolEntity partnerSchoolEntity) {
		ExamDetail currentYearExamDetail = null;

		if (partnerSchoolEntity == null)
			return null;
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		Integer year = cal.get(Calendar.YEAR);
		String currentYear = "".concat(year.toString()).concat("-")
				.concat("" + (year - 1999));

		for (ExamDetail exam : partnerSchoolEntity.getExamDetailList()) {
			if (currentYear.equals(exam.getYearOfExam())) {
				currentYearExamDetail = exam;
				break;
			}
		}

		if (currentYearExamDetail != null
				&& currentYearExamDetail.getNotificationData() == null) {
			currentYearExamDetail.setNotificationData(new NotificationData());
		}

		return currentYearExamDetail;

	}

	@ApiMethod(name = "getCurrentYearSchoolAndStudentCount", path = "getCurrentYearSchoolAndStudentCount")
	public SchoolAndStudentCount getCurrentYearSchoolAndStudentCount() {

		SchoolAndStudentCount schoolAndStudentCount = new SchoolAndStudentCount();
		MemcacheService memcacheService = MemcacheServiceFactory
				.getMemcacheService();
		Object cacheObject = memcacheService.get(schoolAndStudentCountEntity
				.getKey());

		if (cacheObject != null && cacheObject instanceof SchoolAndStudentCount) {
			schoolAndStudentCount = (SchoolAndStudentCount) cacheObject;
		} else {
			DatastoreService datastore = DatastoreServiceFactory
					.getDatastoreService();

			try {
				schoolAndStudentCountEntity = datastore
						.get(schoolAndStudentCountEntity.getKey());
				schoolAndStudentCount
						.setSchoolCount((Long) schoolAndStudentCountEntity
								.getProperty("schoolCount"));
				schoolAndStudentCount
						.setCollegeCount((Long) schoolAndStudentCountEntity
								.getProperty("collegeCount"));
				schoolAndStudentCount
						.setSchoolStudentcount((Long) schoolAndStudentCountEntity
								.getProperty("schoolStudentcount"));
				schoolAndStudentCount
						.setCollegeStudentcount((Long) schoolAndStudentCountEntity
								.getProperty("collegeStudentcount"));
				schoolAndStudentCount.setLastModifiedDate(new Date(
						(Long) schoolAndStudentCountEntity
								.getProperty("lastModifiedDate")));
			} catch (EntityNotFoundException e) {
				e.printStackTrace();
			}
		}

		return schoolAndStudentCount;

	}

	@ApiMethod(name = "updateCurrentYearSchoolAndStudentCount", path = "updateCurrentYearSchoolAndStudentCount")
	public void updateCurrentYearSchoolAndStudentCount() {

		long schoolCount = 0;
		long collegeCount = 0;
		long schoolStudentcount = 0;
		long collegeStudentcount = 0;

		List<PartnerSchoolEntity> list = ofy().load()
				.type(PartnerSchoolEntity.class).list();
		// schoolCount = ofy().load().type(PartnerSchoolEntity.class).count();
		logger.info("list: " + list);
		logger.info("list.size(): " + (list == null ? "null" : list.size()));
		for (PartnerSchoolEntity schoolEntity : list) {
			long studNumbers = 0;
			try {
				ExamDetail examDeatilByCurretnYear = getExamDeatilByCurretnYear(schoolEntity);
				if (examDeatilByCurretnYear != null
						&& !examDeatilByCurretnYear.getTotal().isEmpty()) {
					try {
						studNumbers = Long.parseLong(examDeatilByCurretnYear
								.getTotal());
					} catch (Exception ex) {
						logger.warning("updateCurrentYearSchoolAndStudentCount: "
								+ ex.getMessage());
					}
				}

				if (schoolEntity.getCategory()
						.equals("School & Junior College")) {
					schoolCount++;
					schoolStudentcount += studNumbers;
				} else {
					collegeCount++;
					collegeStudentcount += studNumbers;
				}
			} catch (Exception ex) {
				logger.warning("ex: " + ex.getMessage());
				continue;
			}
		}
		logger.info("schoolCount: " + schoolCount);
		logger.info("schoolStudentcount: " + schoolStudentcount);

		SchoolAndStudentCount schoolAndStudentCount = new SchoolAndStudentCount();

		schoolAndStudentCount.setSchoolCount(schoolCount);
		schoolAndStudentCount.setSchoolStudentcount(schoolStudentcount);
		schoolAndStudentCount.setCollegeCount(collegeCount);
		schoolAndStudentCount.setCollegeStudentcount(collegeStudentcount);
		schoolAndStudentCount.setLastModifiedDate(new Date());

		MemcacheService memcacheService = MemcacheServiceFactory
				.getMemcacheService();
		DatastoreService datastore = DatastoreServiceFactory
				.getDatastoreService();

		schoolAndStudentCountEntity.setProperty("schoolCount", schoolCount);
		schoolAndStudentCountEntity.setProperty("collegeCount", collegeCount);
		schoolAndStudentCountEntity.setProperty("schoolStudentcount",
				schoolStudentcount);
		schoolAndStudentCountEntity.setProperty("collegeStudentcount",
				collegeStudentcount);
		schoolAndStudentCountEntity.setProperty("lastModifiedDate",
				schoolAndStudentCount.getLastModifiedDate().getTime());

		memcacheService.put(schoolAndStudentCountEntity.getKey(),
				schoolAndStudentCount);
		datastore.put(schoolAndStudentCountEntity);
	}

	@ApiMethod(name = "getPSchoolByPSID", path = "getPSchoolByPSID")
	public PartnerSchoolEntity getPSchoolByPSID(@Named("id") Long id) {

		PartnerSchoolEntity pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).id(id).now();
		return pSchool;

	}

	@ApiMethod(name = "getPartnerByInstitute", path = "getPartnerByInstitute")
	public List<PartnerSchoolEntity> getPartnerByInstitute(
			@Named("instituteID") Long id) {
		List<PartnerSchoolEntity> pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).filter("instituteID", id)
				.order("autoGenerated").list();

		return pSchool;
	}

	@ApiMethod(name = "getSchoolByAutoGeneratedID")
	public PartnerSchoolEntity getSchoolByAutoGeneratedID(
			@Named("autoGenerated") String autoGenerated) {
		PartnerSchoolEntity pSchool = ofy().load()
				.type(PartnerSchoolEntity.class)
				.filter("autoGenerated", autoGenerated).first().now();
		return pSchool;
	}

	static class SchoolAndStudentCount implements Serializable {
		private static final long serialVersionUID = 1L;
		long schoolCount;
		long collegeCount;
		long schoolStudentcount;
		long collegeStudentcount;

		private Date lastModifiedDate = new Date(System.currentTimeMillis()
				- (long) 365 * 24 * 60 * 60 * 1000);

		public SchoolAndStudentCount() {

		}

		public SchoolAndStudentCount(long schoolCount, long collegeCount,
				long schoolStudentcount, long collegeStudentcount,
				long lastModifiedDate) {
			this.schoolCount = schoolCount;
			this.collegeCount = collegeCount;
			this.schoolStudentcount = schoolStudentcount;
			this.collegeStudentcount = collegeStudentcount;
			this.lastModifiedDate = new Date(lastModifiedDate);
		}

		public long getSchoolCount() {
			return schoolCount;
		}

		public void setSchoolCount(long schoolCount) {
			this.schoolCount = schoolCount;
		}

		public long getCollegeCount() {
			return collegeCount;
		}

		public void setCollegeCount(long collegeCount) {
			this.collegeCount = collegeCount;
		}

		public long getSchoolStudentcount() {
			return schoolStudentcount;
		}

		public void setSchoolStudentcount(long schoolStudentcount) {
			this.schoolStudentcount = schoolStudentcount;
		}

		public long getCollegeStudentcount() {
			return collegeStudentcount;
		}

		public void setCollegeStudentcount(long collegeStudentcount) {
			this.collegeStudentcount = collegeStudentcount;
		}

		public Date getLastModifiedDate() {
			return lastModifiedDate;
		}

		public void setLastModifiedDate(Date lastModifiedDate) {
			this.lastModifiedDate = lastModifiedDate;
		}

	}

}// end of ChapterService

