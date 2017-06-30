package com.protostar.prostudy.until.data;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Calendar;
import java.util.List;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.Work;

public class UtilityService {

	public static String getNextPRN(String role) {
		Calendar rightNow = Calendar.getInstance();

		if (role == null || role.isEmpty()) {
			throw new RuntimeException("Role must not be null or empty");
		}

		int cy = rightNow.get(Calendar.YEAR);
		return role.toUpperCase().charAt(0) + "-" + cy + "-"
				+ String.format("%05d", getCurrentYearNextCounter(cy));
	}

	private static Long getCurrentYearNextCounter(final long cy) {

		final Key<YearCounterEntity> eKey;

		List<YearCounterEntity> list = ofy().load()
				.type(YearCounterEntity.class).filter("year", cy).list();

		if (list == null || list.isEmpty()) {
			YearCounterEntity yc = new YearCounterEntity();
			yc.setYear(cy);
			yc.setCurrentCounter(1L);
			eKey = ofy().save().entity(yc).now();
		} else {
			YearCounterEntity yc = list.get(0);
			eKey = Key.create(yc);
		}

		// If you don't need to return a value, you can use VoidWork
		YearCounterEntity yc = ofy().transact(new Work<YearCounterEntity>() {
			public YearCounterEntity run() {
				YearCounterEntity yc = ofy().load().key(eKey).now();
				yc.setCurrentCounter(yc.getCurrentCounter() + 1);
				Key<YearCounterEntity> now = ofy().save().entity(yc).now();
				return yc;
			}
		});

		return yc.getCurrentCounter();

	}

	public static String read(InputStream stream) {
		StringBuilder sb = new StringBuilder();
		BufferedReader reader = new BufferedReader(
				new InputStreamReader(stream));
		try {
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				reader.close();
			} catch (IOException e) {
				// ignore
			}
		}
		return sb.toString();
	}

	public static String trimForCSV(String val) {
		if(val == null)
			return "";
		
		val = val.replace("\n", "").replace("\r", "").trim();
		val = val.replace(',', '-');		
		return val.trim();					
	}
	
	public static String getCurrentAppURL() {
		String hostUrl;
		String environment = System.getProperty("com.google.appengine.runtime.environment");
		if ("Production".equalsIgnoreCase(environment)) {
			String applicationId = System.getProperty("com.google.appengine.application.id");
			// String version =
			// System.getProperty("com.google.appengine.application.version");
			hostUrl = "https://" + applicationId + ".appspot.com/";
		} else {
			hostUrl = "http://localhost:8888";
		}
		return hostUrl;
	}
}
