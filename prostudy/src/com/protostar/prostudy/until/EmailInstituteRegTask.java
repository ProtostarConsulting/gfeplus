package com.protostar.prostudy.until;

import java.io.IOException;

import com.google.appengine.api.taskqueue.DeferredTask;
import com.protostar.prostudy.until.data.Constants;
import com.sendgrid.Content;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Personalization;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;

public class EmailInstituteRegTask implements DeferredTask {
	
	private static final long serialVersionUID = -6243572573386324843L;
	private String toEmail;
	private String emailSubject;
	private String messageBody;
	private String key;
	
	public EmailInstituteRegTask(String toEmail, String emailSubject, String messageBody, String key) {
		this.toEmail = toEmail;
		this.emailSubject = emailSubject;
		this.messageBody = messageBody;
		this.key = key;

	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		try {
			SendGrid sg = new SendGrid(key);
			sg.addRequestHeader("X-Mock", "true");

			Request request = new Request();
			Mail taskEmail = buildEmail();

			request.method = Method.POST;
			request.endpoint = "mail/send";
			request.body = taskEmail.build();
			Response response = sg.api(request);
			System.out.println(response.statusCode);
			System.out.println(response.body);
			System.out.println(response.headers);
		} catch (IOException ex) {
			ex.printStackTrace();
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
	}
	
	public Mail buildEmail() {

		Mail mail = new Mail();

		Email fromEmail = new Email();
		fromEmail.setName(Constants.PROTOSTAR_FROM_EMAIL_NAME);
		fromEmail.setEmail(Constants.PROTOSTAR_FROM_EMAIL_ID);
		mail.setFrom(fromEmail);

		Personalization personalization = new Personalization();

		Email to = new Email();
		to.setEmail(this.toEmail);
		personalization.addTo(to);

		/*Email bcc = new Email();
		bcc.setEmail(Constants.PROTOSTAR_CONTACT_US_EMAIL);
		personalization.addBcc(bcc);*/

		personalization.setSubject(this.emailSubject);
		personalization.addHeader("X-Test", "test");
		personalization.addHeader("X-Mock", "true");

		mail.addPersonalization(personalization);

		Content content = new Content();
		content.setType("text/html");
		content.setValue(this.messageBody);
		mail.addContent(content);

		return mail;
	}
}
