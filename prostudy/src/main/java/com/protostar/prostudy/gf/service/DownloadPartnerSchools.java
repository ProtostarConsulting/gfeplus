package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import com.protostar.prostudy.gf.entity.BookDetail;
import com.protostar.prostudy.gf.entity.BookSummary;
import com.protostar.prostudy.gf.entity.ExamDetail;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.gf.entity.PaymentDetail;
import com.protostar.prostudy.until.data.UtilityService;

/**
 * Servlet implementation class DownloadPartnerSchools
 */
public class DownloadPartnerSchools extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DownloadPartnerSchools() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// System.out.println("hi i am download servlet");
		if (request.getRemoteHost().contains("localhost")
				|| request.getRemoteHost().contains("127.0.0.1")) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods",
					"GET,PUT,POST,DELETE");
			response.addHeader("Access-Control-Allow-Headers", "Content-Type");
		}
		
		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		System.out.println("insid===" + insId);
		PartnerSchoolService patss = new PartnerSchoolService();

		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		List<PartnerSchoolEntity> schoolList = patss
				.getPartnerByInstitute(insId);

		OutputStream out = null;
		try {

			// response.setContentType("application/vnd.ms-excel");
			response.setContentType("text/csv");

			response.setHeader("Content-Disposition",
					"attachment; filename=SchoolData_" + sdf.format(date)
							+ ".csv");

			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);
			// Part-1
			writer.append("Sr. No.");
			writer.append(',');
			writer.append("GRF. Reg. No.");
			writer.append(',');
			writer.append("School Name");
			writer.append(',');
			writer.append("Institute Name");
			writer.append(',');
			writer.append("Form Number");
			writer.append(',');
			writer.append("School Type");
			writer.append(',');
			/*
			 * writer.append("primaryContact"); writer.append(',');
			 */writer.append("Address Line1");
			writer.append(',');
			writer.append("Line2");
			writer.append(',');
			writer.append("City");
			writer.append(',');
			writer.append("Taluka");
			writer.append(',');
			writer.append("District");
			writer.append(',');
			writer.append("State");
			writer.append(',');
			writer.append("country");
			writer.append(',');
			writer.append("pin");
			writer.append(',');
			writer.append("Head Master");
			writer.append(',');
			writer.append("HeadMasterMobile");
			writer.append(',');
			writer.append("HeadMasterEmailId");
			writer.append(',');
			writer.append("Co-ordinator Name");
			writer.append(',');
			writer.append("Co-ordinator Mobile");
			writer.append(',');
			writer.append("Co-ordinator Email");
			writer.append(',');
			// Part-2
			writer.append("Payment Mode");
			writer.append(',');
			writer.append("Bank");
			writer.append(',');
			writer.append("Branch");
			writer.append(',');
			writer.append("DD/Slip No.");
			writer.append(',');
			writer.append("Transaction Date");
			writer.append(',');
			writer.append("Total Amt. Paid");
			writer.append(',');

			writer.append("ExamYear");
			writer.append(',');
			writer.append("Mode of Exam");
			writer.append(',');
			writer.append("Total Students");
			writer.append(',');
			writer.append("Appeared Students");
			writer.append(',');
			writer.append("Male");
			writer.append(',');
			writer.append("Female");
			writer.append(',');

			// Part-3
			String standardList[] = { "5th", "6th", "7th", "8th", "9th",
					"10th", "11th", "12th", "FY", "SY", "TY", "Fr. Y",
					"PG/D. & B. Ed-1", "PG/D. & B. Ed-2", "Teacher" };

			for (String std : standardList) {
				writer.append(std);
				writer.append(',');
			}

			writer.append(System.lineSeparator());

			for (int i = 0; i < schoolList.size(); i++) {

				try {

					PartnerSchoolEntity schoolEntity = schoolList.get(i);

					// Part-1
					writer.append(Integer.toString(i + 1));
					writer.append(',');
					writer.append(schoolEntity.getAutoGenerated());
					writer.append(',');
					writer.append(UtilityService.trimForCSV(schoolEntity
							.getSchoolName()));
					writer.append(',');
					writer.append(UtilityService.trimForCSV(schoolEntity
							.getInstName()));
					writer.append(',');
					writer.append(schoolEntity.getFormNumber());
					writer.append(',');
					writer.append(schoolEntity.getCategory());
					writer.append(',');
					/*
					 * writer.append(patse.get(i).getPrimaryContact());
					 * writer.append(',');
					 */
					writer.append(UtilityService.trimForCSV(schoolEntity
							.getAddress().getLine1()));
					writer.append(',');
					writer.append(UtilityService.trimForCSV(schoolEntity
							.getAddress().getLine2()));
					writer.append(',');
					String city = UtilityService.trimForCSV(schoolEntity
							.getAddress().getCity());
					writer.append(city);
					writer.append(',');
					writer.append(schoolEntity.getAddress().getTal());
					writer.append(',');
					writer.append(schoolEntity.getAddress().getDist());
					writer.append(',');
					writer.append(schoolEntity.getAddress().getState());
					writer.append(',');
					writer.append(schoolEntity.getAddress().getCountry());
					writer.append(',');
					writer.append(schoolEntity.getAddress().getPin());
					writer.append(',');
					String headMasterName = UtilityService
							.trimForCSV(schoolEntity.getContactDetail()
									.getHeadMasterName());
					writer.append(headMasterName);
					writer.append(',');
					writer.append(schoolEntity.getContactDetail()
							.getHeadMasterMobile());
					writer.append(',');
					writer.append(schoolEntity.getContactDetail()
							.getHeadMasterEmailId());
					writer.append(',');

					if (schoolEntity.getContactDetail().getCoordinatorDetail() != null) {
						String coordinatorName = schoolEntity
								.getContactDetail().getCoordinatorDetail()
								.get(0).getCoordinatorName();
						coordinatorName = UtilityService
								.trimForCSV(coordinatorName);
						writer.append(coordinatorName);
						writer.append(',');
						writer.append(schoolEntity.getContactDetail()
								.getCoordinatorDetail().get(0)
								.getCoordinatorMobileNum());
						writer.append(',');
						writer.append(schoolEntity.getContactDetail()
								.getCoordinatorDetail().get(0)
								.getCoordinatorEmailId());
						writer.append(',');
					}

					ExamDetail examDeatil = PartnerSchoolService
							.getExamDeatilByCurretnYear(schoolEntity);
					if (examDeatil != null) {
						// Part-2
						List<PaymentDetail> paymentDetailList = examDeatil
								.getPaymentDetail();
						if (paymentDetailList != null
								&& !paymentDetailList.isEmpty()) {
							float totalPaid = 0;
							for (PaymentDetail paymentRecord : paymentDetailList) {
								totalPaid += paymentRecord.getPayAmount();
							}
							String payReceivedBy = UtilityService
									.trimForCSV(paymentDetailList.get(0)
											.getPayReceivedBy());
							writer.append(payReceivedBy);
							writer.append(',');

							String nameOfBank = UtilityService
									.trimForCSV(paymentDetailList.get(0)
											.getNameOfBank());
							writer.append(nameOfBank);
							writer.append(',');

							String nameOfBranch = UtilityService
									.trimForCSV(paymentDetailList.get(0)
											.getBranchName());
							writer.append(nameOfBranch);
							writer.append(',');

							writer.append(paymentDetailList.get(0)
									.getTransactionNumber());
							writer.append(',');

							SimpleDateFormat sd = new SimpleDateFormat(
									"dd/MM/yyyy");
							String dateStr = sd.format(paymentDetailList.get(0)
									.getPaymentDate());
							writer.append(dateStr);
							writer.append(',');
							writer.append("" + totalPaid);
							writer.append(',');
						} else {
							writer.append("");
							writer.append(',');
							writer.append("");
							writer.append(',');
							writer.append("");
							writer.append(',');
							writer.append("");
							writer.append(',');
							writer.append("");
							writer.append(',');
							writer.append("");
							writer.append(',');
						}
						writer.append(examDeatil.getYearOfExam());
						writer.append(',');
						writer.append(examDeatil.getModeOfExam());
						writer.append(',');
						writer.append(examDeatil.getTotalStudent());
						writer.append(',');
						writer.append(examDeatil.getTotal());
						writer.append(',');
						writer.append(examDeatil.getMale());
						writer.append(',');
						writer.append(examDeatil.getFemale());
						writer.append(',');

						// Part-3
						BookSummary bookSummary = examDeatil.getBookSummary();
						List<BookDetail> bookDetailList = bookSummary
								.getBookDetail();

						for (String std : standardList) {
							writer.append(Integer
									.toString(getStudentsByStandard(std,
											bookDetailList)));
							writer.append(',');
						}
					}
					writer.append(System.lineSeparator());

				} catch (Exception ex) {
					writer.append(System.lineSeparator());
				}

			}

			writer.close();

		} catch (Exception e) {
			throw new ServletException("Exception in Excel Sample Servlet", e);
		} finally {
			if (out != null)
				out.close();
		}

	}

	private int getStudentsByStandard(String std,
			List<BookDetail> bookDetailList) {
		int noOfStudents = 0;
		if (bookDetailList == null || bookDetailList.isEmpty())
			return noOfStudents;

		for (BookDetail bookDetail : bookDetailList) {
			if (std.equalsIgnoreCase(bookDetail.getStandard()))
				noOfStudents += bookDetail.getTotalStud();
		}
		return noOfStudents;
	}
}
