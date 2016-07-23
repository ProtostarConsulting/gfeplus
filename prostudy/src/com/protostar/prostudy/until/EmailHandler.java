package com.protostar.prostudy.until;

import java.io.IOException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

public class EmailHandler {

	private static final String EMAIL_FROM_NAME = "GRF-Gandhi Vichar Sanskar Pariksha";
	private static final String EMAIL_FROM = "ganesh.lawande@protostar.co.in";
	private static final String EMAIL_NEW_SCHOOL_SUBJECT = "Gandhi Vichar Sanskar Pariksha School/College Registration!";
	private static final String EMAIL_NEW_USER_SUBJECT = "Welcome to Gandhi Research Foundation!";

	public void sendNewSchoolRegistrationEmail(
			PartnerSchoolEntity partnerSchoolEntity) throws MessagingException,
			IOException {
		Properties props = new Properties();

		Session session = Session.getDefaultInstance(props, null);

		String messageBody = "";
		messageBody = new EmailTemplateHandlerUtil()
				.registerSchoolForExamTemplate(partnerSchoolEntity);
		System.out.println("messageBody :" + messageBody);
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(EMAIL_FROM, EMAIL_FROM_NAME));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					partnerSchoolEntity.getContactDetail()
							.getHeadMasterEmailId()));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					partnerSchoolEntity.getContactDetail()
							.getCoordinatorDetail().get(0)
							.getCoordinatorEmailId()));
			message.setSubject(EMAIL_NEW_SCHOOL_SUBJECT);
			message.setContent(messageBody, "text/html");
			Transport.send(message);
		} catch (AddressException e) {
			// An email address was invalid.
			// ...
			e.printStackTrace();
		} catch (MessagingException e) {
			// There was an error contacting the Mail service.
			// ...
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
		System.out.println("messageBody :" + messageBody);
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(EMAIL_FROM, EMAIL_FROM_NAME));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					user.getEmail_id()));
			message.setSubject(EMAIL_NEW_USER_SUBJECT);
			message.setContent(messageBody, "text/html");
			Transport.send(message);
		} catch (AddressException e) {
			// An email address was invalid.
			// ...
			e.printStackTrace();
		} catch (MessagingException e) {
			// There was an error contacting the Mail service.
			// ...
			e.printStackTrace();
		}
	}

}