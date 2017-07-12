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

import com.protostar.prostudy.until.data.GjsonGenerator;

/**
 * Servlet implementation class UploadCourseListServlet
 */
public class UploadCourseListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final Logger log = Logger.getLogger(UploadCourseListServlet.class
			.getName());

	class SizeEntry {
		public int size;
		public Date time;
	}
	
	
	class NewCourse {
		public String name;
		public String section;
		public String descriptionHeading;		
		public String description;
		public String room;
		private String teacherGroupEmail;
		public void setName(String name) {
			this.name = name;
		}
		public void setSection(String section) {
			this.section = section;
		}
		public void setDescriptionHeading(String descriptionHeading) {
			this.descriptionHeading = descriptionHeading;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public void setRoom(String room) {
			this.room = room;
		}
		public void setTeacherGroupEmail(String teacherGroupEmail) {
			this.teacherGroupEmail = teacherGroupEmail;
		}
      
    }

	static Map<String, SizeEntry> sizeMap = new ConcurrentHashMap<>();
	int counter;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadCourseListServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub	
	
		
		List<NewCourse> courseList = new ArrayList<>();			
	    
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
							if (split == null || split.length < 6) {
								continue;
							}
													
							
						NewCourse nc =new NewCourse();
						
						nc.setName(split[0].trim());
						nc.setSection(split[1].trim());
						nc.setDescriptionHeading(split[2].trim());
						nc.setDescription(split[3].trim());
						nc.setRoom(split[4].trim());
						nc.setTeacherGroupEmail(split[5].trim());				
						courseList.add(nc);					
				
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
		
			
			//Parsing of courseList in JSON format			
			 String data = GjsonGenerator.converToJson(courseList);
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
