package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

import javax.mail.MessagingException;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.data.UtilityService;

@Api(name = "partnerSchoolService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class PartnerSchoolService {

	private final Logger logger = Logger.getLogger(PartnerSchoolService.class
			.getName());
	private boolean notificationEnabled = false;

	@ApiMethod(name = "addPartnerSchool")
	public PartnerSchoolEntity addPartnerSchool(
			PartnerSchoolEntity partnerSchoolEntity) throws MessagingException,
			IOException {

		String nextPRN = UtilityService.getNextPRN("P");
		partnerSchoolEntity.setAutoGenerated(nextPRN);

		logger.info("###Inside addPartnerSchool###");
		ofy().save().entity(partnerSchoolEntity).now();
		
		//Do post processing like notifications.
		if (!notificationEnabled){
			logger.warning("### Notification is disabled. Ignoring Email and SME ###");
		}
		
		if (notificationEnabled
				&& partnerSchoolEntity.getExamDetailList() != null
				&& partnerSchoolEntity.getExamDetailList().size() > 0) {
			// Send email
			new EmailHandler()
					.sendNewSchoolRegistrationEmail(partnerSchoolEntity);
			// Send SMS
			String smsMsg = "Thanks for participating in Gandhi Vichar Sanskar Pariksha. Its Regd. No. is:"
					+ partnerSchoolEntity.getAutoGenerated()
					+ ". From onward, you may refer this number on each correspondence.";
			//smsMsg = "Hi from GVSP";
			/*
			 * + partnerSchoolEntity.getExamDetailList().get(0).getTotal() +
			 * ". For any query, email to gandhiexam@gandhifoundation.net";
			 */
			/*
			 * String cordinatorMobileNumber =
			 * partnerSchoolEntity.getContactDetail() .getHeadMasterMobile();
			 */
			// Send email to first cordinator
			String cordinatorMobileNumber = (partnerSchoolEntity
					.getContactDetail().getCoordinatorDetail() != null && partnerSchoolEntity
					.getContactDetail().getCoordinatorDetail().size() > 0) ? partnerSchoolEntity
					.getContactDetail().getCoordinatorDetail().get(0)
					.getCoordinatorMobileNum()
					: null;
			TextLocalSMSHandler.sendSms(smsMsg, cordinatorMobileNumber);

		}
		return partnerSchoolEntity;
	}

	@ApiMethod(name = "getPSchoolByPSID", path = "getPSchoolByPSID")
	public PartnerSchoolEntity getPSchoolByPSID(@Named("id") Long id) {

		PartnerSchoolEntity pSchool = ofy().load()
				.type(PartnerSchoolEntity.class).id(id).now();
		return pSchool;

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

}// end of ChapterService

