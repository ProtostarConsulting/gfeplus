package com.protostar.prostudy.until.data;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.Work;

public class UtilityService {
	
	private final static Logger log = Logger.getLogger(UtilityService.class.getName());

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
	
	public static Map<String, String> getMultiPartFileItemsWithFileAsString(HttpServletRequest request)
			throws IOException {
		try {
			if (request.getHeader("Content-Type") != null
					&& request.getHeader("Content-Type").startsWith("multipart/form-data")) {

				ServletFileUpload upload = new ServletFileUpload();
				FileItemIterator iterator = upload.getItemIterator(request);
				Map<String, String> items = new HashMap<String, String>();
				while (iterator.hasNext()) {
					FileItemStream next = iterator.next();
					items.put(next.getFieldName(), UtilityService.readAsString(next.openStream()));
				}
				return items;
			}
		} catch (Exception e) {
			log.severe(e.getMessage());
			e.printStackTrace();
			throw new IOException("Error Occurred while uploading the csv file.", e);
		}

		return null;

	}
	
	public static String readAsString(InputStream stream) throws IOException {
		byte[] fileContent = new byte[Constants.DOCUMENT_DEFAULT_MAX_SIZE];
		// Can handle file upto 5 MB

		// int read = stream.read(fileContent);
		// log.fine("No of bytes read:" + read);
		int totalBytesRead = 0;
		int bytesReadTemp = 0;
		while (bytesReadTemp != -1) {
			bytesReadTemp = stream.read(fileContent, totalBytesRead, fileContent.length);
			if (bytesReadTemp > 0)
				totalBytesRead += bytesReadTemp;
		}
		stream.close();
		log.info("File Read is Done!!. Bytes read: " + totalBytesRead);
		// Write code here to parse sheet of patients and upload to
		// database

		String fileAsString = new String(fileContent);
		return fileAsString.trim();
	}
}
