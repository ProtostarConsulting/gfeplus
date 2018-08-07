package com.protostar.prostudy.gf.entity;

import java.util.List;

public class BookSummary {

	private List<BookDetail> bookDetail;
	private Integer total;
	private Integer appearedSchoolTotalStud = 0;
	private Integer amtForInst20per;
	private Integer amtForGRF80per;
	
	
	
	public List<BookDetail> getBookDetail() {
		return bookDetail;
	}
	public void setBookDetail(List<BookDetail> bookDetail) {
		this.bookDetail = bookDetail;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getAmtForInst20per() {
		return amtForInst20per;
	}
	public void setAmtForInst20per(Integer amtForInst20per) {
		this.amtForInst20per = amtForInst20per;
	}
	public Integer getAmtForGRF80per() {
		return amtForGRF80per;
	}
	public void setAmtForGRF80per(Integer amtForGRF80per) {
		this.amtForGRF80per = amtForGRF80per;
	}
	public Integer getAppearedSchoolTotalStud() {
		return appearedSchoolTotalStud;
	}
	public void setAppearedSchoolTotalStud(Integer appearedSchoolTotalStud) {
		this.appearedSchoolTotalStud = appearedSchoolTotalStud;
	}
		
}
