package com.protostar.prostudy.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.protostar.prostudy.service.UploadCourseListServlet.SizeEntry;
import com.protostar.prostudy.until.data.GjsonGenerator;

/**
 * Servlet implementation class UploadDirectoryUserListServlet
 */
public class UploadDirectoryUserListServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private final Logger log = Logger
			.getLogger(UploadDirectoryUserListServlet.class.getName());

	class SizeEntry {
		public int size;
		public Date time;
	}

	class NameEntity {
		public String givenName;
		public String familyName;

		public String getGivenName() {
			return givenName;
		}

		public void setGivenName(String givenName) {
			this.givenName = givenName;
		}

		public String getFamilyName() {
			return familyName;
		}

		public void setFamilyName(String familyName) {
			this.familyName = familyName;
		}

	}

	class NewUser {

		private NameEntity name = new NameEntity();

		public NameEntity getName() {
			return name;
		}

		public void setName(NameEntity name) {
			this.name = name;
		}

		public String primaryEmail;
		public String password;

		public String getPrimaryEmail() {
			return primaryEmail;
		}

		public void setPrimaryEmail(String primaryEmail) {
			this.primaryEmail = primaryEmail;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

	}
	static Map<String, SizeEntry> sizeMap = new ConcurrentHashMap<>();
	int counter;
	
	public UploadDirectoryUserListServlet() {
		super();
		// TODO Auto-generated constructor stub
		}

	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		List<NewUser> userList = new ArrayList<>();

		String[] split2 = null;
		try {

			StringBuilder sb = new StringBuilder("{\"result\": [");

			if (request.getHeader("Content-Type") != null
					&& request.getHeader("Content-Type").startsWith(
							"multipart/form-data")) {
				ServletFileUpload upload = new ServletFileUpload();

				FileItemIterator iterator = upload.getItemIterator(request);

				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					InputStream stream = item.openStream();

					System.out.println("fields" + item);

					int len;
					byte[] fileContent = new byte[2000000]; // Can handle files
															// upto 20 MB

					int read = stream.read(fileContent);

					while ((len = stream.read(fileContent, 0,
							fileContent.length)) != -1) {

					}
					System.out.println("File content is : "
							+ new String(fileContent));
					System.out.println("File Read is Done!!");
					
					String fileAsString = new String(fileContent);

					split2 = fileAsString.split("\n");

					try {

						for (int row = 1; row < split2.length; row++) {

							String[] split = split2[row].split(",");
							if (split == null || split.length < 4) {
								continue;
								
							}

							NewUser nu = new NewUser();
							NameEntity ne = new NameEntity();
						
							ne.setFamilyName(split[0].trim());
							ne.setGivenName(split[1].trim());

							nu.setName(ne);							
							nu.setPrimaryEmail(split[2].trim());
							nu.setPassword(split[3].trim());
							userList.add(nu);

						}

					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				}
			} else {
				sb.append("{\"size\":\""
						+ size("ipaddress", request.getInputStream()) + "\"}");
			}

			sb.append("]");
			sb.append(", \"requestHeaders\": {");
			@SuppressWarnings("unchecked")
			Enumeration<String> headerNames = request.getHeaderNames();
			while (headerNames.hasMoreElements()) {
				String header = headerNames.nextElement();

				sb.append(header).append(":").append(request.getHeader(header));
				if (headerNames.hasMoreElements()) {
					sb.append(",");
				}
			}
			sb.append("}}");

			// Parsing of userList in JSON format
			String data = GjsonGenerator.converToJson(userList);
			log.info("data:" + data);
			response.getWriter().write(data);

		} catch (Exception ex) {
			throw new ServletException(ex);
		}
	}

	protected int size(String key, InputStream stream) {
		int length = sizeMap.get(key) == null ? 0 : sizeMap.get(key).size;
		try {
			byte[] buffer = new byte[200000];
			int size;
			while ((size = stream.read(buffer)) != -1) {
				length += size;
				SizeEntry entry = new SizeEntry();
				entry.size = length;
				entry.time = new Date();
				sizeMap.put(key, entry);

			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		System.out.println(length);
		return length;

	}

	protected String read(InputStream stream) {
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

}
