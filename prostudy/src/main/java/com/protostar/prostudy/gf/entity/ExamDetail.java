package com.protostar.prostudy.gf.entity;

import java.util.List;

public class ExamDetail {

	private String totalStudent;
	private String male;
	private String female;
	private String total;
	/* private List<String> examMedium; */
	private String yearOfExam;
	private String bookRequired;
	private String modeOfExam;
	private NotificationData notificationData = new NotificationData();

	private List<PaymentDetail> paymentDetail;
	private BookSummary bookSummary;
	private Integer numberOfCoordinators = 1;

	public Integer getNumberOfCoordinators() {
		return numberOfCoordinators;
	}

	public void setNumberOfCoordinators(Integer numberOfCoordinators) {
		this.numberOfCoordinators = numberOfCoordinators;
	}

	public String getTotalStudent() {
		return totalStudent;
	}

	public void setTotalStudent(String totalStudent) {
		this.totalStudent = totalStudent;
	}

	public String getMale() {
		return male;
	}

	public void setMale(String male) {
		this.male = male;
	}

	public String getFemale() {
		return female;
	}

	public void setFemale(String female) {
		this.female = female;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	/*
	 * public List<String> getExamMedium() { return examMedium==null ? null :
	 * examMedium; }
	 * 
	 * public void setExamMedium(List<String> examMedium) { this.examMedium =
	 * examMedium; }
	 */

	public String getYearOfExam() {
		return yearOfExam;
	}

	public void setYearOfExam(String yearOfExam) {
		this.yearOfExam = yearOfExam;
	}

	public String getBookRequired() {
		return bookRequired;
	}

	public void setBookRequired(String bookRequired) {
		this.bookRequired = bookRequired;
	}

	public String getModeOfExam() {
		return modeOfExam;
	}

	public void setModeOfExam(String modeOfExam) {
		this.modeOfExam = modeOfExam;
	}

	public List<PaymentDetail> getPaymentDetail() {
		return paymentDetail == null ? null : paymentDetail;

	}

	public void setPaymentDetail(List<PaymentDetail> paymentDetail) {
		this.paymentDetail = paymentDetail;

	}

	public BookSummary getBookSummary() {
		return bookSummary == null ? null : bookSummary;
	}

	public void setBookSummary(BookSummary bookSummary) {
		this.bookSummary = bookSummary;
	}

	public NotificationData getNotificationData() {
		return notificationData;
	}

	public void setNotificationData(NotificationData notificationData) {
		this.notificationData = notificationData;
	}

}
