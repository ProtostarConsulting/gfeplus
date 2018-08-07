package com.protostar.prostudy.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
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

import com.protostar.prostudy.entity.PracticeExamEntity;
import com.protostar.prostudy.entity.QuestionEntity;
import com.protostar.prostudy.until.data.UtilityService;

/**
 * Servlet implementation class UploadQuestionListServlet
 */
public class UploadQuestionListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final Logger log = Logger.getLogger(UploadQuestionListServlet.class
			.getName());

	class SizeEntry {
		public int size;
		public Date time;
	}

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	static Map<String, SizeEntry> sizeMap = new ConcurrentHashMap<>();
	int counter;

	public UploadQuestionListServlet() {
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

		try {
			if (request.getHeader("Content-Type") != null
					&& request.getHeader("Content-Type").startsWith(
							"multipart/form-data")) {
				ServletFileUpload upload = new ServletFileUpload();

				FileItemIterator iterator = upload.getItemIterator(request);
				String[] split2 = null;
				Long insId = 0L;
				Long practiceTestId = 0L;
				
				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					System.out.println("item.getFieldName(): "
							+ item.getFieldName());

					if (item.getName() == null) {

						if ("instituteID".equalsIgnoreCase(item.getFieldName())) {
							insId = Long.parseLong(UtilityService.read(item
									.openStream()));							
						}
						if ("practiceTestId".equalsIgnoreCase(item.getFieldName())) {
							practiceTestId = Long.parseLong(UtilityService.read(item
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

				//CSV headers
				// board standard division subject description category note
				// option1 option2 option3 option4 correctAns
				List<QuestionEntity> addedQuestionsList = new ArrayList<QuestionEntity>();
				for (int row = 1; row < split2.length; row++) {
					String[] split = split2[row].split(",");
					System.out.println("split.length: " + split.length);
					if (split.length < 12)
						continue;

					QuestionEntity questionEntity = new QuestionEntity();

					questionEntity.setInstituteID(insId);
					questionEntity.setBoard(split[0].trim());
					questionEntity.setStandard(split[1].trim());
					questionEntity.setDivision(split[2].trim());
					questionEntity.setSubject(split[3].trim());
					questionEntity.setDescription(split[4].trim());
					questionEntity.setCategory(split[5].trim());
					questionEntity.setNote(split[6].trim());
					questionEntity.setOption1(split[7].trim());
					questionEntity.setOption2(split[8].trim());
					questionEntity.setOption3(split[9].trim());
					questionEntity.setOption4(split[10].trim());
					questionEntity.setCorrectAns(split[11].trim());

					QuestionService qs = new QuestionService();
					addedQuestionsList.add(qs.addQuestion(questionEntity));
				}
				System.out.println("practiceTestId: " + practiceTestId);
				if(practiceTestId != 0L){
					PracticeExamService practiceExamService = new PracticeExamService();
					PracticeExamEntity practiceExam = practiceExamService.getPracticeExamById(practiceTestId);
					System.out.println("practiceExam: " + practiceExam);
					if(practiceExam != null){
						List<QuestionEntity> newList = new ArrayList<QuestionEntity>();
						newList.addAll(practiceExam.getQuestions());
						newList.addAll(addedQuestionsList);
						practiceExam.setQuestions(newList);
						practiceExamService.updatePracticeExam(practiceExam);
					}
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
