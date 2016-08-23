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
import com.google.appengine.api.memcache.MemcacheService;
import com.google.appengine.api.memcache.MemcacheServiceFactory;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.gf.entity.ExamDetail;
import com.protostar.prostudy.gf.entity.NotificationData;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.data.UtilityService;

@Api(name = "partnerSchoolService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class PartnerSchoolService {

	private static final String CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KEY = "CurrentYearSchoolAndStudentCount";
	private final Logger logger = Logger.getLogger(PartnerSchoolService.class
			.getName());
	private boolean notificationEnabled = true;

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

	public ExamDetail getExamDeatilByCurretnYear(
			PartnerSchoolEntity partnerSchoolEntity) {
		ExamDetail currentYearExamDetail = null;

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

	@ApiMethod(name = "getPSchoolByPSID", path = "getPSchoolByPSID")
	public PartnerSchoolEntity getPSchoolByPSID(@Named("id") Long id) {

		PartnerSchoolEntity pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).id(id).now();
		return pSchool;

	}

	@ApiMethod(name = "getCurrentYearSchoolAndStudentCount", path = "getCurrentYearSchoolAndStudentCount")
	public SchoolAndStudentCount getCurrentYearSchoolAndStudentCount() {

		SchoolAndStudentCount schoolAndStudentCount = new SchoolAndStudentCount();
		MemcacheService memcacheService = MemcacheServiceFactory
				.getMemcacheService();
		Object object = memcacheService
				.get(CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KEY);

		if (object instanceof SchoolAndStudentCount) {
			schoolAndStudentCount = (SchoolAndStudentCount) object;
		}

		return schoolAndStudentCount;

	}

	@ApiMethod(name = "updateCurrentYearSchoolAndStudentCount", path = "updateCurrentYearSchoolAndStudentCount")
	public void updateCurrentYearSchoolAndStudentCount() {

		SchoolAndStudentCount schoolAndStudentCount = new SchoolAndStudentCount();
		MemcacheService memcacheService = MemcacheServiceFactory
				.getMemcacheService();
		Object object = memcacheService
				.get(CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KEY);

		if (object instanceof SchoolAndStudentCount) {
			schoolAndStudentCount = (SchoolAndStudentCount) object;
		}

		long schoolCount = 0;
		long studentCount = 0;

		/*
		 * List<PartnerSchoolEntity> list = ofy() .load()
		 * .type(PartnerSchoolEntity.class) .filter("lastModifiedDate >=",
		 * schoolAndStudentCount.getLastModifiedDate()).list();
		 */
		List<PartnerSchoolEntity> list = ofy().load()
				.type(PartnerSchoolEntity.class).list();
		schoolCount = ofy().load().type(PartnerSchoolEntity.class).count();
		logger.info("list: " + list);
		logger.info("list.size(): " + (list == null ? "null" : list.size()));
		for (PartnerSchoolEntity schoolEntity : list) {
			ExamDetail examDeatilByCurretnYear = getExamDeatilByCurretnYear(schoolEntity);
			if (examDeatilByCurretnYear != null) {
				try {
					studentCount += Long.parseLong(examDeatilByCurretnYear
							.getTotal());
				} catch (Exception ex) {
					logger.warning("updateCurrentYearSchoolAndStudentCount: "
							+ ex.getMessage());
				}
			}
		}
		logger.info("schoolCount: " + schoolCount);
		logger.info("studentCount: " + studentCount);
		schoolAndStudentCount.setSchoolCount(schoolCount);
		/*
		 * schoolAndStudentCount.setStudentcount(schoolAndStudentCount
		 * .getStudentcount() + studentCount);
		 */
		schoolAndStudentCount.setStudentcount(studentCount);

		schoolAndStudentCount.setLastModifiedDate(new Date());

		memcacheService.put(CURRENT_YEAR_SCHOOL_AND_STUDENT_COUNT_KEY,
				schoolAndStudentCount);
	}

	@ApiMethod(name = "getPartnerByInstitute")
	public List<PartnerSchoolEntity> getPartnerByInstitute(
			@Named("instituteID") Long id) {
		List<PartnerSchoolEntity> pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).filter("instituteID", id)
				.list();

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
		long studentcount;
		private Date lastModifiedDate = new Date(System.currentTimeMillis()
				- (long) 365 * 24 * 60 * 60 * 1000);

		public long getSchoolCount() {
			return schoolCount;
		}

		public void setSchoolCount(long schoolCount) {
			this.schoolCount = schoolCount;
		}

		public long getStudentcount() {
			return studentcount;
		}

		public void setStudentcount(long studentcount) {
			this.studentcount = studentcount;
		}

		public Date getLastModifiedDate() {
			return lastModifiedDate;
		}

		public void setLastModifiedDate(Date lastModifiedDate) {
			this.lastModifiedDate = lastModifiedDate;
		}

	}

}// end of ChapterService

