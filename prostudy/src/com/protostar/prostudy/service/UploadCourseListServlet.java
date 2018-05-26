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
import com.protostar.prostudy.until.data.UtilityService;

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

	public UploadCourseListServlet() {
		super();
	}

	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map<String, String> items = UtilityService.getMultiPartFileItemsWithFileAsString(request);
		if (items == null || items.isEmpty()) {
			return;
		}

		List<NewCourse> courseList = new ArrayList<>();

		String[] split2 = null;
		String fileAsString = items.get("file").toString();
		split2 = fileAsString.split("\n");

		try {

			for (int row = 1; row < split2.length; row++) {

				String[] split = split2[row].split(",");
				if (split == null || split.length < 6) {
					continue;
				}

				NewCourse nc = new NewCourse();

				nc.setName(split[0].trim());
				nc.setSection(split[1].trim());
				nc.setDescriptionHeading(split[2].trim());
				nc.setDescription(split[3].trim());
				nc.setRoom(split[4].trim());
				nc.setTeacherGroupEmail(split[5].trim());
				courseList.add(nc);

			}

			// Parsing of courseList in JSON format
			String data = GjsonGenerator.converToJson(courseList);
			log.info("data:" + data);
			response.getWriter().write(data);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}