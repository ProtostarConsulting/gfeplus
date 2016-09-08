package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.EmailValidator;
import com.protostar.prostudy.until.Sendgrid;

public class EmailHandler {

	private static final String EMAIL_REPLY_TO = "gandhiexam@gandhifoundation.net";

	private final Logger logger = Logger
			.getLogger(EmailHandler.class.getName());

	private static final String EMAIL_FROM_NAME = "GRF-Gandhi Vichar Sanskar Pariksha";
	private static final String EMAIL_FROM = "ganesh.lawande@protostar.co.in";
	private static final String SENDGRID_USERNAME = "ganesh.lawande@protostar.co.in";
	private static final String SENDGRID_PWD = "sangram12";
	private static final String EMAIL_NEW_SCHOOL_SUBJECT = "Gandhi Vichar Sanskar Pariksha School/College Registration!";
	private static final String EMAIL_NEW_USER_SUBJECT = "Welcome to Gandhi Research Foundation!";

	public void sendNewSchoolRegistrationEmail(
			PartnerSchoolEntity partnerSchoolEntity) throws MessagingException,
			IOException {

		try {
			String headMasterEmailId = partnerSchoolEntity.getContactDetail()
					.getHeadMasterEmailId();
			String coordinatorEmailId = partnerSchoolEntity.getContactDetail()
					.getCoordinatorDetail().get(0).getCoordinatorEmailId();
			if (!EmailValidator.validate(headMasterEmailId)
					&& !EmailValidator.validate(coordinatorEmailId)) {
				return;
			}
			Properties props = new Properties();

			Session session = Session.getDefaultInstance(props, null);

			String messageBody = "";
			messageBody = new EmailTemplateHandlerUtil()
					.registerSchoolForExamTemplate(partnerSchoolEntity);
			logger.info("messageBody :" + messageBody);

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(EMAIL_FROM, EMAIL_FROM_NAME));
			if (EmailValidator.validate(headMasterEmailId)) {
				message.addRecipient(Message.RecipientType.TO,
						new InternetAddress(headMasterEmailId));
			}
			if (EmailValidator.validate(coordinatorEmailId)) {
				message.addRecipient(Message.RecipientType.TO,
						new InternetAddress(coordinatorEmailId));

			}
			message.setReplyTo(new javax.mail.Address[] { new javax.mail.internet.InternetAddress(
					EMAIL_REPLY_TO) });
			message.setSubject(EMAIL_NEW_SCHOOL_SUBJECT);
			message.setContent(messageBody, "text/html");

			// Transport.send(message); //Commented this line to not use Google
			// Mail API. Now using SendGrid API below;

			// Send grid email
			Sendgrid sendGridMail = new Sendgrid(SENDGRID_USERNAME,
					SENDGRID_PWD);
			sendGridMail.setTo(coordinatorEmailId).setFrom(EMAIL_REPLY_TO)
					.setSubject(EMAIL_NEW_SCHOOL_SUBJECT).setText(messageBody)
					.setHtml(messageBody);
			sendGridMail.send();

		} catch (AddressException e) {
			// An email address was invalid.
			// ...
			e.printStackTrace();
		} catch (MessagingException e) {
			// There was an error contacting the Mail service.
			// ...
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void sendNewUserRegistrationEmail(UserEntity user)
			throws MessagingException, IOException {
		Properties props = new Properties();

		Session session = Session.getDefaultInstance(props, null);

		String messageBody = "";
		messageBody = new EmailTemplateHandlerUtil()
				.createNewUserHtmlTemplate(user);
		logger.info("messageBody :" + messageBody);
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(EMAIL_FROM, EMAIL_FROM_NAME));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					user.getEmail_id()));
			message.setSubject(EMAIL_NEW_USER_SUBJECT);
			message.setContent(messageBody, "text/html");
			// Transport.send(message); //Commented this line to not use Google
			// Mail API. Now using SendGrid API below;

			// Send grid email
			Sendgrid sendGridMail = new Sendgrid(SENDGRID_USERNAME,
					SENDGRID_PWD);
			sendGridMail.setTo(user.getEmail_id()).setFrom(EMAIL_REPLY_TO)
					.setSubject(EMAIL_NEW_USER_SUBJECT).setText(messageBody)
					.setHtml(messageBody);
			sendGridMail.send();

		} catch (AddressException e) {
			// An email address was invalid.
			// ...
			e.printStackTrace();
			logger.warning(e.getMessage() + e.getStackTrace());
		} catch (MessagingException e) {
			logger.warning(e.getMessage() + e.getStackTrace());
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}