package com.protostar.prostudy.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Date;
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

import com.protostar.prostudy.entity.ScheduledQuestionEntity;
import com.protostar.prostudy.until.data.UtilityService;

/**
 * Servlet implementation class UploadScheduledQuestionListServlet
 */
public class UploadScheduledQuestionListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private final Logger log = Logger.getLogger(UploadScheduledQuestionListServlet.class.getName());
	
	class SizeEntry {
		public int size;
		public Date time;
	}
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	static Map<String, SizeEntry> sizeMap = new ConcurrentHashMap<>();
	int counter;
	public UploadScheduledQuestionListServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
			System.out.println("inside UploadScheduledQuestionListServlet");	
		try {
			if (request.getHeader("Content-Type") != null
					&& request.getHeader("Content-Type").startsWith(
							"multipart/form-data")) {
				ServletFileUpload upload = new ServletFileUpload();

				FileItemIterator iterator = upload.getItemIterator(request);
				String[] split2 = null;			
				Long insId = 0L;
				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					System.out.println("item.getFieldName(): "
							+ item.getFieldName());

					if (item.getName() == null) {
						

						if ("instituteID".equalsIgnoreCase(item.getFieldName())) {
							insId = Long.parseLong(UtilityService.read(item
									.openStream()));

						}
						continue;
					}
					InputStream openStream = item.openStream();
					int len = 0;
					byte[] fileContent = new byte[2000000];
				

					int read = openStream.read(fileContent);
					
					while ((len = openStream.read(fileContent, 0,
							fileContent.length)) != -1) {
						
					}
					System.out.println("File content is : "
							+ new String(fileContent));
					System.out.println("File Read is Done!!");
					
					String fileAsString = new String(fileContent);

					split2 = fileAsString.split("\n");

				}

				for (int row = 1; row < split2.length; row++) {

					String[] split = split2[row].split(",");
				
					// insert ScheduledQuestion
					ScheduledQuestionEntity sq = new ScheduledQuestionEntity();
					
					sq.setInstituteID(insId);
					sq.setDescription(split[0].trim());
					sq.setCategory(split[1].trim());
					sq.setOption1(split[2].trim());
					sq.setOption2(split[3].trim());
					sq.setOption3(split[4].trim());
					sq.setOption4(split[5].trim());
					sq.setCorrectAns(split[6].trim());

					ScheduledQuestionService sqs = new ScheduledQuestionService();
					sqs.addQuestion(sq);
					
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
