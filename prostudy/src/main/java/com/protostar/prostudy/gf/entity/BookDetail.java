package com.protostar.prostudy.gf.entity;

public class BookDetail {

	
	private String bookName;
	private Integer bookPrise;
	private String standard;
	private Integer totalStud;
	private Integer appearedTotalStud = 0;
	private Integer totalFees;
	
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	public Integer getBookPrise() {
		return bookPrise;
	}
	public void setBookPrise(Integer bookPrise) {
		this.bookPrise = bookPrise;
	}
	
	public Integer getTotalStud() {
		return totalStud;
	}
	public void setTotalStud(Integer totalStud) {
		this.totalStud = totalStud;
	}
	public Integer getTotalFees() {
		return totalFees;
	}
	public void setTotalFees(Integer totalFees) {
		this.totalFees = totalFees;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public Integer getAppearedTotalStud() {
		return appearedTotalStud;
	}
	public void setAppearedTotalStud(Integer appearedTotalStud) {
		this.appearedTotalStud = appearedTotalStud;
	}
	

}
