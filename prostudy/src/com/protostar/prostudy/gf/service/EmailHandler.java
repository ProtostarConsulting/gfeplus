package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.google.appengine.api.taskqueue.DeferredTask;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.EmailInstituteRegTask;
import com.protostar.prostudy.until.EmailValidator;
import com.protostar.prostudy.until.Sendgrid;

public class EmailHandler {

	private final Logger logger = Logger
			.getLogger(EmailHandler.class.getName());

	public void sendNewSchoolRegistrationEmail(
			PartnerSchoolEntity partnerSchoolEntity) throws MessagingException,
			IOException {
		String messageBody = "";
		messageBody = new EmailTemplateHandlerUtil()
				.registerSchoolForExamTemplate(partnerSchoolEntity);
		String coordinatorEmailId = partnerSchoolEntity.getContactDetail()
				.getCoordinatorDetail().get(0).getCoordinatorEmailId();

		Queue queue = QueueFactory.getDefaultQueue();
		queue.add(TaskOptions.Builder
				.withPayload(new SendSchoolRegEmailAsyncOperation(
						coordinatorEmailId, messageBody)));
	}

	public void sendNewUserRegistrationEmail(UserEntity user)
			throws MessagingException, IOException {

		String messageBody = "";
		messageBody = new EmailTemplateHandlerUtil()
				.createNewUserHtmlTemplate(user);
		Queue queue = QueueFactory.getDefaultQueue();
		queue.add(TaskOptions.Builder
				.withPayload(new SendUserRegEmailAsyncOperation(user
						.getEmail_id(), messageBody)));
	}

	public void sendNewInstituteUserRegistrationEmail(UserEntity user, String key) {
		String emailSubject = "Institute Registration Sucessfully";
		String messageBody = new EmailTemplateHandlerUtil()
				.newInstituteRegEmail(user);
		Queue queue = QueueFactory.getDefaultQueue();
		queue.add(TaskOptions.Builder.withPayload(new EmailInstituteRegTask(
				user.getEmail_id(), emailSubject, messageBody, key)));
	}

}

class SendSchoolRegEmailAsyncOperation implements DeferredTask {

	private static final long serialVersionUID = 1L;
	private static final String EMAIL_REPLY_TO = "gandhiexam@gandhifoundation.net";
	private static final String EMAIL_FROM_NAME = "GRF-Gandhi Vichar Sanskar Pariksha";
	private static final String EMAIL_FROM = "ganesh.lawande@protostar.co.in";
	private static final String SENDGRID_USERNAME = "";
	private static final String SENDGRID_PWD = "";
	private static final String EMAIL_NEW_SCHOOL_SUBJECT = "Gandhi Vichar Sanskar Pariksha School/College Registration!";

	String coordinatorEmailId;
	String messageBody;;

	public SendSchoolRegEmailAsyncOperation(String coordinatorEmailId,
			String messageBody) {
		this.coordinatorEmailId = coordinatorEmailId;
		this.messageBody = messageBody;
	}

	@Override
	public void run() {
		// expensive operation to be backgrounded goes here

		try {
			System.out.println("Sending Email Asysc");

			if (!EmailValidator.validate(coordinatorEmailId)) {
				return;
			}
			Properties props = new Properties();

			Session session = Session.getDefaultInstance(props, null);

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(EMAIL_FROM, EMAIL_FROM_NAME));

			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					coordinatorEmailId));

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

			System.out.println("Done---Sending Email Asysc");
		} catch (AddressException e) {
			// An email address was invalid.
			// ...
			e.printStackTrace();
		} catch (MessagingException e) {
			// There was an error contacting the Mail service.
			// ...
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

	}
}

class SendUserRegEmailAsyncOperation implements DeferredTask {

	private static final long serialVersionUID = 1L;
	private static final String EMAIL_REPLY_TO = "gandhiexam@gandhifoundation.net";
	private static final String EMAIL_FROM_NAME = "GRF-Gandhi Vichar Sanskar Pariksha";
	private static final String EMAIL_FROM = "ganesh.lawande@protostar.co.in";
	private static final String SENDGRID_USERNAME = "";
	private static final String SENDGRID_PWD = "";
	private static final String EMAIL_NEW_USER_SUBJECT = "Welcome to Gandhi Research Foundation!";

	String userEmailId;
	String messageBody;;

	public SendUserRegEmailAsyncOperation(String userEmailId, String messageBody) {
		this.userEmailId = userEmailId;
		this.messageBody = messageBody;
	}

	@Override
	public void run() {
		// expensive operation to be backgrounded goes here

		try {
			System.out.println("Sending Email Asysc");

			if (!EmailValidator.validate(userEmailId)) {
				return;
			}
			Properties props = new Properties();

			Session session = Session.getDefaultInstance(props, null);

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(EMAIL_FROM, EMAIL_FROM_NAME));
			/*
			 * if (EmailValidator.validate(headMasterEmailId)) {
			 * message.addRecipient(Message.RecipientType.TO, new
			 * InternetAddress(headMasterEmailId)); }
			 */

			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					userEmailId));
			message.setReplyTo(new javax.mail.Address[] { new javax.mail.internet.InternetAddress(
					EMAIL_REPLY_TO) });
			message.setSubject(EMAIL_NEW_USER_SUBJECT);
			message.setContent(messageBody, "text/html");

			// Transport.send(message); //Commented this line to not use Google
			// Mail API. Now using SendGrid API below;

			// Send grid email
			Sendgrid sendGridMail = new Sendgrid(SENDGRID_USERNAME,
					SENDGRID_PWD);
			sendGridMail.setTo(userEmailId).setFrom(EMAIL_REPLY_TO)
					.setSubject(EMAIL_NEW_USER_SUBJECT).setText(messageBody)
					.setHtml(messageBody);
			sendGridMail.send();

			System.out.println("Done---Sending Email Asysc");
		} catch (AddressException e) {
			// An email address was invalid.
			// ...
			e.printStackTrace();
		} catch (MessagingException e) {
			// There was an error contacting the Mail service.
			// ...
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

	}

}