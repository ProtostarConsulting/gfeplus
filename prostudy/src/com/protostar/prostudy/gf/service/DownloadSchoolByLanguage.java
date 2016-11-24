package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.protostar.prostudy.gf.entity.BookDetail;
import com.protostar.prostudy.gf.entity.BookSummary;
import com.protostar.prostudy.gf.entity.ExamDetail;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

public class DownloadSchoolByLanguage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public DownloadSchoolByLanguage() {
		super();
	}

	int noOfStudents = 0;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		int totalStudent = 0;
		String currTotal = null;

		System.out.println("insid===" + insId);
		PartnerSchoolService patss = new PartnerSchoolService();

		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		List<PartnerSchoolEntity> schoolList = patss
				.getPartnerByInstitute(insId);

		try {

			response.setContentType("text/csv");

			response.setHeader(
					"Content-Disposition",
					"attachment; filename=SchoolDataByLanguage_"
							+ sdf.format(date) + ".csv");

			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);

			writer.append("Sr. No.");
			writer.append(',');
			writer.append("GRF. Reg. No.");
			writer.append(',');
			writer.append("School Name");
			writer.append(',');
			writer.append("Total Student");
			writer.append(',');

			String standardList[] = { "5th", "6th", "7th", "8th", "9th",
					"10th", "11th", "12th", "FY", "SY", "TY", "Fr. Y",
					"PG/D. & B. Ed-1", "PG/D. & B. Ed-2", "Teacher" };
			String medium[] = { "English", "Hindi", "Marathi", "Kannada" };

			for (String std : standardList) {
				for (String med : medium) {
					if (!std.equalsIgnoreCase("Teacher")) {
						writer.append(std.concat("-" + med));
						writer.append(',');
					}
				}
				if (std.equalsIgnoreCase("Teacher")) {
					writer.append(std);
					writer.append(',');
				}
			}
			writer.append(System.lineSeparator());

			GFBookStockService gfBookService = new GFBookStockService();
			List<GFBookEntity> gfBookEntityList = gfBookService
					.getGFBookByInstituteId(insId);
			Map<Long, GFBookEntity> gfBookEntityMap = new HashMap<Long, GFBookEntity>();
			for (GFBookEntity gfBookEntity : gfBookEntityList) {
				gfBookEntityMap.put(gfBookEntity.getId(), gfBookEntity);
			}

			for (int i = 0; i < schoolList.size(); i++) {
				try {
					PartnerSchoolEntity psEntity = schoolList.get(i);

					ExamDetail examDeatil = PartnerSchoolService
							.getExamDeatilByCurretnYear(psEntity);
					if (examDeatil == null
							|| examDeatil.getBookSummary() == null) {
						continue;
					}

					BookSummary bookSummaryTotal = examDeatil.getBookSummary();
					List<BookDetail> bookDetailList = bookSummaryTotal
							.getBookDetail();
					for (BookDetail bookDetail : bookDetailList) {
						if (bookDetail.getTotalStud() != null
								&& bookDetail.getTotalStud() > 0) {
							int currentStudTotal = bookDetail.getTotalStud();
							totalStudent = totalStudent + currentStudTotal;
						}
					}

					writer.append(Integer.toString(i + 1));
					writer.append(',');
					writer.append(psEntity.getAutoGenerated());
					writer.append(',');
					String schoolName = psEntity.getSchoolName();
					schoolName = schoolName.replace(",", "-");
					writer.append(schoolName);
					writer.append(',');

					currTotal = Integer.toString(totalStudent);
					writer.append(currTotal);
					writer.append(',');
					totalStudent = 0;

					for (String std : standardList) {
						for (String med : medium) {
							if (!std.equalsIgnoreCase("Teacher")) {
								writer.append(Integer
										.toString(getStudentsByStandard(std,
												med, bookDetailList,
												gfBookEntityMap)));
								noOfStudents = 0;
								writer.append(',');
							}
						}
						if (std.equalsIgnoreCase("Teacher")) {
							writer.append(Integer
									.toString(getStudentsByTeacherStandard(std,
											bookDetailList, gfBookEntityMap)));
							writer.append(',');
						}
					}

					writer.append(System.lineSeparator());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private int getStudentsByStandard(String std, String med,
			List<BookDetail> bookDetailList,
			Map<Long, GFBookEntity> gfBookEntityMap) {

		int noOfStudents = 0;
		GFBookEntity currBookEntity = null;
		if (bookDetailList == null || bookDetailList.isEmpty())
			return noOfStudents;

		for (BookDetail bookDetail : bookDetailList) {
			String bookName = bookDetail.getBookName();
			if (bookName == null || bookName.trim().isEmpty())
				continue;

			Long bookID = Long.valueOf(bookName);
			currBookEntity = gfBookEntityMap.get(bookID);
			/*
			 * for (int i = 0; i < gfBook.size(); i++) { Long currBookID =
			 * gfBook.get(i).getId(); if (bookID.equals(currBookID)) {
			 * currBookEntity = gfBook.get(i); break; } }
			 */
			if (currBookEntity == null)
				continue;

			if (std.equalsIgnoreCase(currBookEntity.getStandard().trim())
					&& med.equalsIgnoreCase(currBookEntity.getBookMedium()
							.trim())) {
				noOfStudents += bookDetail.getTotalStud();
			}
		}
		return noOfStudents;
	}

	private int getStudentsByTeacherStandard(String std,
			List<BookDetail> bookDetailList,
			Map<Long, GFBookEntity> gfBookEntityMap) {

		int noOfStudents = 0;
		GFBookEntity currBookEntity = null;
		if (bookDetailList == null || bookDetailList.isEmpty())
			return noOfStudents;

		for (BookDetail bookDetail : bookDetailList) {
			String bookName = bookDetail.getBookName();
			if (bookName == null || bookName.trim().isEmpty())
				continue;

			Long bookID = Long.valueOf(bookName);
			currBookEntity = gfBookEntityMap.get(bookID);
			/*
			 * for (int i = 0; i < gfBook.size(); i++) { Long currBookID =
			 * gfBook.get(i).getId(); if (bookID.equals(currBookID)) {
			 * currBookEntity = gfBook.get(i); break; } }
			 */
			if (currBookEntity == null)
				continue;

			if (std.equalsIgnoreCase(currBookEntity.getStandard().trim())) {
				noOfStudents += bookDetail.getTotalStud();
			}
		}
		return noOfStudents;
	}
}
