package com.protostar.prostudy.gf.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.logging.Logger;

import com.google.appengine.api.taskqueue.DeferredTask;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions;

public class TextLocalSMSHandler {

	private static final Logger logger = Logger
			.getLogger(TextLocalSMSHandler.class.getName());
	static final String TEXTLOCAL_API_URL = "http://api.textlocal.in/send/?";
	static final String SMS_SENDERNAME = "TXTLCL";
	static final String TEXTLOCAL_API_KEY = "lgwOpe/8kmU-SS8snypaZaYnhY9P9w93iNGSaOXT6I";

	public static String sendSms(String smsMsg, String mobileNumbers) {
		try {
			if (smsMsg == null || smsMsg.isEmpty() || mobileNumbers == null
					|| mobileNumbers.isEmpty()) {
				return null;
			} else {
				// Validate mobile number with country code with 10 digit
				if (mobileNumbers.length() < 10) {
					return null;
				} else {
					// OK, continue;
				}
			}
			// Construct data
			String apiKey = "&apiKey="
					+ URLEncoder.encode(TEXTLOCAL_API_KEY, "UTF-8");
			String sender = "&sender="
					+ URLEncoder.encode(SMS_SENDERNAME, "UTF-8");
			String numbers = "&numbers="
					+ URLEncoder.encode(mobileNumbers, "UTF-8");

			String message = "&message=" + URLEncoder.encode(smsMsg, "UTF-8");

			// Send data
			String data = apiKey + numbers + message + sender;
			Queue queue = QueueFactory.getDefaultQueue();
			queue.add(TaskOptions.Builder
					.withPayload(new SendSMSAsyncOperation(data)));

			return "Called Aysnc";
		} catch (Exception e) {
			logger.warning("Error SMS: " + e);
			return "Error " + e;
		}
	}

}

class SendSMSAsyncOperation implements DeferredTask {
	private static final long serialVersionUID = 1L;
	String data;

	public SendSMSAsyncOperation(String data) {
		this.data = data;
	}

	@Override
	public void run() {
		// expensive operation to be backgrounded goes here
		try {
			// Send data
			System.out.println("Sending SMS Asysc");
			HttpURLConnection conn = (HttpURLConnection) new URL(
					TextLocalSMSHandler.TEXTLOCAL_API_URL).openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Length",
					Integer.toString(data.length()));
			conn.getOutputStream().write(data.getBytes("UTF-8"));
			final BufferedReader rd = new BufferedReader(new InputStreamReader(
					conn.getInputStream()));
			final StringBuffer stringBuffer = new StringBuffer();
			String line;
			while ((line = rd.readLine()) != null) {
				stringBuffer.append(line);
			}
			rd.close();
			System.out.println("data:" + data);
			System.out.println("stringBuffer.toString():"
					+ stringBuffer.toString());
			System.out.println("Done--Sending SMS Asysc");
		} catch (Exception e) {
			System.out.println("Error SMS: " + e);
		}
	}
}
